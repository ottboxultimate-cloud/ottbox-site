"use client";
import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function Page() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

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
    { id: "pricing", name: "💰 Pricing" },
    { id: "feedback", name: "⭐ Feedback" },
    {
      id: "telegram",
      name: "Telegram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 inline-block mr-1"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9.999 15.17 8.53 12.5l7.27-4.33-8.42 3.82-3.88-1.4c-.84-.3-.86-1.47.02-1.8l15.47-6.02c.7-.27 1.47.34 1.25 1.07l-4.5 15.47c-.23.78-1.21 1.05-1.82.5l-3.9-3.64z" />
        </svg>
      ),
      link: () => window.open("https://t.me/ottboxsupport", "_blank"),
    },
    { id: "guide", name: "📖 Guide" },
  ];

  const reviews = [
    { name: "haris", plan: "1 Year" },
    { name: "Amrit singh", plan: "1 Year for 3 devices" },
    { name: "Morin", plan: "1 Year" },
    { name: "Kanchon", plan: "1 Year" },
    { name: "Dhiraj", plan: "1 Year" },
    { name: "Dharmesh Vadher", plan: "1 Year" },
    { name: "Jashan Singh", plan: "1 Year for 2 devices" },
    { name: "Vinit", plan: "1 Year" },
    { name: "Siva Kumar", plan: "1 Year" },
    { name: "Amit singh", plan: "1 Year" },
    { name: "Awasthi", plan: "1 Year" },
    { name: "Nikesh", plan: "1 Year" },
    { name: "Zohaib", plan: "1 Year" },
    { name: "Tekhum", plan: "1 Year" },
    { name: "Sunny ETISALAT", plan: "1 Year" },
    { name: "Vinay Sharma", plan: "1 Year" },
    { name: "Setius", plan: "1 Year" },
    { name: "Rineesh Aboobacker", plan: "1 Year" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav
        className={`w-full flex items-center justify-between px-6 py-4 fixed top-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-gray-900/80 backdrop-blur-md shadow-2xl"
              : "bg-gray-900/70 backdrop-blur-md"
          }
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
              onClick={() =>
                item.id === "feedback"
                  ? setFeedbackOpen(true)
                  : item.link
                  ? item.link()
                  : scrollToSection(item.id)
              }
              className={`transition-colors hover:text-white ${
                activeSection === item.id ? "text-white font-bold" : ""
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-200 focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg p-6 flex flex-col gap-6 z-40">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                item.id === "feedback"
                  ? setFeedbackOpen(true)
                  : item.link
                  ? item.link()
                  : scrollToSection(item.id)
              }
              className="text-gray-200 hover:text-white text-lg"
            >
              {item.icon} {item.name}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header
        id="home"
        className="text-center pt-28 pb-16 px-4 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          🏠 Your All-in-One Entertainment Solution 🎬📺
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-200">
          14,000+ Live TV Channels, 60,000+ Movies & 12,000+ Web Series.
          Unlimited fun, unbeatable price, anytime on any device 🌍
        </p>
      </header>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PlanCard title="1 Month" color="purple" price="₹199 / 9 AED" tgLink={tgLink("1 Month")} buttonText="Start Now" />
          <PlanCard title="3 Months" color="blue" price="₹549 / 25 AED" tgLink={tgLink("3 Months")} buttonText="Buy Now" />
          <PlanCard title="6 Months" color="green" price="₹1049 / 47 AED" tgLink={tgLink("6 Months")} buttonText="Subscribe" />
          <PlanCard title="12 Months" color="red" price="₹1999 / 90 AED" tgLink={tgLink("12 Months")} buttonText="Get Access" bestValue />
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
          We Accept
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <button
            onClick={() => setPaymentModal("upi")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            UPI
          </button>
          <button
            onClick={() => setPaymentModal("bank")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            Bank Transfer
          </button>
        </div>
      </section>

      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6">
          <button
            onClick={() => setPaymentModal(null)}
            className="self-end mb-4 text-white text-2xl font-bold"
          >
            ✖
          </button>

          {paymentModal === "upi" && (
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Pay via UPI</h3>
              <Zoom>
                <img
                  src={"/upi-qr.png"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/upi-qr.jpg";
                  }}
                  alt="UPI QR Code"
                  className="mx-auto w-48 h-48 object-contain bg-white rounded-lg p-2 shadow-lg cursor-zoom-in"
                />
              </Zoom>
              <p className="mt-4 text-lg">
                <span className="font-semibold">UPI ID:</span>{" "}
                <button
                  onClick={() => navigator.clipboard.writeText("Aryxn.677@okicici")}
                  className="text-purple-400 hover:underline"
                >
                  Aryxn.677@okicici 📋
                </button>
              </p>
            </div>
          )}

          {paymentModal === "bank" && (
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Bank Transfer</h3>
              <p className="mb-2">
                <span className="font-semibold">Account Holder:</span> Bindu Rani
              </p>
              <p className="mb-2">
                <span className="font-semibold">Bank:</span> Bank of Baroda
              </p>
              <p className="mb-2">
                <span className="font-semibold">Account No:</span>{" "}
                <button
                  onClick={() => navigator.clipboard.writeText("25830100017611")}
                  className="text-purple-400 hover:underline"
                >
                  25830100017611 📋
                </button>
              </p>
              <p className="mb-2">
                <span className="font-semibold">IFSC:</span>{" "}
                <button
                  onClick={() => navigator.clipboard.writeText("BARB0HANUMA")}
                  className="text-purple-400 hover:underline"
                >
                  BARB0HANUMA 📋
                </button>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col items-center overflow-y-auto p-6">
          <button
            onClick={() => setFeedbackOpen(false)}
            className="self-end mb-4 text-white text-2xl font-bold"
          >
            ✖
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Zoom>
                    <img
                      src={`/review_images/${index * 2 + 1}.png`}
                      onError={(e) => (e.currentTarget.src = "/fallback.png")}
                      alt={`${review.name} - 1`}
                      className="rounded-lg w-full h-56 object-contain bg-black"
                    />
                  </Zoom>
                  <Zoom>
                    <img
                      src={`/review_images/${index * 2 + 2}.png`}
                      onError={(e) => (e.currentTarget.src = "/fallback.png")}
                      alt={`${review.name} - 2`}
                      className="rounded-lg w-full h-56 object-contain bg-black"
                    />
                  </Zoom>
                </div>
                <div className="mt-4 border-t border-gray-700 pt-3 text-center">
                  <p className="text-lg font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Telegram Button */}
      <a
        href="https://t.me/ottboxsupport"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition"
      >
        💬
      </a>
    </div>
  );
}

function PlanCard({ title, color, price, tgLink, buttonText, bestValue }) {
  const colorMap = {
    purple: {
      border: "border-purple-600",
      text: "text-purple-400",
      bg: "bg-purple-500 hover:bg-purple-600",
    },
    blue: {
      border: "border-blue-600",
      text: "text-blue-400",
      bg: "bg-blue-500 hover:bg-blue-600",
    },
    green: {
      border: "border-green-600",
      text: "text-green-400",
      bg: "bg-green-500 hover:bg-green-600",
    },
    red: {
      border: "border-red-600",
      text: "text-red-400",
      bg: "bg-red-500 hover:bg-red-600",
    },
  };

  return (
    <div
      className={`bg-gray-900 p-6 rounded-2xl shadow-lg ${colorMap[color].border} hover:scale-105 transition-transform flex flex-col justify-between relative`}
    >
      {bestValue && (
        <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-sm animate-bounce shadow-lg">
          Best Value
        </span>
      )}
      <h3 className={`text-2xl font-bold mb-4 ${colorMap[color].text}`}>
        {title}
      </h3>
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
        <span className="bg-green-600 px-2 py-1 rounded text-xs font-semibold">
          UPI
        </span>
        <span className="bg-blue-600 px-2 py-1 rounded text-xs font-semibold">
          Bank
        </span>
      </div>
      <a
        href={tgLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-white font-semibold py-3 rounded-lg text-center transition-all transform hover:scale-105 shadow-lg animate-pulse ${colorMap[color].bg}`}
      >
        {buttonText}
      </a>
    </div>
  );
}
