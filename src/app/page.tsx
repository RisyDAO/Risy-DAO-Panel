"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111827] text-white">
      <nav className="border-b border-[#374151] bg-[#1F2937]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Image
              src="./img/logo.png"
              alt="Risy DAO"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="hidden md:flex space-x-4">
              <NavLink href="#dashboard" active>Dashboard</NavLink>
            </div>
          </div>
          
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Risy DAO Panel",
              description: "Risy DAO Management Panel",
              logoUrl: "./img/logo.png",
              url: typeof window !== "undefined" ? window.location.origin : "",
            }}
          />
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <DashboardGrid />
      </div>
    </main>
  );
}

function NavLink({ href, children, active = false }: { 
  href: string; 
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`text-sm font-medium ${
        active 
          ? "text-white" 
          : "text-[#9CA3AF] hover:text-white transition-colors"
      }`}
    >
      {children}
    </a>
  );
}

function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-[#9CA3AF]">Manage your RISY tokens and view analytics</p>
    </div>
  );
}

function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TokenBalance />
      <TransferPanel />
    </div>
  );
}

function TokenBalance() {
  return (
    <div className="col-span-1 p-6 rounded-lg border border-[#374151] bg-[#1F2937] bg-opacity-50">
      <h2 className="text-xl font-semibold mb-4">Token Balance</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[#9CA3AF]">Available Balance</span>
          <span className="text-2xl font-bold">0 RISY</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#9CA3AF]">Daily Transfer Limit</span>
          <span className="text-[#34D399]">0 RISY</span>
        </div>
      </div>
    </div>
  );
}

function TransferPanel() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  return (
    <div className="col-span-1 p-6 rounded-lg border border-[#374151] bg-[#1F2937] bg-opacity-50">
      <h2 className="text-xl font-semibold mb-4">Transfer Tokens</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-md px-3 py-2 text-white"
            placeholder="0x..."
          />
        </div>
        <div>
          <label className="block text-sm text-[#9CA3AF] mb-2">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-md px-3 py-2 text-white"
            placeholder="0.0"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#6366F1] to-[#3B82F6] text-white py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          Transfer
        </button>
      </form>
    </div>
  );
}