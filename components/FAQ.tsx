"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        id: 1,
        question: "What ingredients are used in Sundelight biscuits?",
        answer: "We use high-quality ingredients such as premium wheat flour, butter, sugar, and natural flavors.",
    },
    {
        id: 2,
        question: "Are Sundelight biscuits safe and hygienic?",
        answer: "Yes. Our biscuits are manufactured in modern facilities following strict food safety and hygiene standards.",
    },
    {
        id: 3,
        question: "Where can I buy Sundelight biscuits?",
        answer: "Our products are available through distributors, retailers, and online platforms.",
    },
    {
        id: 4,
        question: "How can I become a distributor or dealer?",
        answer: "You can apply through the \"Become a Dealer\" page on our website.",
    },
    {
        id: 5,
        question: "Do you export your products?",
        answer: "Yes, we are working towards expanding Sundelight to international markets.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section style={{
                    background: "linear-gradient(160deg, #fffdf9 0%, #fff8f0 50%, #fef3e2 100%)",

        }} className="py-24  relative z-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4"
                    >
                        Frequently Asked <span className="text-brand-primary">Questions</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-brand-dark/70 font-body"
                    >
                        Everything you need to know about our delicious cookies.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-brand-primary/10 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className={`font-bold text-lg ${isOpen ? 'text-brand-primary' : 'text-brand-dark'} transition-colors duration-300`}>
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex-shrink-0 ml-4 p-1 rounded-full ${isOpen ? 'bg-brand-primary text-white' : 'bg-brand-light text-brand-primary'}`}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-brand-dark/70 font-body leading-relaxed border-t border-brand-light pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
