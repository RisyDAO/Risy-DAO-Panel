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
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.binance"),
  createWallet("io.1inch.wallet"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.crypto.wallet"),
  createWallet("com.brave.wallet"),
  createWallet("walletConnect")
];

export const recommendedWallets = [
  createWallet("io.metamask"),
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3")
];