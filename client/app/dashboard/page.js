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
      <div className="flex w-full">
        <div className="grid z-20">
          <Sidebar />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-auto flex-grow card bg-base-300 rounded-box w-full  place-items-center z-10">
          <TransactionTable />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
