// components/Footer.jsx
import { FaFacebookF, FaLinkedinIn, FaXTwitter, FaYoutube, FaRss } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#fdfbf8] text-gray-800 py-6 border-t border-gray-200">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section - Socials */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Follow us</span>
          <div className="flex gap-3 text-gray-500">
            <FaFacebookF className="hover:text-gray-800 transition" />
            <FaLinkedinIn className="hover:text-gray-800 transition" />
            <FaXTwitter className="hover:text-gray-800 transition" />
            <FaYoutube className="hover:text-gray-800 transition" />
            <FaRss className="hover:text-gray-800 transition" />
          </div>
        </div>

        {/* Right Section - Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-5 text-sm">
          <a href="#" className="hover:text-black">Pricing</a>
          <a href="#" className="hover:text-black">Help</a>
          <a href="#" className="hover:text-black">Developer Platform</a>
          <a href="#" className="hover:text-black">Press</a>
          <a href="#" className="hover:text-black">Jobs</a>
          <a href="#" className="hover:text-black">Enterprise</a>
          <a href="#" className="hover:text-black">Templates</a>
          <a href="#" className="hover:text-black">App Integrations</a>
          <a href="#" className="hover:text-black">Partners Program</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1 font-semibold text-lg">
          <span className="text-orange-600">_</span>
          <span>Appointo</span>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2 md:mt-0">
          <span>© 2025 Appointo Inc.</span>
          <a href="#" className="hover:text-black">Manage cookies</a>
          <a href="#" className="hover:text-black">Legal</a>
          <a href="#" className="hover:text-black">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
