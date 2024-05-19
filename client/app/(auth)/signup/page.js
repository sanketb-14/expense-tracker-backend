"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Router from "next/navigation";
import { useAuth } from "../../../contexts/UsersContext";
import signup_img from "../../../public/assets/signup_img.svg";
import { useState,useEffect } from "react";
import Error from "../../../components/Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function Signup() {
  const [authState, setAuthState,] =
    useState(initialState);
  const { signup, user, error,isLoggedIn } = useAuth();
  const router = useRouter();

  function handleChange(e) {
    setAuthState({
      ...authState,
      [e.target.name]: e.target.value,
    });
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    await signup(authState);
    
  }
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      setAuthState(initialState);
      router.push("/dashboard");
      
    } else {
      console.log(error);
    }
  }, [isLoggedIn, error, router]);
  //

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-5xl text-primary font-bold">
            Register here!
          </h1>
          <p className="py-6">
            Explore the Right way of managing your expenses{" "}
            <span className="font-semibold text-accent text-lg">
              Welcome to Expense-tracker
            </span>
          </p>

          <Image
            src={signup_img}
            width={500}
            height={500}
            alt="Picture of the author"
            className="hidden sm:inline"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleFormSubmit}>
            {error && <Error error={error} />}
            <div className="form-control">
              <label className="label ">
                <span className="label-text text-secondary">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={authState.username}
                placeholder="Username"
                onChange={(e) => handleChange(e)}
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text text-secondary">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={authState.email}
                name="email"
                onChange={(e) => handleChange(e)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={authState.password}
                onChange={(e) => handleChange(e)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-secondary">
                  confirm password
                </span>
              </label>
              <input
                type="text"
                placeholder="confirm password"
                value={authState.password_confirmation}
                name="password_confirmation"
                onChange={(e) => handleChange(e)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
            <span className="border-t-2 "></span>

            <p className="text-sm text-center">
              Already Member ?{" "}
              <Link className="link link-accent " href="/login">
                {" "}
                Please Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
