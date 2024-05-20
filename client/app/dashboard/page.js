"use client";
import React from "react";
import { useAuth } from "../../contexts/UsersContext";
import Loader from "../../components/Loader";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TransactionTable from "../../components/TransactionTable";

const Dashboard = () => {
  const { user, isLoggedIn,isLoading, logout } = useAuth();
  
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
  <div className="grid shadow-xl card rounded-box place-items-center"> <TransactionTable /></div>
</div>
    </main>
  );
};

export default Dashboard;

