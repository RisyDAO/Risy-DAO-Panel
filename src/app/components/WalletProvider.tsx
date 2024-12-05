"use client";

import { AutoConnect } from "thirdweb/react";
import { client } from "../client";
import { wallets } from "../wallets";

const appMetadata = {
  name: "Risy DAO Panel",
  description: "Risy DAO Management Panel",
  logoUrl: "./img/logo.png",
  url: typeof window !== "undefined" ? window.location.origin : "",
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoConnect
        client={client}
        wallets={wallets}
        appMetadata={appMetadata}
      />
      {children}
    </>
  );
}