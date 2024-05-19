import prisma from "../DB/db.config.js";
import { catchAsync } from "../utils/catchAsync.js";

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
      categories:{
        select:{
          categories:true
        }
      }
      
    },
    
  });
  return res.status(200).json({
    status: "success",
    data: transactions,
  })
})

export const getAllCategories = catchAsync(async(req, res, next) => {
  const categories = await prisma.category.findMany({

  })
  return res.status(200).json({
    status:"success",
    data:categories
  })
})