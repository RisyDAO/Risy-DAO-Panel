interface TradeInputProps {
  type: 'buy' | 'sell';
  amount: string;
  onChange: (value: string) => void;
  estimatedOutput: string;
}

export function TradeInput({ type, amount, onChange, estimatedOutput }: TradeInputProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[#9CA3AF]">
            {type === 'buy' ? 'Pay with POL' : 'Sell RISY'}
          </span>
          <span className="text-sm text-[#9CA3AF]">
            Balance: {/* TODO: Show relevant balance */}
          </span>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full bg-transparent text-xl font-semibold focus:outline-none"
        />
      </div>

      <div className="p-4 rounded-lg bg-[#111827] bg-opacity-50">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[#9CA3AF]">
            {type === 'buy' ? 'Receive RISY' : 'Receive POL'}
          </span>
        </div>
        <div className="text-xl font-semibold text-[#9CA3AF]">
          {estimatedOutput}
        </div>
      </div>
    </div>
  );
} 