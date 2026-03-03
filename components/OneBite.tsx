"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function OneBite() {
    return (
        <section className="py-24 relative overflow-hidden bg-brand-primary">
            {/* Decorative background vectors */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cookie-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="30" cy="30" r="10" fill="currentColor" />
                            <circle cx="25" cy="25" r="2" fill="#000" />
                            <circle cx="35" cy="32" r="2" fill="#000" />
                            <circle cx="28" cy="36" r="2" fill="#000" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cookie-pattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-brand-dark/20 backdrop-blur-md rounded-[3rem] p-10 md:p-20 overflow-hidden relative border border-white/10 shadow-2xl">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Text */}
                        <div className="text-center md:text-left z-20">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                    One Bite Will Leave You <br />
                                    <span className="text-brand-secondary">Wanting More</span>
                                </h2>
                                <p className="text-white/80 text-lg md:text-xl font-body mb-8 max-w-xl">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar.
                                </p>

                                <div className="inline-block bg-white text-brand-primary font-black text-2xl md:text-4xl px-8 py-4 rounded-2xl shadow-xl transform -rotate-2 mb-8 border-4 border-brand-secondary">
                                    DON&apos;T MISS THE 50% DISCOUNT
                                </div>

                                <div>
                                    <Link
                                        href="#order"
                                        className="inline-block px-10 py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                    >
                                        Claim Your Discount Now
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating Image */}
                        <div className="relative h-[400px] hidden md:flex justify-center items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="absolute w-[120%] h-[120%] right-[-20%] z-10"
                            >
                                <Image
                                    src="/hero_cookie_stack_1772478506308.png"
                                    alt="Discounted Cookies"
                                    fill
                                    className="object-contain drop-shadow-2xl filter brightness-110"
                                />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
