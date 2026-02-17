const FlowSection = () => {
  const steps = [
    {
      number: "1",
      title: "Create account",
      description: "Sign up and get your virtual Visa card instantly",
    },
    {
      number: "2",
      title: "Send crypto",
      description: "Transfer BTC, ETH, or other supported coins to your wallet",
    },
    {
      number: "3",
      title: "Convert to USD",
      description: "Crypto converts to USD at current market rates",
    },
    {
      number: "4",
      title: "Start spending",
      description: "Use your card details to pay online anywhere Visa is accepted",
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl border border-gray-200 p-8 hover:border-gray-300 transition-colors"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-semibold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowSection;
