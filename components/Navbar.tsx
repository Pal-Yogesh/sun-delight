"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon: string; desc: string }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Product", href: "/product" },
  {
    label: "Grow With Us",
    href: "#",
    children: [
      {
        label: "Become a Dealer",
        href: "/become-a-dealer",
        icon: "🤝",
        desc: "Partner with Sun Delight & grow your business",
      },
      {
        label: "Careers",
        href: "/careers",
        icon: "🚀",
        desc: "Join our passionate team of cookie makers",
      },
    ],
  },
  { label: "Our Manufacturing", href: "/our-manufacturing" },
  { label: "Our Journey", href: "/our-journey" },
  { label: "Contact Us", href: "/contact-us" },
];

// ─── Easing helpers ───────────────────────────────────────────────────────────
const ease1 = [0.22, 1, 0.36, 1] as const;
const ease2 = [0.4, 0, 1, 1] as const;

// ─── Animation Variants ───────────────────────────────────────────────────────
const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: ease1 },
  },
};

const logoVariants = {
  initial: { scale: 0.8, opacity: 0, rotate: -10 },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: ease1, delay: 0.2 },
  },
};

const navLinkVariants = {
  initial: { y: -20, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: ease1, delay: 0.3 + i * 0.07 },
  }),
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -12, scaleY: 0.92, filter: "blur(4px)", transformOrigin: "top center" },
  visible: {
    opacity: 1, y: 0, scaleY: 1, filter: "blur(0px)",
    transition: { duration: 0.35, ease: ease1 },
  },
  exit: {
    opacity: 0, y: -8, scaleY: 0.94, filter: "blur(4px)",
    transition: { duration: 0.22, ease: ease2 },
  },
};

const dropdownItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.3, delay: i * 0.07, ease: ease1 },
  }),
};

const mobileMenuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: ease1 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.4, ease: ease2 } },
};

const mobileItemVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: (i: number) => ({
    x: 0, opacity: 1,
    transition: { duration: 0.45, delay: 0.1 + i * 0.06, ease: ease1 },
  }),
};

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────
function ScrollProgressBarSimple() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-gradient-to-r from-[#c05621] via-[#ed8936] to-[#fbd38d]"
    />
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CTAButton() {
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
      href="/contact-us"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden inline-flex items-center gap-2 px-[26px] py-[10px] rounded-full bg-gradient-to-br from-[#c05621] to-[#ed8936] text-[#fffdf9] font-semibold text-sm tracking-[0.04em] no-underline shadow-[0_4px_20px_rgba(192,86,33,0.4)] cursor-pointer"
    >
      <motion.span
        className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
      />
      <span>Contact Us</span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        ☀️
      </motion.span>
    </motion.a>
  );
}

// ─── Dropdown Item ────────────────────────────────────────────────────────────
function DropdownItem({
  item,
  index,
}: {
  item: { label: string; href: string; icon: string; desc: string };
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div custom={index} variants={dropdownItemVariants} initial="hidden" animate="visible">
      <Link
        href={item.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`flex items-start gap-[14px] p-[14px_18px] rounded-[14px] no-underline transition-colors duration-200 ${
          hovered ? "bg-[rgba(245,166,35,0.08)]" : "bg-transparent"
        }`}
      >
        <motion.div
          animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="text-[1.6rem] w-11 h-11 flex items-center justify-center bg-[rgba(245,166,35,0.12)] rounded-xl shrink-0"
        >
          {item.icon}
        </motion.div>
        <div>
          <motion.div
            animate={{ color: hovered ? "#c05621" : "#3d1f00" }}
            className="font-semibold text-[0.9rem] mb-[3px]"
          >
            {item.label}
          </motion.div>
          <div className="text-[0.75rem] text-[#8b5e3c] leading-relaxed">
            {item.desc}
          </div>
        </div>
        <motion.span
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }}
          className="ml-auto text-[#ed8936] self-center"
        >
          →
        </motion.span>
      </Link>
    </motion.div>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────
function NavLink({ item, index }: { item: NavItem; index: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasChildren = !!item.children;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <motion.li
      custom={index}
      variants={navLinkVariants}
      initial="initial"
      animate="animate"
      className="relative list-none"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <Link
        href={item.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex items-center gap-[5px] px-1 py-2 no-underline text-sm font-medium text-[#3d1f00] tracking-[0.01em] relative"
      >
        {item.label}
        {hasChildren && (
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: ease1 }}
            className="inline-flex text-[0.65rem] opacity-60"
          >
            ▼
          </motion.span>
        )}
        <motion.span
          animate={{ scaleX: hovered || open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: ease1 }}
          className="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#c05621] to-[#ed8936] rounded-sm origin-left"
        />
      </Link>

      {hasChildren && (
        <AnimatePresence>
          {open && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
              className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 min-w-[300px] bg-[#fffdf9] rounded-[20px] p-[10px] shadow-[0_20px_60px_rgba(61,31,0,0.14),0_0_0_1px_rgba(245,166,35,0.15)] z-[100]"
            >
              {/* Arrow */}
              <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 rotate-45 w-3 h-3 bg-[#fffdf9] border-t border-l border-[rgba(245,166,35,0.15)] rounded-tl-sm" />
              <div className="flex flex-col gap-[2px]">
                {item.children!.map((child, i) => (
                  <DropdownItem key={child.href} item={child} index={i} />
                ))}
              </div>
              <div className="mx-[18px] mt-[10px] mb-1 pt-[10px] border-t border-[rgba(245,166,35,0.15)] text-[0.7rem] text-[#9c6644] tracking-[0.1em] flex items-center gap-[6px]">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  ☀️
                </motion.span>
                Sun Delight · Growing Together Since 2014
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.li>
  );
}

// ─── Hamburger ────────────────────────────────────────────────────────────────
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col justify-center items-center gap-[5px] w-11 h-11 rounded-xl cursor-pointer transition-all duration-300 px-2 py-[10px] border ${
        open
          ? "bg-[rgba(245,166,35,0.12)] border-[rgba(245,166,35,0.4)]"
          : "bg-transparent border-[rgba(61,31,0,0.12)]"
      }`}
      aria-label="Toggle menu"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            rotate: open ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
            y: open ? (i === 0 ? 7 : i === 2 ? -7 : 0) : 0,
            opacity: open && i === 1 ? 0 : 1,
            width: open ? "22px" : i === 1 ? "16px" : "22px",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[2px] bg-[#3d1f00] rounded-sm origin-center"
        />
      ))}
    </button>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [growOpen, setGrowOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(61,31,0,0.4)] backdrop-blur-md z-[998]"
          />

          {/* Panel */}
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 w-[min(380px,92vw)] bg-[#fffdf9] z-[999] overflow-y-auto shadow-[-20px_0_80px_rgba(61,31,0,0.2)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[rgba(245,166,35,0.15)] flex items-center justify-between bg-gradient-to-br from-[rgba(245,166,35,0.06)] to-transparent">
              <div className="flex items-center gap-[10px]">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-[38px] h-[38px] bg-[radial-gradient(circle,#fbd38d,#ed8936,#c05621)] rounded-full flex items-center justify-center text-[1.2rem] shadow-[0_4px_14px_rgba(192,86,33,0.4)]"
                >
                  ☀
                </motion.div>
                <div>
                  <div className="font-black text-[1.1rem] text-[#3d1f00]" style={{ fontFamily: "Playfair Display, serif" }}>
                    Sun Delight
                  </div>
                  <div className="text-[0.65rem] text-[#9c6644] tracking-[0.15em]">
                    FRESHLY BAKED HAPPINESS
                  </div>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-[rgba(61,31,0,0.12)] bg-transparent cursor-pointer text-[1.1rem] flex items-center justify-center text-[#3d1f00]"
              >
                ×
              </motion.button>
            </div>

            {/* Nav Items */}
            <nav className="p-6 flex-1 flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => {
                if (item.children) {
                  return (
                    <motion.div key={item.label} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                      <button
                        onClick={() => setGrowOpen(!growOpen)}
                        className={`w-full flex items-center justify-between px-4 py-[14px] rounded-[14px] border-none cursor-pointer font-semibold text-base text-[#3d1f00] text-left transition-colors duration-200 ${
                          growOpen ? "bg-[rgba(245,166,35,0.1)]" : "bg-transparent"
                        }`}
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: growOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[0.7rem] opacity-60"
                        >
                          ▼
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {growOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: ease1 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child, ci) => (
                              <motion.div
                                key={child.href}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: ci * 0.08, duration: 0.3 }}
                              >
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 px-4 py-3 rounded-xl no-underline mt-1 bg-[rgba(245,166,35,0.05)]"
                                >
                                  <span className="text-[1.3rem]">{child.icon}</span>
                                  <div>
                                    <div className="font-semibold text-sm text-[#3d1f00]">{child.label}</div>
                                    <div className="text-[0.72rem] text-[#9c6644]">{child.desc}</div>
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.div key={item.label} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-[14px] rounded-[14px] no-underline font-medium text-base text-[#3d1f00] transition-colors duration-200 hover:bg-[rgba(245,166,35,0.08)]"
                    >
                      {item.label}
                      <span className="opacity-30 text-[0.8rem]">→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              custom={NAV_ITEMS.length}
              variants={mobileItemVariants}
              initial="hidden"
              animate="visible"
              className="p-6 border-t border-[rgba(245,166,35,0.15)] flex flex-col gap-3"
            >
              <Link
                href="/contact-us"
                onClick={onClose}
                className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-[#c05621] to-[#ed8936] text-[#fffdf9] font-bold no-underline text-[0.95rem] shadow-[0_6px_20px_rgba(192,86,33,0.35)]"
              >
                Contact Us ☀️
              </Link>
              <div className="text-center text-[0.72rem] text-[#9c6644] tracking-[0.1em]">
                📍 Pitam Pura, New Delhi · 7AM – 9PM Daily
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    gsap.fromTo(
      ".nav-logo-sun",
      { boxShadow: "0 0 0px rgba(237,137,54,0)" },
      {
        boxShadow: "0 0 30px rgba(237,137,54,0.6), 0 0 60px rgba(237,137,54,0.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      }
    );
  }, []);

  const navBg = useTransform(scrollY, [0, 80], ["rgba(255,253,249,0)", "rgba(255,253,249,0.96)"]);
  const navShadow = useTransform(scrollY, [0, 80], ["0 0 0 rgba(61,31,0,0)", "0 4px 40px rgba(61,31,0,0.08)"]);
  const navBorder = useTransform(scrollY, [0, 80], ["rgba(245,166,35,0)", "rgba(245,166,35,0.2)"]);

  return (
    <>
      <ScrollProgressBarSimple />

      <motion.nav
        ref={navRef}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: navBg,
          boxShadow: navShadow,
          borderBottomColor: navBorder,
          backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
        }}
        className="fixed top-0 left-0 right-0 z-[997]  border-b transition-[backdrop-filter] duration-400"
      >
        <div
          className="max-w-full mx-auto bg-white px-[4%] flex items-center justify-between transition-[height] duration-400 ease-in-out"
          style={{ height: scrolled ? "68px" : "80px" }}
        >
          {/* Logo */}
        
                         <Image src="/sunbrand.jpeg" width={1000} height={1000} alt="logo" className="w-28 h-12 rounded-xl" />


          {/* Desktop Nav */}
          <motion.ul className="hidden lg:flex items-center gap-2 list-none m-0 p-0">
            {NAV_ITEMS.filter((i) => i.label !== "Contact Us").map((item, index) => (
              <NavLink key={item.label} item={item} index={index} />
            ))}
          </motion.ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <motion.div
                custom={NAV_ITEMS.length}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
              >
                <CTAButton />
              </motion.div>
            </div>
            <div className="block lg:hidden">
              <Hamburger open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.4)] to-transparent"
        />
      </motion.nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
