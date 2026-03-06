"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Handshake,
  ShieldCheck,
  Award,
  BadgePercent,
  Truck,
  LayoutTemplate,
  Megaphone,
  ChevronRight,
  MapPin,
  Zap,
} from "lucide-react";

const WHY_PARTNER = [
  {
    title: "Strong Parentage",
    icon: <ShieldCheck className="w-6 h-6" />,
    desc: "Sun Delight is powered by the Suntek Group, a name trusted for decades in manufacturing excellence, quality control, and ethical business practices across industries.",
  },
  {
    title: "High-Quality Products",
    icon: <Award className="w-6 h-6" />,
    desc: "Our biscuits are crafted using carefully selected ingredients, standardized recipes, and modern manufacturing processes to ensure consistent taste, superior freshness, and uniform quality across batches.",
    bullets: [
      "Consistent taste and texture",
      "Superior freshness and shelf life",
      "Uniform quality across batches",
    ],
  },
  {
    title: "Competitive Pricing & Healthy Margins",
    icon: <BadgePercent className="w-6 h-6" />,
    desc: "We offer trade-friendly pricing, transparent policies, and attractive margins that enable our partners to grow profitably in competitive markets.",
  },
  {
    title: "Reliable Supply Chain",
    icon: <Truck className="w-6 h-6" />,
    desc: "With manufacturing operations at Rajpura (Punjab) and a robust logistics network, we ensure:",
    bullets: [
      "Timely dispatches",
      "Minimal stock-outs",
      "Scalable supply as demand grows",
    ],
  },
  {
    title: "Attractive Packaging & Branding",
    icon: <LayoutTemplate className="w-6 h-6" />,
    desc: "Our products feature consumer-friendly, eye-catching packaging designed to stand out on shelves and drive repeat purchases.",
  },
  {
    title: "Marketing & Sales Support",
    icon: <Megaphone className="w-6 h-6" />,
    desc: "We actively support our partners through:",
    bullets: [
      "In-store visibility material",
      "Launch and promotional schemes",
      "Sales team coordination",
      "Region-wise expansion planning",
    ],
  },
];

const PARTNER_TYPES = [
  "Super Stockists",
  "Distributors",
  "Wholesalers",
  "Modern Trade & Institutional Buyers",
];

const VISION_POINTS = [
  "Expanding product portfolio",
  "Increasing brand recognition",
  "Long-term business stability",
];

