import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Header component displays the logo and a short, bold value prop sentence
const Header: React.FC = () => {
  return (
    <header className="w-full py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100 bg-white/20 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center">
        {/* Small logo, aspect ratio preserved */}
        <img src="/LOGO SMALL.png" alt="Chumzee Logo" className="h-6 sm:h-8 w-auto mr-2 sm:mr-4" />
        {/* Short, bold value prop sentence inspired by Basecamp - hidden on mobile */}
        <p className="hidden md:block text-lg font-bold text-gray-600">The tool for managing your professional relationships.</p>
      </div>
      
      <Button
        className="animate-gradient-slide text-white px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base rounded-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300"
        onClick={() => {
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        Sign up free
        <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Button>
    </header>
  );
};

export default Header; 