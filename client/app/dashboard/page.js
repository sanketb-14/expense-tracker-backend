"use client";
import React from "react";
import { useAuth } from "../../contexts/UsersContext";
import {useTrans} from "../../contexts/TransactionsContext"
import Loader from "../../components/Loader";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TransactionTable from "../../components/TransactionTable";

const Dashboard = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const {isLoading} = useTrans()
  
  const router = useRouter();
  function handleLogOutClick() {
    logout();
    router.push("/login");
  }

  if (isLoading) return <Loader />;
  return (
    <main className="">
      <Navbar />
      <div className="flex flex-col w-full">
  <div className="grid card  rounded-box place-items-center"><Sidebar /></div> 
  <div className="divider"></div> 
  {!isLoading && <div className="grid shadow-xl card rounded-box place-items-center"> <TransactionTable /></div>}
</div>
    </main>
  );
};

export default Dashboard;

