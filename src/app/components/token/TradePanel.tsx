import { ErrorBoundary } from "../shared/ErrorBoundary";
import { Card } from "../shared/Card";
import { useState } from "react";
import { TradeTabs } from "./trade/TradeTabs";
import { TradeForm } from "./trade/TradeForm";
import { DisconnectedState } from "../shared/DisconnectedState";
import { useWallet } from "../../contexts/WalletContext";

function TradePanelContent() {
  const { walletAddress } = useWallet();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  if (!walletAddress) {
    return <DisconnectedState message="Connect your wallet" description="to trade tokens" />;
  }

  return (
    <div className="space-y-4">
      <TradeTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <TradeForm type={activeTab} />
    </div>
  );
}

export function TradePanel() {
  return (
    <Card title="Trade RISY">
      <ErrorBoundary title="Failed to load trade panel">
        <TradePanelContent />
      </ErrorBoundary>
    </Card>
  );
} 