import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function FooterSection() {
    return (
        <footer className="bg-brand-dark text-brand-bg pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Contact col */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold text-white font-heading tracking-tight">
                            Sun Delight<span className="text-brand-primary">.</span>
                        </h3>
                        <p className="text-brand-light/70 font-body text-sm leading-relaxed max-w-xs">
                            Freshly Baked Happiness in Every Bite. Elegant cookies for sophisticated palates.
                        </p>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-3 text-brand-light/90">
                                <MapPin size={20} className="text-brand-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm">Pitam Pura, New Delhi, 110034</span>
                            </div>
                            <div className="flex items-center gap-3 text-brand-light/90">
                                <Phone size={20} className="text-brand-primary flex-shrink-0" />
                                <span className="text-sm">(+86) 7654-765</span>
                            </div>
                            <div className="flex items-center gap-3 text-brand-light/90">
                                <Mail size={20} className="text-brand-primary flex-shrink-0" />
                                <span className="text-sm">mail@sundelight.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm">Our Page</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-brand-light/70 hover:text-white transition-colors duration-200">Home</Link></li>
                            <li><Link href="#about" className="text-brand-light/70 hover:text-white transition-colors duration-200">About Us</Link></li>
                            <li><Link href="#products" className="text-brand-light/70 hover:text-white transition-colors duration-200">Products</Link></li>
                            <li><Link href="/careers" className="text-brand-light/70 hover:text-white transition-colors duration-200">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm">Key Features</h4>
                        <ul className="space-y-4">
                            <li><Link href="/catalogue" className="text-brand-light/70 hover:text-white transition-colors duration-200">Product Catalogue</Link></li>
                            <li><Link href="/order" className="text-brand-light/70 hover:text-white transition-colors duration-200">Online Order</Link></li>
                            <li><Link href="/offers" className="text-brand-light/70 hover:text-white transition-colors duration-200">Special Offers</Link></li>
                            <li><Link href="/contact" className="text-brand-light/70 hover:text-white transition-colors duration-200">Easy Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm">Stay Updated</h4>
                        <p className="text-brand-light/70 font-body text-sm mb-4">
                            Subscribe to our newsletter for the latest updates and exclusive 50% discount offers.
                        </p>
                        <form className="flex mb-6">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-white/10 text-white px-4 py-2 rounded-l-lg outline-none focus:ring-2 focus:ring-brand-primary w-full text-sm font-body border border-white/20"
                            />
                            <button
                                type="submit"
                                className="bg-brand-primary hover:bg-brand-secondary text-white font-bold px-4 py-2 rounded-r-lg transition-colors duration-200"
                            >
                                Go
                            </button>
                        </form>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200">
                                <Facebook size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200">
                                <Twitter size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200">
                                <Instagram size={18} />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors duration-200">
                                <Youtube size={18} />
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-brand-light/50 text-sm font-body">
                        Copyright © {new Date().getFullYear()} Sun Delight. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-brand-light/50 font-body">
                        <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
                        <Link href="/disclaimer" className="hover:text-white transition-colors duration-200">Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
