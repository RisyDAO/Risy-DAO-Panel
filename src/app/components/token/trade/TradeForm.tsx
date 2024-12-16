import { useState, useEffect } from 'react';
import { TradeInput } from './TradeInput';
import { TradeSummary } from './TradeSummary';
import { TradeButton } from './TradeButton';
import { useToken } from '../../../contexts/TokenContext';
import { useWallet } from '../../../contexts/WalletContext';

interface TradeFormProps {
  type: 'buy' | 'sell';
}

export function TradeForm({ type }: TradeFormProps) {
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('0');
  const [priceImpact, setPriceImpact] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  
  // TODO: Implement price calculation logic
  useEffect(() => {
    if (!amount) {
      setEstimatedOutput('0');
      setPriceImpact(0);
      return;
    }
    
    // TODO: Call price calculation function
    // TODO: Update estimatedOutput and priceImpact
  }, [amount]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <TradeInput
        type={type}
        amount={amount}
        onChange={setAmount}
        estimatedOutput={estimatedOutput}
      />
      
      <TradeSummary
        type={type}
        amount={amount}
        estimatedOutput={estimatedOutput}
        priceImpact={priceImpact}
      />
      
      <TradeButton
        type={type}
        amount={amount}
        isApproved={isApproved}
        onApprove={() => {
          // TODO: Implement approval logic
          setIsApproved(true);
        }}
        onTrade={() => {
          // TODO: Implement trade logic
        }}
      />
    </form>
  );
} 