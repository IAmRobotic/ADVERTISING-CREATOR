
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-10 py-6 bg-gradient-to-r from-purple-600 to-teal-600 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Ready to take control of your career?
          </h2>
          
        </div>



        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Chumzee. All rights reserved. Built with love for all those who want to grow their careers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
