"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Handshake, MessageSquare } from "lucide-react";

export default function ContactUs() {
  const contactInfo = [
    {
      title: "General Inquiry",
      email: "contact@thesundelight.com",
      icon: <Mail className="w-5 h-5" />,
      link: "mailto:contact@thesundelight.com",
    },
    {
      title: "Customer Feedback",
      email: "customercare@thesundelight.com",
      icon: <MessageSquare className="w-5 h-5" />,
      link: "mailto:customercare@thesundelight.com",
    },
    {
      title: "Our Location",
      email: "UG 05, Aggarwal Prestige Mall, Rani Bagh, Pitam Pura, New Delhi, 110034",
      icon: <MapPin className="w-5 h-5" />,
      link: "https://maps.google.com",
    },
  ];

  return (
    <section className="min-h-screen bg-[#fffdf9] py-14 lg:py-32 overflow-hidden">
      <div className="container mx-auto pt-12 md:pt-0 px-4 sm:px-6 max-w-[1300px]">

        {/* Header */}
        <div className="text-center mb-10 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#c05621] font-bold tracking-[0.4em] uppercase text-xs"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#3d1f00] font-['Playfair_Display'] mt-4"
          >
            {"Let's Start a "}
            <span className="text-[#c05621] italic">Conversation.</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-10 rounded-2xl lg:rounded-[3rem] shadow-xl shadow-orange-900/5 border border-[#3d1f00]/5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#3d1f00] font-['Playfair_Display'] mb-6 sm:mb-8">
                Contact Details
              </h3>

              <div className="space-y-7 sm:space-y-10">
                {contactInfo.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-2xl bg-[#fff8f0] border border-[#c05621]/10 flex items-center justify-center text-[#c05621] group-hover:bg-[#c05621] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9c6644] mb-1">{item.title}</p>
                      <p className="text-[#3d1f00] text-sm font-medium leading-relaxed group-hover:text-[#c05621] transition-colors italic">
                        {item.email}
                      </p>
                    </div>
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="pt-5 border-t border-[#3d1f00]/5 flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#fff8f0] flex items-center justify-center text-[#c05621] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9c6644] mb-1">Call Us</p>
                    <p className="text-[#3d1f00] text-sm opacity-50 italic">Number sharing soon...</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-[3.5rem] shadow-2xl shadow-orange-900/5 border border-[#c05621]/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 sm:p-8">
                <Handshake className="w-12 h-12 sm:w-16 sm:h-16 text-[#fde8c0] opacity-50" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3d1f00] font-['Playfair_Display'] mb-3">
                  Dealer Connect
                </h2>
                <p className="text-[#9c6644] text-sm leading-relaxed mb-6 sm:mb-8">
                  Partner with a Growing FMCG Brand from the House of Suntek. We invite distributors and super stockists to build India's most trusted snacking brand together.
                </p>

                <form className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { label: "Full Name", type: "text", placeholder: "John Doe" },
                    { label: "Firm Name", type: "text", placeholder: "Your Business Ltd." },
                    { label: "Email Address", type: "email", placeholder: "john@example.com" },
                    { label: "Location/City", type: "text", placeholder: "New Delhi, India" },
                  ].map((field, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-tighter text-[#3d1f00] ml-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="bg-[#fff8f0] border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#c05621] outline-none transition-all"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-tighter text-[#3d1f00] ml-2">
                      Tell us about your reach
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Mention your distribution network size..."
                      className="bg-[#fff8f0] border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#c05621] outline-none transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sm:col-span-2 bg-[#c05621] text-white py-4 sm:py-5 rounded-2xl font-bold tracking-widest uppercase text-xs shadow-xl shadow-[#c05621]/30 hover:bg-[#a84a1c] transition-all"
                  >
                    Send Partnership Request
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Background blur */}
        <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#fde8c0]/30 rounded-full blur-[120px] pointer-events-none -z-10" />
      </div>
    </section>
  );
}
