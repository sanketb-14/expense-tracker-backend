import express from "express";
import rateLimit from 'express-rate-limit'
import userRoute from './routes/userRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import globalErrorHandler from './controllers/errorController.js'
import AppError from "./utils/appError.js";
import helmet from 'helmet'
import xss from 'xss-clean'
import cors from 'cors'
import 'dotenv/config'

const app = express();

// Global Middleware

//Set security HTTP Headers
app.use(helmet())
app.use(cors())

// Prevent XSS attacks

app.use(xss())

// Limit requests from same API

const limiter = rateLimit({
  max:1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api',limiter)




app.use(express.json({limit:'10kb'}));

app.use(express.urlencoded({ extended: false }));



app.use((req, res,next) => {
    req.requestTime = new Date().toISOString()
    next();
})

app.use('/api/v1/users', userRoute);
app.use('/api/v1/accounts',expenseRoutes)



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
  app.use(globalErrorHandler);
app.listen(3000, () => console.log("listening on port 3000"));
