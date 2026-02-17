"use client";

import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">
          Get Your Virtual Visa Card
        </h2>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Start using your crypto for online purchases today. Create an account and get your card instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-900 transition-colors"
          >
            Create account
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-black border border-gray-300 bg-white rounded-lg hover:border-gray-400 transition-colors"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;