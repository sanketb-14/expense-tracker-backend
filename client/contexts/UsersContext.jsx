"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import axiosInstance from "./helper/axiosInstance";
import axios from "axios";

const UsersContext = createContext();

const initialState = {
  user: {},
  isLoading: false,
  error: {},
  isAuthenticated: false,
  token: "",
  isAdmin: false,
  isLoggedIn: false,
  transaction: [],
  category: [],
  balance: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return {
        ...state,
        isLoading: true,
      };

    case "isLoggedIn":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    case "isAdmin":
      return {
        ...state,
        isAdmin: true,
      };
    case "isLoggedOut":
      return {
        ...state,
        isLoggedIn: false,
        isAuthenticated: false,
        isAdmin: false,
        user: {},
        transaction: [],
        token: "",
        isLoading: false,
      };
    case "getUserData":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoggedIn: true,
        isLoading: false,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "getToken":
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    case "getTransaction":
      return {
        ...state,

        transaction: action.payload,
        isLoading: false,
      };
    case "storeUserData":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoggedIn: true,
        isLoading: false,
      };
    case "getCategory":
      return {
        ...state,
        category: action.payload,
        isLoading: false,
      };
    case "getBalance":
      return {
        ...state,
        balance: action.payload,
        isLoading: false,
      };
    case "isAuthenticated":
      return {
        ...state,
        isAuthenticated: true,
        isLoggedIn: true,
        isLoading: false,
      };

    default:
      return "unknown action type";
  }
}

function UsersProvider({ children }) {
  const [
    {
      user,
      isLoading,
      isLoggedIn,
      error,
      token,
      transaction,
      isAuthenticated,
      category,
      getBalance,
      balance,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch({ type: "getToken", payload: token });
      dispatch({ type: "storeUserData", payload: user });
      dispatch({ type: "isLoggedIn" });
    }
  }, []);

  useEffect(() => {
    async function fetchCategory() {
      try {
        dispatch({ type: "isLoading" });
        const res = await axiosInstance.get(
          "/api/v1/accounts/getAllCategories"
        );
        
        dispatch({
          type: "getCategory",
          payload: res.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (isAuthenticated) {
      fetchCategory();
    }
  }, [isAuthenticated]);

  async function signup(userData) {
    dispatch({ type: "isLoading" });
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/signup`,
        userData
      );

      dispatch({ type: "getUserData", payload: res.data.data.user });
      dispatch({ type: "getToken", payload: res.data.token });
      dispatch({ type: "storeUserData", payload: res.data.data.user });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data,
      });
    }
  }
  async function login(userData) {
    dispatch({ type: "isLoading" });
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/users/login`,
        userData
      );
      dispatch({ type: "getUserData", payload: res.data.data.user });
      dispatch({ type: "getToken", payload: res.data.token });
      dispatch({ type: "storeUserData", payload: res.data.data.user });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: err.response.data,
      });
    }
  }

  async function logout() {
    try {
      dispatch({ type: "isLoading" });
      delete axiosInstance.defaults.headers.common["Authorization"];
      await axiosInstance.get("/api/v1/users/logout");
      dispatch({ type: "isLoading", payload: false });
      dispatch({ type: "isLoggedOut" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error,
      });
    }
  }

  return (
    <UsersContext.Provider
      value={{
        signup,
        login,
        isLoading,
        token,
        error,
        user,
        isLoggedIn,
        transaction,
        logout,
        category,
        balance,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("Unable to find context");
  }
  return context;
};

export { UsersProvider, useAuth };
