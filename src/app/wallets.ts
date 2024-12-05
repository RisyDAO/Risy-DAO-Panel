import {
  inAppWallet,
  createWallet
} from "thirdweb/wallets";

// Wallet configurations
export const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "passkey",
        "phone",
        "email",
        "apple",
        "github",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.brave.wallet"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance"),
  createWallet("com.trustwallet.app"),
  createWallet("io.1inch.wallet"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.crypto.wallet"),
]; 