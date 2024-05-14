import prisma from "../DB/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addMinutes } from "date-fns"; // Utility library for date manipulation
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "../validation/authValidation.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { promisify } from "util";

import { generateToken, comparePassword } from "../helper/userModelHelper.js";
import sendEmail from "../helper/emailHelper.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  const expiresIn =
    parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000;
  const expiresAt = new Date(Date.now() + expiresIn);
  res.cookie("jwt", token, {
    expires: expiresAt,
    httpOnly: true,
  });

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
async function hashPassword(password) {
  const hashPassword = await bcrypt.hash(password, 12);
  password = hashPassword;
  return password;
}

export const signup = catchAsync(async (req, res, next) => {
  const { username, email, password, password_confirmation } = req.body;

  // Check if password and password_confirmation match
  if (password !== password_confirmation) {
    return next(new AppError("password must match", 401));
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return next(new AppError("User already exists, please login", 403));
  }
  const newUser = {
    username,
    email,
    password,
    password_confirmation,
  };
  const validator = vine.compile(registerSchema);
  const validateUser = await validator.validate(newUser);

  const updatedUser = {
    username: validateUser.username,
    email: validateUser.email,
    password: await hashPassword(validateUser.password),
  };

  const createdUser = await prisma.user.create({
    data: updatedUser,
  });

  createSendToken(createdUser, 201, req, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("email and password are require", 401));
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password", 401));
  }
  user.password = undefined;
  createSendToken(user, 200, req, res);
});

export const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = currentUser;
  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return next(new AppError("There is no user with this email address"));
  }
  const resetToken = generateToken();
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\n if you didn't forget your password , please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      select: {
        email: true,
      },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: addMinutes(new Date(), 10), // Token expires in 10 minutes
      },
    });
    createSendToken(updatedUser, 200, req, res);
  } catch (err) {
    await prisma.user.update({
      where: { email: user.email },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashToken = req.params.token;

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashToken,
      passwordResetExpires: {
        gt: new Date(),
      },
    },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  const newHashPassword = await hashPassword(req.body.newPassword);
  const updateUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: newHashPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });

  createSendToken(updateUser, 200, req, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      password: true,
    },
  });
  if (!(await comparePassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is incorrect"));
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    select: {},
    id: true,
    username: true,
    data: {
      password: await hashPassword(req.body.password),
    },
  });
  createSendToken(updatedUser, 200, req, res);
});
