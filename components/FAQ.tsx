"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        id: 1,
        question: "Do you offer vegan or gluten-free options?",
        answer: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.",
    },
    {
        id: 2,
        question: "How long do the cookies stay fresh?",
        answer: "Our cookies are baked fresh daily with no preservatives. They maintain their optimal freshness and gooey texture for up to 3-5 days when stored in an airtight container at room temperature. You can also freeze them for up to 3 months!",
    },
    {
        id: 3,
        question: "Do you ship internationally?",
        answer: "Currently, we only ship nationwide. We are working hard to expand our logistics to bring freshly baked happiness to cookie lovers worldwide very soon!",
    },
    {
        id: 4,
        question: "Can I customize an order for events or parties?",
        answer: "Absolutely! We love catering to special events. Please contact us through the 'Grow With Us' page at least 2 weeks in advance to discuss custom flavors, packaging, and volume discounts.",
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
