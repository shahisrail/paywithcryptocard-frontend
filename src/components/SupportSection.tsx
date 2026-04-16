"use client";

import { Mail, MessageCircle, ChevronRight } from "lucide-react";

const SupportSection = () => {
  const handleScrollToFAQ = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("faq");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleChatNow = () => {
    // Trigger the chat widget by dispatching a custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent("open-chat-widget"));
    }
  };

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live chat",
      action: "Chat Now",
      onClick: handleChatNow,
    },
    {
      icon: Mail,
      title: "Mail",
      email: "support@paywithcryptocard.net",
      action: "Send Email",
    },
  ];

  return (
    <section id="support" className="py-12 sm:py-16 lg:py-20 bg-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
            Need to contact us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We are ready to help!
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={option.title}
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 hover:border-gray-300 "
              >
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-black mb-4">
                  {option.title}
                </h3>
                {option.email ? (
                  <a
                    href={`mailto:${option.email}`}
                    onClick={() => {
                      setTimeout(() => {
                        if (typeof window !== 'undefined') {
                          window.open(
                            `https://mail.google.com/mail/?view=cm&fs=1&to=${option.email}`,
                            "_blank"
                          );
                        }
                      }, 500);
                    }}
                    className="block w-full px-4 py-3 bg-black text-white text-sm font-medium rounded-lg text-center"
                  >
                    {option.action}
                  </a>
                ) : (
                  <button
                    onClick={option.onClick}
                    className="w-full px-4 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900  active:"
                  >
                    {option.action}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Link */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-black mb-6">
            Visit our Frequently Asked Questions
          </h3>
          <a
            href="#faq"
            onClick={handleScrollToFAQ}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gray-100 text-black text-sm sm:text-base font-medium rounded-lg hover:bg-gray-200  cursor-pointer active:"
          >
            View FAQs
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
