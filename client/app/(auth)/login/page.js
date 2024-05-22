"use client";

import React, { useState, useEffect } from "react";
import login_img from "../../../public/assets/login_img.svg";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "../../../contexts/UsersContext";
import { useRouter } from "next/navigation";
import Error from '../../../components/Error'
const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [loginState, setLoginState] = useState(initialState);
  const { login,isLoggedIn , isLoading, error } = useAuth();
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  }
  async function handleLoginSubmit(e) {
    e.preventDefault();
    await login(loginState);  
    
  }


  useEffect(() => {
    if (isLoggedIn) {
      setLoginState(initialState);
      router.push("/dashboard");
    } else {
      console.log(error);
    }
  }, [isLoggedIn, error, router]);
  

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-5xl text-primary font-bold">
            Login now!
          </h1>
          <p className="py-6">
            Explore the Right way of managing your expenses{" "}
            <span className="font-semibold text-accent text-lg">
              Welcome to Expense-tracker
            </span>
          </p>
          <Image
            src={login_img}
            width={500}
            height={500}
            alt="Picture of the author"
            className="hidden sm:inline"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLoginSubmit}>
            
            {error && <Error error={error} />}
            
            <div className="form-control">
              <label className="label text-secondary">
                <span className="label-text text-secondary">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={loginState.email}
                onChange={(e) => handleChange(e)}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-secondary">
                <span className="label-text text-secondary">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={loginState.password}
                onChange={(e) => handleChange(e)}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label  ">
                <Link
                  href="/forgotPassword"
                  key="forgotPassword"
                  className="label-text-alt link link-hover hover:link-primary "
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              {isLoading ? (
                <button className="btn btn-loading btn-primary" type="submit">
                  Loading...
                </button>
              ) : (
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              )}
            </div>
            <span className="border-t-2 "></span>

            <p className="text-sm text-center">
              Want to register ?{" "}
              <Link className="link link-accent " href="/signup">
                {" "}
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