export default function DealerConnectPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="bg-[#fffdf9] text-[#3d1f00] font-sans">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute top-20 left-[10%] w-96 h-96 bg-[#fde8c0] rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-10 right-[10%] w-[500px] h-[500px] bg-[#c05621]/10 rounded-full blur-[100px]" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 max-w-[1300px] pt-7 sm:pt-0">
          <div className="max-w-[1000px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#c05621]/5 border border-[#c05621]/10 mb-8"
            >
              <Handshake className="w-4 h-4 text-[#c05621]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c05621]">
                Dealer Connect
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-[5rem] font-black leading-[0.9] font-['Playfair_Display'] mb-10"
            >
              Partner with a Growing <br />
              <span className="text-[#c05621] italic">
                FMCG Brand from the House of Suntek.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl lg:text-2xl text-[#9c6644] max-w-3xl leading-relaxed"
            >
              At Sun Delight, we believe strong partnerships are the foundation
              of lasting success. Backed by the legacy, scale, and operational
              excellence of the{" "}
              <span className="text-[#3d1f00] font-bold">Suntek Group</span>, we
              are entering the FMCG space with a clear focus on quality,
              consistency, and nationwide reach.
            </motion.p>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-14 md:py-24 bg-white border-[#ead5c9] border-t rounded-t-[5rem] shadow-[-20px_-20px_60px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-6 max-w-[1300px]">
          <div className="mb-20 text-center">
            <h2 className="text-4xl lg:text-6xl font-black font-['Playfair_Display'] mb-6">
              Why Partner with{" "}
              <span className="text-[#c05621]">Sun Delight?</span>
            </h2>
            <p className="text-[#9c6644] max-w-2xl mx-auto">
              We bring operational excellence, process discipline, and a quality
              mindset to everyday consumer products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_PARTNER.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[3rem] bg-[#fffdf9] border border-[#3d1f00]/5 hover:border-[#c05621]/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#fde8c0]/30 flex items-center justify-center text-[#c05621] mb-8 group-hover:bg-[#c05621] group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display']">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9c6644] leading-relaxed">
                  {item.desc}
                </p>
                {item.bullets && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#9c6644]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c05621] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & WHO CAN PARTNER */}
      <section className="py-12 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-[1300px]">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 text-[15rem] font-black text-[#fde8c0]/30 -z-10 font-['Playfair_Display']">
                "
              </div>
              <h2 className="text-4xl lg:text-5xl font-black font-['Playfair_Display'] mb-8">
                Our Vision for <br /> Trade Partners
              </h2>
              <p className="text-lg text-[#9c6644] mb-6 leading-relaxed italic">
                "We don't just appoint distributors — we build long-term
                partnerships. Our goal is to create a strong, sustainable
                distribution network that benefits every stakeholder in the
                value chain."
              </p>
              <p className="text-sm text-[#9c6644] mb-10 leading-relaxed">
                As Sun Delight expands across India, our channel partners grow
                alongside us with:
              </p>
              <div className="space-y-4">
                {VISION_POINTS.map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-[#3d1f00]/5"
                  >
                    <ChevronRight className="text-[#c05621] w-5 h-5 shrink-0" />
                    <span className="font-bold text-[#3d1f00] text-sm uppercase tracking-wide">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#b76410] p-12 lg:p-20 rounded-[4rem] text-white relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#c05621]/20 rounded-full blur-3xl" />
              <h3 className="text-3xl font-bold font-['Playfair_Display'] mb-4 text-orange-200">
                Who Can Partner With Us?
              </h3>
              <p className="text-orange-100/60 mb-12 leading-relaxed">
                We are looking to collaborate with partners who share our
                commitment to quality, integrity, and growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PARTNER_TYPES.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 pb-4 border-b border-white/10 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform shrink-0" />
                    <span className="font-bold tracking-widest text-xs uppercase">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-0 container mx-auto px-4 sm:px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black font-['Playfair_Display'] mb-6 lg:mb-8">
              Who are <br className="hidden sm:block" /> we looking <br className="hidden sm:block" />{" "}
              <span className="text-[#c05621]">for?</span>
            </h2>
            <div className="space-y-4 sm:space-y-8">
              {["Super Stockists", "Distributors", "Modern Trade Buyers"].map(
                (type, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-4 sm:py-6 border-b border-[#3d1f00]/10 group cursor-pointer"
                  >
                    <span className="text-base sm:text-xl font-bold group-hover:translate-x-4 transition-transform group-hover:text-[#c05621]">
                      {type}
                    </span>
                    <Zap className="w-5 h-5 text-[#c05621] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 lg:p-16 rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(61,31,0,0.1)] border border-[#3d1f00]/5">
            <div className="mb-8 lg:mb-12">
              <h4 className="text-xl sm:text-2xl font-bold mb-2">Let&apos;s Connect</h4>
              <p className="text-[#9c6644] text-sm">
                Fill in your business details below.
              </p>
            </div>

            <form className="space-y-7 sm:space-y-10">
              <div className="relative group">
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#3d1f00]/10 py-3 sm:py-4 outline-none focus:border-[#c05621] transition-colors"
                />
                <label className="absolute left-0 top-3 sm:top-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9c6644]/50 pointer-events-none transition-all peer-focus:-top-5 sm:peer-focus:-top-6 peer-focus:text-[#c05621] peer-focus:text-[10px]">
                  Your Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#3d1f00]/10 py-3 sm:py-4 outline-none focus:border-[#c05621] transition-colors"
                />
                <label className="absolute left-0 top-3 sm:top-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9c6644]/50 pointer-events-none transition-all peer-focus:-top-5 sm:peer-focus:-top-6 peer-focus:text-[#c05621] peer-focus:text-[10px]">
                  Firm Name
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-10">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-[#3d1f00]/10 py-3 sm:py-4 outline-none focus:border-[#c05621] transition-colors"
                  />
                  <label className="absolute left-0 top-3 sm:top-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9c6644]/50 pointer-events-none transition-all peer-focus:-top-5 sm:peer-focus:-top-6 peer-focus:text-[#c05621] peer-focus:text-[10px]">
                    City
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-[#3d1f00]/10 py-4 outline-none focus:border-[#c05621] transition-colors"
                  />
                  <label className="absolute left-0 top-4 text-sm font-bold uppercase tracking-widest text-[#9c6644]/50 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[#c05621] peer-focus:text-[10px]">
                    Mobile
                  </label>
                </div>
              </div>

              <div className="relative group">
                <select
                  defaultValue=""
                  className="peer w-full bg-transparent border-b-2 border-[#3d1f00]/10 py-4 outline-none focus:border-[#c05621] transition-colors text-sm font-bold uppercase tracking-widest appearance-none cursor-pointer text-[#3d1f00]"
                >
                  <option value="" disabled className="text-[#9c6644]/50">
                    Partnership Interest
                  </option>
                  <option>Super Stockist</option>
                  <option>Distributor</option>
                  <option>Wholesaler</option>
                  <option>Modern Trade / Institutional Buyer</option>
                </select>
                <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c6644]/50 rotate-90 pointer-events-none" />
              </div>

              <button className="w-full bg-[#c05621] text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#3d1f00] transition-colors shadow-2xl shadow-[#c05621]/20">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <p className="text-[#c05621] font-bold uppercase tracking-widest mb-6 text-sm italic">
            Sun Delight — Khushiyon ka Biscuit
          </p>
          <h3 className="text-4xl lg:text-7xl font-['Playfair_Display'] font-black max-w-4xl mx-auto leading-tight">
            Ready to bring{" "}
            <span className="underline decoration-[#c05621] decoration-wavy underline-offset-8">
              sunshine
            </span>{" "}
            to every home?
          </h3>
        </div>
        {/* Background Decorative Blur */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-[#fde8c0] to-transparent opacity-30 -z-10" />
      </section>

      <footer className="pb-20 text-center opacity-40">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em]">
          Sun Delight — Made with care. Delivered with trust.
        </p>
      </footer>
    </div>
  );
}
