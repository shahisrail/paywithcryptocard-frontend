const FundingSection = () => {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC" },
    { name: "Ethereum", symbol: "ETH" },
    { name: "Tether", symbol: "USDT" },
    { name: "USD Coin", symbol: "USDC" },
    { name: "Litecoin", symbol: "LTC" },
  ];

  return (
    <section className="py-32 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">
              Fund with Crypto
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Simple conversion from crypto to USD
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Send crypto</h3>
                  <p className="text-gray-600">Transfer to your unique wallet address</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Auto-convert</h3>
                  <p className="text-gray-600">Instantly converted to USD at market rates</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h3 className="font-semibold text-black mb-1">Start spending</h3>
                  <p className="text-gray-600">Use your card immediately</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 text-black">
              Supported Cryptocurrencies
            </h3>

            <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200">
              {cryptos.map((crypto, index) => (
                <div
                  key={crypto.symbol}
                  className="flex items-center justify-between p-5 hover:bg-gray-100/50 "
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{crypto.symbol[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-black">{crypto.name}</div>
                      <div className="text-sm text-gray-500">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500">Supported</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingSection;
