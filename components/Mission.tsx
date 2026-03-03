"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MissionSection() {
    return (
        <section id="about" 
        style={{
                    background: "linear-gradient(160deg, #fffdf9 0%, #fff8f0 50%, #fef3e2 100%)",
        }}
        className="py-24  relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Images / Visuals */}
                    <div className="relative h-[500px] w-full flex justify-center items-center">
                        {/* Background Blob */}
                        <motion.div
                            className="absolute w-80 h-80 bg-brand-secondary/40 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Front Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-[400px] aspect-square z-20"
                        >
                            <Image
                                src="/chocochips_cookie_1772478447627.png"
                                alt="Classic Chocolate Chip Cookie"
                                fill
                                className="object-contain drop-shadow-xl"
                            />
                        </motion.div>

                        {/* Floating Element */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [-15, 15, -15] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border border-brand-primary/10 z-30"
                        >
                            <div className="text-center">
                                <p className="text-brand-primary font-bold text-3xl">100%</p>
                                <p className="text-xs text-brand-dark/70 font-semibold uppercase tracking-wider">Natural</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6"
                        >
                            Elegant cookies for <br />
                            <span className="text-brand-primary line-through decoration-4 decoration-brand-secondary mr-2">ordinary</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                                sophisticated
                            </span> palates.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-brand-dark/70 font-body mb-10 leading-relaxed"
                        >
                            We believe that a cookie is more than just a treat; it's an experience.
                            Our master bakers blend traditional techniques with innovative flavors to
                            create masterpieces that delight the senses.
                        </motion.p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Mission */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-brand-primary/10"
                            >
                                <h3 className="text-xl font-bold text-brand-accent mb-3 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
                                    Our Mission
                                </h3>
                                <p className="text-brand-dark/80 font-body text-sm leading-relaxed">
                                    To spread happiness, one perfectly baked, gooey-centered cookie at a time, using only sustainable and premium ingredients.
                                </p>
                            </motion.div>

                            {/* Vision */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-brand-primary/10"
                            >
                                <h3 className="text-xl font-bold text-brand-accent mb-3 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-brand-secondary rounded-full"></span>
                                    Our Vision
                                </h3>
                                <p className="text-brand-dark/80 font-body text-sm leading-relaxed">
                                    To become the world's most beloved cookie brand, synonymous with quality, creativity, and unforgettable moments.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
