"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Heart, Clock, Box } from "lucide-react";

const stats = [
    { id: 1, label: "Love Cookies", value: 15000, suffix: "+", icon: Heart },
    { id: 2, label: "Fast Service", value: 98, suffix: "%", icon: Clock },
    { id: 3, label: "Good Package", value: 98, suffix: "%", icon: Box },
];

const reasons = [
    {
        title: "Premium Ingredients",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
    },
    {
        title: "Freshly Baked Daily",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
    },
    {
        title: "Easy For Ordering",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
    },
];

// Counting hook setup
function AnimatedCounter({ from, to, duration, suffix }: { from: number, to: number, duration: number, suffix: string }) {
    const [count, setCount] = useState(from);
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (inView) {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

                // easeOutQuart
                const easeOut = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(easeOut * (to - from) + from));

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [inView, from, to, duration]);

    // Format number (e.g., 15000 -> 15k)
    const displayValue = count >= 1000 ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k` : count;

    return <span ref={nodeRef}>{displayValue}{suffix}</span>;
}

export default function WhyUsSection() {
    return (
        <section style={{
                    background: "linear-gradient(160deg, #fffdf9 0%, #fff8f0 50%, #fef3e2 100%)",

        }} className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6"
                        >
                            We are the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">best cookie shop</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-brand-dark/70 font-body mb-10"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis dapibus leo.
                        </motion.p>

                        <div className="space-y-8">
                            {reasons.map((reason, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-8 h-8 text-brand-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-dark mb-2">{reason.title}</h3>
                                        <p className="text-brand-dark/70 font-body">{reason.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-light/50 rounded-full blur-3xl -z-10" />

                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                                    className={`bg-white rounded-3xl p-8 border border-brand-primary/10 shadow-xl flex flex-col items-center text-center ${idx === 2 ? 'sm:col-span-2 sm:mx-auto sm:w-1/2' : ''}`}
                                >
                                    <div className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-4xl lg:text-5xl font-black text-brand-dark mb-2 font-heading">
                                        <AnimatedCounter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
                                    </h4>
                                    <p className="text-brand-dark/60 font-bold uppercase tracking-widest text-sm">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
