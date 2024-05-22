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
import next from "next";
import createServer from "http";

const app = express();
const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const handle = nextApp.getRequestHandler();

// Global Middleware

//Set security HTTP Headers
app.use(helmet())
app.use(cors())

// Prevent XSS attacks

app.use(xss())

// Limit requests from same API

const limiter = rateLimit({
  max:1000,
  windowMs: 60 * 60 * 100,
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

// Handle Next.js requests
app.all("*", (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (pathname === "/") {
    nextApp.render(req, res, "/", req.query);
  } else if (pathname.startsWith("/api")) {
    // Handle API routes
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  } else {
    handle(req, res, parsedUrl);
  }
});
  
  app.use(globalErrorHandler);

  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
