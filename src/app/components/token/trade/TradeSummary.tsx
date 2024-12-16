interface TradeSummaryProps {
  type: 'buy' | 'sell';
  amount: string;
  estimatedOutput: string;
  priceImpact: number;
}

export function TradeSummary({ type, amount, estimatedOutput, priceImpact }: TradeSummaryProps) {
  if (!amount || !estimatedOutput) return null;

  return (
    <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#9CA3AF]">Rate</span>
        <span className="text-white">
          1 {type === 'buy' ? 'POL' : 'RISY'} = {/* TODO: Show exchange rate */}
        </span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-[#9CA3AF]">Price Impact</span>
        <span className={`${priceImpact > 5 ? 'text-red-500' : 'text-[#34D399]'}`}>
          {priceImpact.toFixed(2)}%
        </span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-[#9CA3AF]">Network Fee</span>
        <span className="text-white">
          {/* TODO: Show estimated gas fee */}
        </span>
      </div>
    </div>
  );
} 