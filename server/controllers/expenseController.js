import prisma from "../DB/db.config.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";
import Razorpay from "razorpay";


export const addExpense = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { title, descriptions, amount, categories, transactionType } = req.body;
  const newExpense = await prisma.transaction.create({
    data: {
      title,
      descriptions,
      amount,
      transactionType,
      categories,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      newExpense,
    },
  });
});

export const editTransaction = catchAsync(async (req, res, next) => {
  const transaction = await prisma.transaction.findFirst({
    where: {
      id: req.params.transactionId,
    },
  });
  const updatedTransaction = await prisma.transaction.update({
    where: {
      id: req.params.transactionId,
    },
    data: {
      title: req.body.title,
      descriptions: req.body.descriptions,
      amount: req.body.amount,
      categories: req.body.categories,
      transactionType: req.body.transactionType,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedTransaction,
    },
  });
});

export const deleteTransaction = catchAsync(async (req, res, next) => {
  await prisma.transaction.delete({
    where: {
      id: req.params.transactionId,
    },
  });
  res.status(200).json({
    status: "success",
    data: {},
  });
});

export const getTransactionByCategories = catchAsync(async (req, res, next) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.user.id,

      categories: {
        some: {
          categories: req.params.categories,
        },
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      categories: {
        select: {
          categories: true,
        },
      },
    },
  });
  return res.status(200).json({
    status: "success",
    data: transactions,
  });
});

export const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await prisma.category.findMany({});
  return res.status(200).json({
    status: "success",
    data: categories,
  });
});

export const razorCheckout = catchAsync(async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
    payment_capture: 1,
  };

  const response = await razorpay.orders.create(options);
  return res.status(200).json({
    status: "success",
    data: response,
  });
});

export const razorVerify = catchAsync(async(req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // Update with the new key_secret
    .update(sign)
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      select:{
        id: true,
        username:true,        premium: true,
      },
      data: {
        premium: true,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "payment verified successfully",
      data: user,
    });

  }else {
    next(new AppError("Invalid signature"));
  }
});


