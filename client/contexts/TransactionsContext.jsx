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
        balance:  action.payload,
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
  const [{ transactions, isLoading, balance, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { isLoggedIn } = useAuth();

  async function fetchTransactions() {
    try {
      dispatch({ type: "isLoading" });
      const res = await axiosInstance.get("/api/v1/accounts/myAccount");

      console.log(res);

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
