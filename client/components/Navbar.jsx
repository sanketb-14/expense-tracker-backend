import React,{useState} from "react";
import Logo from "./Logo";
import { useAuth } from "../contexts/UsersContext";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useTrans } from "../contexts/TransactionsContext";

import avtar from "../public/assets/avtar.png";

const Navbar = () => {
  const { user, logout, isLoggedIn} = useAuth();
  const router = useRouter();
  const {razorCheckout } = useTrans()

 
  async function handlePayment() {
    try{
      const orderStatus = await razorCheckout()
      console.log(orderStatus);
    }
    catch(err){
      console.log(err);
    }
  }

  async function handleClick() {
    await logout();
    router.push('/login');
  }
  
  return (
    <nav className="navbar flex justify-evenly">
      <Logo />
      <div className="p-1  ">
        <Image
          className="mask mask-squircle mx-auto"
          src={avtar}
          width={50}
          height={50}
          alt="user_logo"
        />
       {!user.premium ?  <button className="btn btn-sm bg-info text-neutral" onClick={handlePayment}>Buy premium</button>: <button className="badge badge-success">Premium</button> }
        <h1 className="text-lg mx-1">
          Welcome!
          <span className="text-lg font-semibold text-secondary mx-1">
            {user.username}
          </span>
        </h1>
        <button
          onClick={handleClick}
          className="btn absolute right-0 btn-sm sm:btn-md btn-primary  text-primary-content font-semibold  mx-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
