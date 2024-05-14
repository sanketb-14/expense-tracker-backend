import prisma from "../DB/db.config.js";
import { catchAsync } from "../utils/catchAsync.js";

export const addExpense =catchAsync(async(req,res,next)=>{
    const userId = req.user.id
    const {title,descriptions,amount,categories} = req.body
    const newExpense = await prisma.transaction.create({
        data:{
            title,
            descriptions,
            amount,
            categories,
            user:{
                connect:{
                    id:userId
                }
            }
        }
    })
    
    res.status(200).json({
        status:"success",
        data:{
            newExpense
        }
    })

})
