import prisma from "../DB/db.config.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
export  const fetchAllUsers = catchAsync(async (req,res,next)=>{
    const users = await prisma.user.findMany({
        where:{
            active:true
        },
        select:{
            id:true,
            username:true
        }
    })
    return res.status(200).json({
        status:"success",
        data:{
            users
        }
    })
})

export const deleteMe = catchAsync(async (req,res,next)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id

        }
    })
    const newUser = await prisma.user.update({
        where:{
            id:Number(user.id)
        },
        data:{
            active:false
        }
    })
    return res.status(200).json({
        status:"success",
        data:null
    })
    
});

export const myAccount = catchAsync(async (req,res,next)=>{
    const myTransaction = await prisma.transaction.findMany({
        where:{
            userId:req.user.id

        },
        include: { categories:{select:{
            categories:true
        }
        }},
        
    })
    if(!myTransaction){
        return next(new AppError("No transaction found",404))
    }
    // const balance = await prisma.transaction.findMany({
        
    // })
    const balance = myTransaction.reduce((acc, item) =>{
        let updatedBalance = acc
        if(item.transactionType === 'debit'){

            updatedBalance -= Number(item.amount)
        }
        else{
            updatedBalance += Number(item.amount)
        }
        return Number(updatedBalance.toFixed(2))
    },0)
    return res.status(200).json({
        status:"success",
        balance,
        data:{
            myTransaction
        }
    })

})


