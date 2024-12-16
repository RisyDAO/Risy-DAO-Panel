interface TradeTabsProps {
  activeTab: 'buy' | 'sell';
  onTabChange: (tab: 'buy' | 'sell') => void;
}

export function TradeTabs({ activeTab, onTabChange }: TradeTabsProps) {
  return (
    <div className="flex rounded-lg bg-[#1F2937] p-1">
      <button
        onClick={() => onTabChange('buy')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'buy'
            ? 'bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] text-white'
            : 'text-[#9CA3AF] hover:text-white'
        }`}
      >
        Buy
      </button>
      <button
        onClick={() => onTabChange('sell')}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
          activeTab === 'sell'
            ? 'bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] text-white'
            : 'text-[#9CA3AF] hover:text-white'
        }`}
      >
        Sell
      </button>
    </div>
  );
} 