"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111827] text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex justify-center mb-12">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Risy DAO Panel"
            }}
          />
        </div>

        <TokenOperations />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="text-center mb-16">
      <div className="mb-8">
        <Image
          src="./img/logo.png"
          alt="Risy DAO"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] via-[#3B82F6] to-[#2DD4BF] text-transparent bg-clip-text">
        Risy DAO Token Management
      </h1>
      
      <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
        Securely manage your RISY tokens with automatic limit calculations and transfer restrictions
      </p>
    </header>
  );
}

function TokenOperations() {
  return (
    <div className="max-w-2xl mx-auto grid gap-6">
      <OperationCard
        title="Transfer Tokens"
        description="Send RISY tokens to another address (Daily limit: 10% of balance)"
        href="/transfer"
      />
      
      <OperationCard
        title="Token Balance"
        description="View your current balance and transfer limits"
        href="/balance"
      />
      
      <div className="p-4 rounded-lg border border-[#374151] bg-opacity-50">
        <h3 className="text-sm font-semibold text-[#9CA3AF] mb-2">Quick Stats</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Daily Transfer Limit:</span>
            <span className="text-[#34D399]">10% of balance</span>
          </li>
          <li className="flex justify-between">
            <span>ICO Maximum Balance:</span>
            <span className="text-[#34D399]">0.75% (~7.5B RISY)</span>
          </li>
          <li className="flex justify-between">
            <span>DAO Fee:</span>
            <span className="text-[#34D399]">0.1% per transfer</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function OperationCard({ title, description, href }: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 rounded-lg border border-[#374151] bg-opacity-50 hover:bg-[#1F2937] transition-all duration-200 hover:shadow-lg hover:shadow-[#4F46E5]/10"
    >
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-[#9CA3AF] text-sm">{description}</p>
      </div>
    </a>
  );
}
