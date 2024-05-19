"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import axiosInstance from "./helper/axiosInstance";
import axios from "axios";
import { useAuth } from "./UsersContext";

const TransactionContext = createContext();

const initialState = {
  isLoading: false,
  transactions: [],
  error: {},
  balance: 0,
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
    default:
      return "unknown action type";
  }
}

function TransactionProvider({ children }) {
  const [
    { transactions, getTransactions, isLoading, balance, error },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { isLoggedIn } = useAuth();

  async function fetchTransactions() {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.get("/api/v1/accounts/myAccount");
      dispatch({ type: "isLoading", payload: false });
      
      dispatch({
        type: "getTransactions",
        payload: res.data.data.myTransaction,
      });
      dispatch({ type: "getBalance", payload: res.data.balance });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.response.data });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions();
    };
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  async function addExpense(expenseData) {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.post(
        "api/v1/accounts/addExpense",
        expenseData
      );
      console.log(res.data.data.newExpense);
     
      
      if (res.data.success) {
        const newExpense = res.data.data.newExpense;
        const updatedTransactions = [...transaction, newExpense];
        dispatch({ type: "getTransactions", payload: updatedTransactions });
        
      }
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.response.data,
      });
      
    }
    finally {
      dispatch({ type: "isLoading", payload: false }); // Set isLoading to false regardless of success or failure
    }
  }


  return (
    <TransactionContext.Provider
      value={{ isLoading, transactions, balance, error,addExpense }}
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
