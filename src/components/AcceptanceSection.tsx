const AcceptanceSection = () => {
  const platforms = [
    "Amazon",
    "Netflix",
    "Spotify",
    "Adobe",
    "Microsoft",
    "Shopify Stores",
    "Steam",
    "40M+ merchants",
  ];

  return (
    <section className="py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">
            Use Anywhere Visa is Accepted
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop at millions of online stores worldwide with your virtual Visa card
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:border-gray-300 "
            >
              <div className="font-semibold text-black">{platform}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <div className="text-5xl font-bold text-black mb-3">40M+</div>
          <div className="text-lg text-gray-600">
            Merchants worldwide accept Visa
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcceptanceSection;
