"use client";
import { createContext, useContext, useReducer, useEffect ,useCallback} from "react";
import axiosInstance from "./helper/axiosInstance";
import axios from "axios";
import { useAuth } from "./UsersContext";
import Razorpay from "razorpay";
import main from "../public/assets/main_manage.svg";

const TransactionContext = createContext();

const initialState = {
  isLoading: false,
  transactions: [],
  error: {},
  balance: 0,
  order: {
    orderId: "",
    paymentId: "",
    signature: "",
  },
  paginationData: {
    currentPage: 1,
    totalPages: 1,
    totalTransactions: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "getTransactions":
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
      };
    case "getBalance":
      return {
        ...state,
        balance: action.payload,
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "setOrder":
      return {
        ...state,
        order: action.payload,
        isLoading: false,
      };
      case "setPaginationData":
        return {
         ...state,
          paginationData: action.payload,
          isLoading: false,
        };
    case "setPremium":

    default:
      return "unknown action type";
  }
}

function TransactionProvider({ children }) {
  const [{ transactions, isLoading, balance, error,paginationData }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { isLoggedIn, setPremium } = useAuth();

  const fetchTransactions=useCallback(async(page=1)=> {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.get("/api/v1/accounts/myAccount",{
        params:{
          page,
        }
      });

      console.log(res);

      dispatch({
        type: "getTransactions",
        payload: res.data.data.myTransaction,
      });
      dispatch({ type: "getBalance", payload: res.data.balance });
      dispatch({
        type: "setPaginationData",
        payload: {
          currentPage: page,
          totalPages: res.data.totalPages, 
          totalTransactions: res.data.myTransaction, 
        },
      });
      
    } catch (err) {
      dispatch({ type: "rejected", payload: err.data });
    }

  })

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions(1);
    };
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn])

  async function addExpense(expenseData) {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.post(
        "api/v1/accounts/addExpense",
        expenseData
      );

      if (res.data.status === "success") {
        const newExpense = res.data.data.newExpense;
        console.log(newExpense);
        const updatedTransactions = [...transactions, newExpense];
        const newBalance =
          newExpense.transactionType === "debit"
            ? balance - parseInt(newExpense.amount)
            : balance + parseInt(newExpense.amount);
        dispatch({ type: "getTransactions", payload: updatedTransactions });
        console.log(balance);

        dispatch({ type: "getBalance", payload: newBalance });
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response.data,
      });
    }
  }
  async function deleteExpense(id) {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.delete(
        `/api/v1/accounts/editExpense/${id}`
      );

      if (res.data.status === "success") {
        const deletedTransaction = transactions.find(
          (transaction) => transaction.id === id
        );
        const newBalance = balance + Number(deletedTransaction.amount);

        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== id
        );

        dispatch({ type: "getTransactions", payload: updatedTransactions });

        dispatch({ type: "getBalance", payload: newBalance });
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response.data,
      });
    }
  }

  async function editExpense(id, updatedTransaction) {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.patch(
        `/api/v1/accounts/editExpense/${id}`,
        updatedTransaction
      );

      console.log(res);
      if (res.data.status === "success") {
        const updatedTransactions = transactions.map((transaction) =>
          transaction.id === id ? res.data.data.updatedTransaction : transaction
        );
        dispatch({ type: "getTransactions", payload: updatedTransactions });
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response.data,
      });
    }
  }

  async function getTransactionsByCategories(categories) {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.get(
        `/api/v1/accounts/transactions/${categories}`
      );
      if (res.data.status === "success") {
        dispatch({
          type: "getTransactions",
          payload: res.data.data,
        });
      }
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: error.response.data,
      });
    }
  }

  const initPayment = (data) => {
    if (!window.Razorpay) {
      console.error("Razorpay script is not loaded");
      return;
    }
    const options = {
      key: "rzp_test_eMwKYTzL8DP6sN",
      amount: 100,
      currency: data.currency,
      name: "premium member",
      description: "Test Transaction",
      image: { main },
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axiosInstance.post(
            "/api/v1/accounts/verify",
            response
          );
          console.log(data);
          if (data.status === "success") {
            await setPremium(data); // Update client-side state
          } else {
            console.error("Payment verification failed:", data.errormessage);
            alert(data.errormessage);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  async function razorCheckout() {
    try {
      const orderUrl = "/api/v1/accounts/checkout";
      const { data } = await axiosInstance.post(orderUrl, { amount: 100 });
      const paymentStatus = initPayment(data.data);
      console.log(paymentStatus);
    } catch (error) {}
    console.log(error);
  }

  async function generatePDF(transactions) {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.post(`/api/v1/accounts/generatePDF`, {
        transactions
      },  { responseType: 'json' });
      if (res.data.status === "success") {
        const pdfBase64 = res.data.data;
        const byteCharacters = atob(pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
  
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
  
        const byteArray = new Uint8Array(byteNumbers);
        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
  

        // Open the PDF file in a new tab or window
        window.open(pdfUrl);
      } else {
        console.error("Failed to generate PDF");
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response.data,
      });
    }
  }

  

  return (
    <TransactionContext.Provider
      value={{
        isLoading,
        transactions,
        deleteExpense,
        balance,
        error,
        addExpense,
        editExpense,
        getTransactionsByCategories,
        razorCheckout,
        generatePDF,
        paginationData,fetchTransactions
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

const useTrans = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("Unable to find context");
  }
  return context;
};

export { TransactionProvider, useTrans };
