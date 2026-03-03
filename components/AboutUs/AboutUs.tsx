"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Floating Card Data ───
const highlights = [
  { icon: "🏭", title: "Manufacturing", desc: "World-class standards" },
  { icon: "🛡️", title: "Trust", desc: "Robust quality control" },
  { icon: "☀️", title: "Joy", desc: "Every bite, a little sunshine" },
];

export default function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Parallax Setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Subtle parallax move for the background
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Rotate and move the main image on scroll
  const imageParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  // Initial Entrance Animation with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Main Texts
      gsap.fromTo(
        ".reveal-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 85%",
          },
        }
      );

      // Float effect on cards
      gsap.to(".floating-card", {
        y: -10,
        duration: 2.5,
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#fffdf9] to-[#fff5e6] pt-28 pb-14 sm:pt-0 sm:pb-0 lg:py-32"
    >
      {/* ── Background Elements ── */}
      <motion.div
        style={{ y: bgParallax }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Sun Glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply opacity-60" />
        <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[100px] mix-blend-multiply opacity-50" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: "radial-gradient(circle, #c05621 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
        
        {/* ── Breadcrumb / Tag ── */}
        <div className="flex justify-center lg:justify-start mb-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c05621]/20 bg-white/60 backdrop-blur-md shadow-sm"
           >
              <span className="text-[#c05621] text-sm">☀️</span>
              <span className="text-[#c05621] text-xs font-bold tracking-widest uppercase">About Us – Sun Delight</span>
           </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          
          {/* ── Left Content Area ── */}
          <div className="lg:w-1/2 flex flex-col z-10" ref={textContainerRef}>
            <h1 
              className="reveal-text text-5xl lg:text-7xl font-black leading-[1.05] text-[#3d1f00] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              A Legacy of Trust.<br/>
              <span className="italic text-[#c05621]">A New Taste of Joy.</span>
            </h1>

            <p className="reveal-text text-lg text-[#9c6644] leading-relaxed mb-6 lg:mb-10 border-l-4 border-[#c05621] pl-6">
              Sun Delight is a proud FMCG venture of the Suntek Group. With deep roots in industrial excellence, we bring our forward-looking vision into the fast-moving consumer goods space, beginning with biscuits crafted for everyday delight.
            </p>

            {/* Interactive Tabs for the Story */}
            <div className="reveal-text w-full max-w-xl">
               <div className="flex gap-4 border-b border-[#3d1f00]/10 mb-6">
                 {['The Story', 'The Group'].map((tab, idx) => (
                   <button
                     key={idx}
                     onClick={() => setActiveTab(idx)}
                     className={`pb-3 px-2 text-sm font-bold tracking-wide uppercase transition-colors relative ${activeTab === idx ? 'text-[#c05621]' : 'text-[#9c6644]/60 hover:text-[#9c6644]'}`}
                   >
                     {tab}
                     {activeTab === idx && (
                       <motion.div 
                         layoutId="activeTabIndicator"
                         className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#c05621]"
                       />
                     )}
                   </button>
                 ))}
               </div>

               <div className="min-h-0">
                 <AnimatePresence mode="wait">
                   {activeTab === 0 ? (
                     <motion.div
                       key="story"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.3 }}
                       className="text-[#9c6644] text-sm leading-relaxed space-y-4"
                     >
                       <p><strong className="text-[#3d1f00]">Khushiyon ka Biscuit:</strong> Har ghar ki apni ek kahani hoti hai, aur un kahaniyon mein ek common hero hota hai – dhoop.</p>
                       <p>Jab family ek table par baith kar Sun Delight biscuits ke saath chai share karti hai, toh woh sirf biscuit nahi khati – woh ek moment, ek memory create karti hai.</p>
                       <blockquote className="italic font-bold text-[#c05621] border-l-2 border-[#c05621] pl-4 my-2">
                         "Every bite, a little sunshine."
                       </blockquote>
                       <p>Chahe school tiffin ka snack ho ya office ki quick chai break – Sun Delight har pal ko banata hai thoda aur bright.</p>
                     </motion.div>
                   ) : (
                     <motion.div
                       key="group"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.3 }}
                       className="text-[#9c6644] text-sm leading-relaxed space-y-4"
                     >
                       <p><strong className="text-[#3d1f00]">The Suntek Group:</strong> Founded with a strong manufacturing ethos, the Suntek Group is among North India’s most respected industrial groups.</p>
                       <ul className="list-disc pl-5 space-y-1">
                         <li>World-class manufacturing standards</li>
                         <li>Robust quality control systems</li>
                         <li>Ethical business practices</li>
                       </ul>
                       <p className="font-bold text-[#3d1f00]">This same DNA now drives Sun Delight.</p>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="reveal-text mt-6 self-start group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-[#c05621]/20"
              style={{ background: "linear-gradient(135deg, #c05621, #ed8936)" }}
            >
              <span className="relative z-10">Discover Our Products</span>
              <motion.span 
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>

          {/* ── Right Image & Floating Cards Area ── */}
          <div className="hidden lg:w-1/2 relative lg:flex justify-center items-center mt-8 lg:mt-0 h-auto lg:h-[600px]">
            
            {/* Main Interactive Image */}
            <motion.div 
              ref={imageRef}
              style={{ y: imageParallax, rotate: imageRotate }}
              className="relative z-10 w-full max-w-[450px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              {/* Note: Replace src with an actual asset from your project */}
              <Image 
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1000&auto=format&fit=crop" 
                alt="Chai and Biscuits in the sun"
                fill
                className="object-cover"
              />
              {/* Overlay Gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f00]/40 to-transparent" />
            </motion.div>

            {/* Floating Highlight Cards */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {highlights.map((item, i) => (
                <div 
                  key={i}
                  className={`floating-card pointer-events-auto absolute bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#3d1f00]/5 flex items-center gap-4 w-64
                    ${i === 0 ? "top-[10%] -left-[15%]" : ""}
                    ${i === 1 ? "top-[50%] -right-[10%]" : ""}
                    ${i === 2 ? "bottom-[10%] -left-[5%]" : ""}
                  `}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fff5e6] text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[#3d1f00] font-bold text-sm font-['Playfair_Display']">{item.title}</h4>
                    <p className="text-[#9c6644] text-[10px] uppercase tracking-wider">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}