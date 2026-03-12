import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

export default function FooterSection() {
  return (
    <div className="relative">
      {/* Blinking Sun — sits above footer, fully visible */}
      <div className="absolute -top-20 right-6 sm:right-10 z-20 w-40 h-40 sm:w-44 sm:h-44 pointer-events-none">
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(217,119,6,0.15) 40%, transparent 70%)",
              animation: "sunGlow 2.4s ease-in-out infinite",
            }}
          />
          <svg className="absolute inset-[-20%] w-[140%] h-[140%]" viewBox="0 0 200 200" style={{ animation: "sunSpin 20s linear infinite" }}>
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const cx = 100, cy = 100;
              const inner = 58, outer = i % 2 === 0 ? 82 : 72;
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(angle) * inner}
                  y1={cy + Math.sin(angle) * inner}
                  x2={cx + Math.cos(angle) * outer}
                  y2={cy + Math.sin(angle) * outer}
                  stroke="rgba(251,191,36,0.3)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <Image
            src="/sun.jpeg"
            alt="Sun Delight"
            width={176}
            height={176}
            className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-full object-cover"
            style={{
              boxShadow: "0 0 30px rgba(251,191,36,0.4), 0 0 60px rgba(217,119,6,0.2)",
              animation: "sunBlink 3s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes sunGlow { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.18); opacity: 1; } }
        @keyframes sunBlink { 0%, 100% { box-shadow: 0 0 30px rgba(251,191,36,0.4), 0 0 60px rgba(217,119,6,0.2); } 50% { box-shadow: 0 0 50px rgba(251,191,36,0.65), 0 0 90px rgba(217,119,6,0.35), 0 0 120px rgba(251,191,36,0.15); } }
        @keyframes sunSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <footer className="bg-brand-dark text-brand-bg pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand & Contact */}
            <div className="space-y-6">
              <Image alt="logo" width={1000} height={1000} src="/logo-sun.png" className="w-32 h-16" />
              <p className="text-brand-secondary font-bold text-sm mb-1">SUNTEK SUPERFOODS LLP</p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-brand-light/90">
                  <MapPin size={20} className="text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-sm">Plot No. 2, UG-05, Aggarwal Prestige Mall, Sant Nagar, M2K Road, Rani Bagh. North West, Delhi - 110034</span>
                </div>
                <div className="flex items-center gap-3 text-brand-light/90">
                  <Phone size={20} className="text-brand-primary shrink-0" />
                  <a href="tel:8586859999" className="text-sm hover:text-white transition-colors">8586859999</a>
                </div>
                <div className="flex items-center gap-3 text-brand-light/90">
                  <Mail size={20} className="text-brand-primary shrink-0" />
                  <a href="mailto:customercare@thesundelight.com" className="text-sm hover:text-white transition-colors">customercare@thesundelight.com</a>
                </div>
              </div>
            </div>

            {/* Links 1 */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Our Page</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-brand-light/70 hover:text-white transition-colors duration-200">Home</Link></li>
                <li><Link href="/about-us" className="text-brand-light/70 hover:text-white transition-colors duration-200">About Us</Link></li>
                <li><Link href="/product" className="text-brand-light/70 hover:text-white transition-colors duration-200">Products</Link></li>
                <li><Link href="/careers" className="text-brand-light/70 hover:text-white transition-colors duration-200">Careers</Link></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Key Features</h4>
              <ul className="space-y-4">
                <li><Link href="/reciepes" className="text-brand-light/70 hover:text-white transition-colors duration-200">Our Reciepes</Link></li>
                <li><Link href="/become-a-dealer" className="text-brand-light/70 hover:text-white transition-colors duration-200">Become A Dealer</Link></li>
                <li><Link href="/our-journey" className="text-brand-light/70 hover:text-white transition-colors duration-200">Our Journey</Link></li>
                <li><Link href="/contact-us" className="text-brand-light/70 hover:text-white transition-colors duration-200">Easy Contact</Link></li>
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
              <p className="text-brand-light/70 font-body text-sm mb-4">
                Subscribe to our newsletter for the latest updates and exclusive 50% discount offers.
              </p>
              <form className="flex mb-6">
                <input type="email" placeholder="Your email address" className="bg-white/10 text-white px-4 py-2 rounded-l-lg outline-none focus:ring-2 focus:ring-brand-primary w-full text-sm font-body border border-white/20" />
                <button type="submit" className="bg-brand-primary hover:bg-brand-secondary text-white font-bold px-4 py-2 rounded-r-lg transition-colors duration-200">Go</button>
              </form>
              <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200"><Facebook size={18} /></Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200"><Twitter size={18} /></Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200"><Instagram size={18} /></Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200"><Youtube size={18} /></Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-light/50 text-sm font-body">
              Copyright © {new Date().getFullYear()} Sun Delight. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-brand-light/50 font-body">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors duration-200">Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
