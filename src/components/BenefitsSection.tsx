import { Shield, CreditCard, Globe, Zap } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "No KYC Required",
      description: "Use your card without ID checks or paperwork. Start spending instantly."
    },
    {
      icon: CreditCard,
      title: "Multiple Virtual Cards",
      description: "Create separate cards for subscriptions, shopping and one-time payments."
    },
    {
      icon: Globe,
      title: "Worldwide Acceptance",
      description: "Pay on global websites wherever Visa is accepted in 186+ countries."
    },
    {
      icon: Zap,
      title: "Instant Conversion",
      description: "Crypto to USD in minutes at market rates with low fees."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            Why Choose PayWithCryptoCard
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to spend crypto anywhere
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.title}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-md">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;