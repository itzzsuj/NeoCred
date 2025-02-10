import React from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import TrueFocus from "../components/TrueFocus";

const items = [
  { content: "Analyzing Bank Statements 📊" },
  { content: "Utility Payment Patterns 💡" },
  { content: "Assessing Spending Habits 💳" },
  { content: "Loan Repayment Consistency 🏦" },
  { content: "Social Media Financial Insights 📱" },
  { content: "AI-driven Credit Scoring 🧠" },
];

const Home = () => {
  return (
    <div className="home-container flex flex-col md:flex-row h-screen items-center justify-center px-4 md:px-10 bg-gradient-to-br from-dark-blue to-black">
      {/* Left side: Text Content */}
      <div className="text-content w-full md:w-[40%] text-soft-pink text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to{" "}
          <span className="text-5xl md:text-6xl font-extrabold">
            <TrueFocus
              sentence="NEO CRED"
              manualMode={false} // Auto animation
              blurAmount={5} // Blur intensity
              borderColor="#fbeaeb" // Border color
              glowColor="rgba(251, 234, 235, 0.6)" // Glow effect
              animationDuration={1} // Animation speed
              pauseBetweenAnimations={1} // Pause time
            />
          </span>
        </h1>
        <p className="text-lg text-light-blue mt-4">
          A smarter way to assess credit risk using alternative financial data.
          <br />
          <strong className="text-xl">No traditional credit history? No problem.</strong>
        </p>
      </div>

      {/* Right side: Infinite Scroll */}
      <div className="scroll-container w-full md:w-[60%] overflow-hidden">
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection="left"
          autoplay={true}
          autoplaySpeed={0.1}
          autoplayDirection="down"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
};

export default React.memo(Home);