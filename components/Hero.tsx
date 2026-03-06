"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Easing ────────────────────────────────────────────────────────────────────
const ease1 = [0.22, 1, 0.36, 1] as const;

// ── Ticker ────────────────────────────────────────────────────────────────────
const TAGS = ["Gourmet Treats", "Crafted With Love", "Perfect Bites", "Cookies Bite", "Food & Snack", "Delicious"];

function Ticker() {
  return (
    <div className="overflow-hidden py-2.5 bg-[#1a0a00]/70 backdrop-blur-sm border-t border-[#ed8936]/20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...TAGS, ...TAGS].map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-8 text-[#F5A623]/70 text-xs font-medium tracking-[0.2em] uppercase italic"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {t}
            <span className="w-1 h-1 rounded-full bg-[#ed8936]/50 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Scroll parallax
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 700], [0, 180]);
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const videoScale = useTransform(scrollY, [0, 700], [1, 1.15]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.5, 0.85]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 30 });
  const videoX = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const videoMY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  // Show content after 3s (biscuit disappears in video)
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP SplitText entrance — runs when content becomes visible
  useEffect(() => {
    if (!showContent || !headingRef.current) return;
    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current!, { type: "words,chars" });
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 40, rotateX: -80, transformOrigin: "0% 50% -40px" },
        {
          opacity: 1, y: 0, rotateX: 0,
          stagger: 0.022, duration: 0.8,
          ease: "power4.out", delay: 0.1,
        }
      );
      // Scroll blur-out
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        filter: "blur(6px)",
        ease: "none",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [showContent]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* ── VIDEO LAYER ── */}
      <motion.div
        style={{ y: smoothY, scale: videoScale, x: videoX }}
        className="absolute inset-[-10%] z-0 will-change-transform"
      >
        <motion.div style={{ y: videoMY }} className="w-full h-full pt-[8%]">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(1.1) brightness(0.7)" }}
          >
            <source src="/Luxury_Chocolate_Cookie_Animation.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* ── LOADING SHIMMER ── */}
      <AnimatePresence>
        {!videoLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-10 bg-gradient-to-br from-[#1a0a00] via-[#3d1f00] to-[#1a0a00]"
          >
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#F5A623]/8 to-transparent -skew-x-12"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── GRADIENT OVERLAYS ── */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#1a0a00]/60 via-[#2d1100]/30 to-[#1a0a00]/85"
      />
      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(10,4,0,0.65) 100%)" }}
      />

      {/* ── TICKER ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <Ticker />
      </div>

      {/* ── MAIN CONTENT — centered, revealed after 3s ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 pt-[15%] h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Tag pill */}
              {/* <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: ease1 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#ed8936]/35 bg-[#ed8936]/10 backdrop-blur-sm"
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-sm"
                >
                  ☀️
                </motion.span>
                <span
                  className="text-[#F5A623] text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Pitam Pura, New Delhi · 7AM – 9PM Daily
                </span>
                <span className="w-1 h-1 rounded-full bg-[#F5A623] animate-pulse" />
              </motion.div> */}

              {/* Heading — SplitText animates chars */}
              <h1
                ref={headingRef}
                className="text-[#fffdf9] leading-[1.08] mb-5 tracking-tight"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)",
                  perspective: "1000px",
                }}
              >
                Freshly Baked{" "}
                <em className="not-italic" style={{ color: "#F5A623" }}>Happiness</em>
                <br />
                in Every Bite.
              </h1>

              {/* Sub-text */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7, ease: ease1 }}
                className="text-[#fffdf9]/60 text-sm md:text-base leading-relaxed mb-9 max-w-[420px]"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Handcrafted with premium ingredients, baked fresh daily —
                every cookie is a moment of pure joy.
              </motion.p>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.7, ease: ease1 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <MagneticButton href="/product" primary>
                  <span>Explore Cookies</span>
                  <span>🍪</span>
                </MagneticButton>
                <motion.a
                  href="/about-us"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-[#fffdf9]/65 hover:text-[#F5A623] transition-colors text-sm font-semibold tracking-wide group"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  <motion.span
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-[#F5A623]/50 group-hover:bg-[#F5A623]/10 transition-all text-sm"
                    whileHover={{ rotate: 45 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    →
                  </motion.span>
                  Our Story
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
          >
            <span
              className="text-[#fffdf9]/30 text-[9px] tracking-[0.3em] uppercase"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-[#F5A623]/60 to-transparent"
              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CORNER DECORATION ── */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-6 right-6 z-20 w-14 h-14 hidden lg:block opacity-20"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <defs>
            <path id="circle-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
          </defs>
          <path d="M50 5 A45 45 0 1 1 49.99 5" stroke="#F5A623" strokeWidth="1" strokeDasharray="4 6" fill="none" />
          <text fontSize="11" fill="#F5A623" fontFamily="serif">
            <textPath href="#circle-path" startOffset="0%">
              ☀ FRESHLY BAKED • SUN DELIGHT • PREMIUM •{" "}
            </textPath>
          </text>
        </svg>
      </motion.div>
    </section>
  );
}

// ── Magnetic Button ────────────────────────────────────────────────────────────
function MagneticButton({
  children,
  href,
  primary = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 25 });
  const sy = useSpring(y, { stiffness: 350, damping: 25 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, fontFamily: "DM Sans, sans-serif" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm tracking-wide cursor-pointer no-underline transition-shadow ${
        primary
          ? "bg-gradient-to-br from-[#c05621] to-[#ed8936] text-[#fffdf9] shadow-[0_6px_24px_rgba(192,86,33,0.45)]"
          : "bg-white/10 text-[#fffdf9] border border-white/20 backdrop-blur-sm"
      }`}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
      />
      {children}
    </motion.a>
  );
}
