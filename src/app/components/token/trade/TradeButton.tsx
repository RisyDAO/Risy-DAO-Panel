interface TradeButtonProps {
  type: 'buy' | 'sell';
  amount: string;
  isApproved: boolean;
  onApprove: () => void;
  onTrade: () => void;
}

export function TradeButton({ type, amount, isApproved, onApprove, onTrade }: TradeButtonProps) {
  if (!amount) {
    return (
      <button disabled className="w-full py-3 px-4 rounded-lg bg-[#374151] text-[#9CA3AF]">
        Enter an amount
      </button>
    );
  }

  if (type === 'sell' && !isApproved) {
    return (
      <button
        onClick={onApprove}
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Approve RISY
      </button>
    );
  }

  return (
    <button
      onClick={onTrade}
      className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] text-white font-medium hover:opacity-90 transition-opacity"
    >
      {type === 'buy' ? 'Buy RISY' : 'Sell RISY'}
    </button>
  );
} 