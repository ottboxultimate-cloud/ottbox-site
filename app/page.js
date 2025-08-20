"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [hover, setHover] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null); // "upi" or "bank" or null

  const tgLink = (plan) =>
    `https://t.me/ottboxsupport?text=Hello%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(
      plan
    )}%20plan`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const home = document.getElementById("home")?.offsetTop || 0;
      const pricing = document.getElementById("pricing")?.offsetTop || 0;
      const guide = document.getElementById("guide")?.offsetTop || 0;

      if (scrollY >= guide - 100) setActiveSection("guide");
      else if (scrollY >= pricing - 100) setActiveSection("pricing");
      else setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { id: "home", name: "🏠 Home" },
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.999 15.17 8.53 12.5l7.27-4.33-8.42 3.82-3.88-1.4c-.84-.3-.86-1.47.02-1.8l15.47-6.02c.7-.27 1.47.34 1.25 1.07l-4.5 15.47c-.23.78-1.21 1.05-1.82.5l-3.9-3.64z" />
        </svg>
      ),
      link: () => window.open("https://t.me/ottboxsupport", "_blank"),
    },
    { id: "guide", name: "📖 Guide" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav
        className={`w-full flex items-center justify-between px-6 py-4 fixed top-0 z-50 transition-all duration-300
          ${scrolled ? "bg-gray-900/80 backdrop-blur-md shadow-2xl" : "bg-gray-900/70 backdrop-blur-md"}
        `}
      >
        <div className="flex items-center gap-2">
          <img src="/ottbox-logo.png" alt="OttBox Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-purple-400">OttBox</span>
        </div>

        <div className="hidden md:flex gap-8 font-semibold text-gray-200">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => (item.link ? item.link() : scrollToSection(item.id))}
              className={`transition-colors hover:text-white ${activeSection === item.id ? "text-white font-bold" : ""}`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-200 focus:outline-none">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-gray-900/90 backdrop-blur-md shadow-lg flex flex-col items-center gap-4 py-4 z-40 animate-slideDown">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => (item.link ? item.link() : scrollToSection(item.id))}
              className="flex items-center gap-2 text-gray-200 font-semibold hover:text-white"
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header id="home" className="text-center pt-28 pb-16 px-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          🏠 Your All-in-One Entertainment Solution 🎬📺
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-200">
          14,000+ Live TV Channels, 60,000+ Movies & 12,000+ Web Series. Unlimited fun, unbeatable price, anytime on any device 🌍
        </p>
      </header>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PlanCard title="1 Month" color="purple" price="₹199 / 9 AED" tgLink={tgLink("1 Month")} buttonText="Start Now" />
          <PlanCard title="3 Months" color="blue" price="₹549 / 25 AED" tgLink={tgLink("3 Months")} buttonText="Buy Now" />
          <PlanCard title="6 Months" color="green" price="₹1049 / 47 AED" tgLink={tgLink("6 Months")} buttonText="Subscribe" />
          <PlanCard title="12 Months" color="red" price="₹1999 / 90 AED" tgLink={tgLink("12 Months")} buttonText="Get Access" bestValue />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Raj", rating: 5, comment: "OttBox is amazing! I watch my favorite channels and movies without buffering!" },
            { name: "Anita", rating: 5, comment: "Best IPTV service I've used. Works on all my devices seamlessly!" },
            { name: "Sameer", rating: 5, comment: "Affordable plans, tons of content, and excellent support!" },
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="text-yellow-400 flex gap-1">{Array.from({ length: testimonial.rating }).map((_, i) => (<span key={i}>⭐</span>))}</div>
                <span className="text-gray-300 font-semibold">{testimonial.name}</span>
              </div>
              <p className="text-gray-300">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">We Accept</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <button onClick={() => setPaymentModal("upi")} className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold">UPI</button>
          <button onClick={() => setPaymentModal("bank")} className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold">Bank Transfer</button>
        </div>
      </section>

      {/* Guide */}
      <section id="guide" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Guide</h2>
        <p className="text-center text-gray-300">Here you can add instructions, FAQs, or how to setup the service.</p>
      </section>

      {/* Floating Telegram Button */}
      <a
        href="https://t.me/ottboxsupport?text=Hello%2C%20I%20need%20help%20choosing%20a%20plan"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-2 font-semibold transform transition-all duration-300 animate-[pulse_2s_ease-in-out_infinite] hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/70"
      >
        {hover ? "💬 Chat on Telegram" : "🚀 Start Streaming Now"}
      </a>

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-80 relative">
            <button className="absolute top-2 right-2 text-gray-300 hover:text-white" onClick={() => setPaymentModal(null)}>✖</button>

            {paymentModal === "upi" && (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-green-400">UPI Payment</h3>
                <img
                  src="https://files.catbox.moe/muntgv.jpg"
                  alt="Scan UPI QR"
                  className="w-48 h-48 mx-auto mb-4"
                />
                <p className="text-gray-300">Scan QR or pay to:</p>
                <p className="text-white font-semibold mt-1">Aryxn.677@okicici</p>
              </div>
            )}

            {paymentModal === "bank" && (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Bank Transfer</h3>
                <p className="text-gray-300">Account Name:</p>
                <p className="text-white font-semibold mb-2">bindu rani</p>
                <p className="text-gray-300">Account Number:</p>
                <p className="text-white font-semibold mb-2">25830100017611</p>
                <p className="text-gray-300">IFSC Code:</p>
                <p className="text-white font-semibold mb-2">BARB0HANUMA</p>
                <p className="text-gray-300">Bank Name:</p>
                <p className="text-white font-semibold">Bank of Baroda</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// PlanCard Component
function PlanCard({ title, color, price, tgLink, buttonText, bestValue }) {
  return (
    <div className={`bg-gray-900 p-6 rounded-2xl shadow-lg border border-${color}-600 hover:scale-105 transition-transform flex flex-col justify-between relative`}>
      {bestValue && (
        <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-sm animate-bounce shadow-lg">
          Best Value
        </span>
      )}
      <h3 className={`text-2xl font-bold mb-4 text-${color}-400`}>{title}</h3>
      <p className="text-xl font-semibold mb-6">{price}</p>
      <ul className="text-left space-y-2 text-gray-300 mb-6">
        <li>✅ 9,000+ Channels</li>
        <li>✅ 60,000+ Movies & Series</li>
        <li>✅ FHD, HD, SD Channels</li>
        <li>✅ Worldwide Supported</li>
        <li>✅ Single Device</li>
        <li>✅ Demo Available</li>
        <li>✅ 99.99% Uptime</li>
        <li>✅ All Device & App Compatibility</li>
      </ul>
      <div className="flex gap-2 mb-4">
        <span className="bg-green-600 px-2 py-1 rounded text-xs font-semibold">UPI</span>
        <span className="bg-blue-600 px-2 py-1 rounded text-xs font-semibold">Bank</span>
      </div>
      <a
        href={tgLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-white font-semibold py-3 rounded-lg text-center transition-all transform hover:scale-105 shadow-lg animate-pulse bg-${color}-500 hover:bg-${color}-600`}
      >
        {buttonText}
      </a>
    </div>
  );
}
