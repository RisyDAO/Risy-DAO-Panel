import { ErrorBoundary } from "../../shared/ErrorBoundary";
import { LoadingState } from "../../shared/loading/LoadingState";
import { ConnectButton, LocaleId } from "thirdweb/react";
import { client } from "../../../client";
import { wallets, recommendedWallets } from "../../../wallets";
import { RISY_TOKEN_CONFIG } from "../../../config/tokens";
import { CONTRACTS } from "../../../config/contracts";
import { supportedChains } from "../../../config/chains";
import { risyDaoTheme } from "../../../config/theme";

interface WalletConnectProps {
  isLoading?: boolean;
}

function WalletConnectContent({ isLoading = false }: WalletConnectProps) {
  return (
    <LoadingState
      isLoading={isLoading}
      skeleton={{
        count: 1,
        height: '2.5rem',
        width: '10rem'
      }}
    >
      <ConnectButton
        client={client}
        wallets={wallets}
        walletConnect={{
          projectId: "49c3fa7d29cce87f7561ff989b8ebe1f"
        }}
        recommendedWallets={recommendedWallets}
        showAllWallets={true}
        autoConnect={true}
        locale={window?.navigator?.language as LocaleId}
        chains={supportedChains}
        supportedTokens={{
          [supportedChains[0].id]: [
            {
              address: CONTRACTS.RISY_TOKEN,
              name: RISY_TOKEN_CONFIG.name,
              symbol: RISY_TOKEN_CONFIG.symbol,
              icon: RISY_TOKEN_CONFIG.icon,
            }
          ],
        }}
        theme={risyDaoTheme}
        connectModal={{
          size: "compact",
          title: "Sign in to Risy DAO Panel",
          titleIcon: "./img/logo.png",
          showThirdwebBranding: false,
        }}
        appMetadata={{
          name: "Risy DAO Panel",
          description: "Risy DAO Management Panel",
          logoUrl: "./img/logo.png",
          url: typeof window !== "undefined" ? window.location.origin : "",
        }}
      />
    </LoadingState>
  );
}

export function WalletConnect(props: WalletConnectProps) {
  return (
    <ErrorBoundary title="Failed to load wallet connection">
      <WalletConnectContent {...props} />
    </ErrorBoundary>
  );
} 