import { Inter } from "next/font/google";
import {UsersProvider} from '../contexts/UsersContext'
import { TransactionProvider } from "../contexts/TransactionsContext";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense-tracker",
  description: "Best way to manage your expense",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <UsersProvider>
          <TransactionProvider>
            {children}
          </TransactionProvider>
        </UsersProvider>
        
     
        </body>
    </html>
  );
}
