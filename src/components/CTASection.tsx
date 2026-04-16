import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
            Ready to Start Spending Crypto?
          </h2>

          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get your virtual Visa card in minutes. No KYC, no paperwork, just instant access to spend your crypto anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-black rounded-xl hover:bg-gray-900   shadow-lg hover:shadow-xl"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;