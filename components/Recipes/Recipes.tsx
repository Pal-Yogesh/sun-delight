"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── Types ──────────────────────────────────────────────────────────────────
interface Recipe {
  id: number;
  num: string;
  label: string;
  type: string;
  img: string;
  bgGrad: string;
  ringColor: string;
  title: string;
  intro: string;
  ingredients: string;
  steps: string[];
  url: string;
}

// ─── Data — exact content from brief, nothing added ─────────────────────────
const RECIPES: Recipe[] = [
  {
    id: 1,
    num: "1",
    label: "Recipe 01",
    type: "No-Bake",
    img: "/recipe/1.jpeg",
    bgGrad: "linear-gradient(148deg,#3d1f00,#6b3a1f 40%,#c05621 72%,#f5c842)",
    ringColor: "rgba(255,255,255,0.06)",
    title: "Classic No-Bake Cookie Truffles",
    intro:
      "These are rich, bite-sized treats that work with almost any crunchy sandwich cookie.",
    ingredients:
      "1 package (approx. 14 oz) chocolate sandwich cookies, 8 oz softened cream cheese, 12 oz melting chocolate (dark, milk, or white), and optional sprinkles.",
    steps: [
      "Crush the cookies into fine crumbs.",
      "Mix thoroughly with cream cheese until a dough forms.",
      "Roll into small balls and freeze for 15 minutes.",
      "Dip into melted chocolate and let set in the fridge.",
    ],
    url: "https://iambaker.net",
  },
  {
    id: 2,
    num: "2",
    label: "Recipe 02",
    type: "Baked",
    img: "/recipe/2.jpeg",
    bgGrad: "linear-gradient(148deg,#fef3e2,#fde8c0 38%,#ed8936 72%,#c05621)",
    ringColor: "rgba(61,31,0,0.07)",
    title: "Cookie Crust Cheesecake",
    intro:
      "Instead of a traditional graham cracker crust, using ginger snaps or chocolate chip cookies adds a deeper flavor profile.",
    ingredients:
      "2 cups crushed cookies, 4 tbsp melted butter, 16 oz cream cheese, 1/2 cup sugar, 2 eggs, and 1 tsp vanilla extract.",
    steps: [
      "Mix cookie crumbs with butter and press into a pan.",
      "Beat cream cheese, sugar, eggs, and vanilla until smooth.",
      "Pour over the crust and bake at 325°F (160°C) for about 40 minutes.",
    ],
    url: "https://southernbite.com",
  },
  {
    id: 3,
    num: "3",
    label: "Recipe 03",
    type: "No-Bake",
    img: "/recipe/3.jpeg",
    bgGrad: "linear-gradient(148deg,#fff8f0,#fde8c0 38%,#f5c842 70%,#c05621)",
    ringColor: "rgba(61,31,0,0.07)",
    title: "Icebox Cookie Cake",
    intro:
      "This is a vintage-style dessert where the cookies soften into a cake-like texture overnight.",
    ingredients:
      "2 cups heavy whipping cream, 1/4 cup powdered sugar, 1 tsp vanilla, and 2 packages of thin chocolate wafer cookies.",
    steps: [
      "Whip the cream with sugar and vanilla until stiff peaks form.",
      "Spread a layer of cream on each cookie and stack them sideways to form a log.",
      "Cover the entire log with the remaining whipped cream and refrigerate for at least 6 hours.",
    ],
    url: "https://anitalianinmykitchen.com",
  },
  {
    id: 4,
    num: "4",
    label: "Recipe 04",
    type: "Spread",
    img: "/recipe/4.jpeg",
    bgGrad: "linear-gradient(148deg,#fef3e2,#fde8c0 38%,#ed8936 68%,#9c6644)",
    ringColor: "rgba(61,31,0,0.07)",
    title: "Cookie Butter Spread",
    intro:
      "If you have leftover cookies, you can turn them into a spread similar to Biscoff or peanut butter.",
    ingredients:
      "1/2 lb crunchy cookies, 1/4 cup evaporated milk (or heavy cream), 2 tbsp butter, and 1 tbsp brown sugar.",
    steps: [
      "Pulse cookies in a food processor until they are a fine flour.",
      "Add the milk, butter, and sugar, then process until the mixture is smooth and creamy.",
      "Store in a jar in the fridge.",
    ],
    url: "https://tidymom.net",
  },
];

// ─── Shared styles ───────────────────────────────────────────────────────────
const RING_SIZES = [200, 150, 98];

// ─── Image Zone ──────────────────────────────────────────────────────────────
function ImageZone({ recipe, hovered }: { recipe: Recipe; hovered: boolean }) {
  return (
    <motion.div
      animate={{ scale: hovered ? 1.07 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "absolute",
        inset: 0,
        background: recipe.bgGrad,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {RING_SIZES.map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? [0, 360] : [360, 0] }}
          transition={{
            duration: 26 + i * 6,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid ${recipe.ringColor}`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
      <motion.div
        animate={
          hovered
            ? { scale: 1, filter: "drop-shadow(0 22px 34px rgba(0,0,0,0.32))" }
            : { scale: 1, filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ position: "absolute", inset: 0, zIndex: 3, padding: "5px" }}
      >
        <img
          src={recipe.img}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
      </motion.div>
      {/* overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top,rgba(61,31,0,0.52) 0%,rgba(61,31,0,0.05) 55%,transparent 100%)",
          opacity: hovered ? 0.82 : 1,
          transition: "opacity 0.38s",
          zIndex: 4,
        }}
      />
      {/* shine */}
      <motion.div
        initial={{ x: "-130%" }}
        animate={hovered ? { x: "210%" } : { x: "-130%" }}
        transition={{ duration: 0.54, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(108deg,transparent 35%,rgba(255,255,255,0.3) 50%,transparent 65%)",
          zIndex: 5,
        }}
      />
    </motion.div>
  );
}

// ─── Recipe Card ─────────────────────────────────────────────────────────────
function RecipeCard({
  recipe,
  index,
  isHero = false,
  isWide = false,
  onOpen,
}: {
  recipe: Recipe;
  index: number;
  isHero?: boolean;
  isWide?: boolean;
  onOpen: (r: Recipe) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  const imgH = isHero ? 430 : 210;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 52, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.86,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(recipe)}
      style={{
        borderRadius: 26,
        overflow: "hidden",
        background: "#fffdf9",
        border: `1px solid ${hovered ? "rgba(192,86,33,0.22)" : "rgba(61,31,0,0.07)"}`,
        boxShadow: hovered
          ? "0 26px 64px rgba(192,86,33,0.15),0 6px 24px rgba(0,0,0,0.08)"
          : "0 6px 24px rgba(0,0,0,0.05)",
        cursor: "pointer",
        display: "flex",
        flexDirection: isWide ? "row" : "column",
        height: "100%",
        transition: "border-color 0.28s",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          height: isWide ? "auto" : imgH,
          width: isWide ? 300 : "100%",
          flexShrink: 0,
          minHeight: isWide ? 210 : undefined,
        }}
      >
        <ImageZone recipe={recipe} hovered={hovered} />
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 6 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 16 }}
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 6,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#c05621,#ed8936)",
            color: "#fff",
            fontFamily: "'Playfair Display',serif",
            fontSize: "0.9rem",
            fontWeight: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(192,86,33,0.44)",
          }}
        >
          {recipe.num}
        </motion.div>
        <motion.div
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.28 }}
          style={{
            position: "absolute",
            bottom: 14,
            left: 14,
            zIndex: 6,
            padding: "5px 13px",
            borderRadius: 50,
            fontSize: "0.58rem",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            background: "rgba(192,86,33,0.82)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(245,166,35,0.3)",
          }}
        >
          {recipe.type}
        </motion.div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: isHero
            ? "26px 28px 28px"
            : isWide
              ? "26px 30px 28px"
              : "22px 24px 24px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            color: "#3d1f00",
            lineHeight: 1.14,
            marginBottom: 10,
            fontSize: isHero ? "1.5rem" : isWide ? "1.42rem" : "1.05rem",
          }}
        >
          {recipe.title}
        </div>
        <div
          style={{
            fontSize: "0.83rem",
            color: "#9c6644",
            lineHeight: 1.68,
            marginBottom: 14,
          }}
        >
          {recipe.intro}
        </div>
        <div
          style={{
            fontSize: "0.6rem",
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c05621",
            marginBottom: 6,
          }}
        >
          Ingredients
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "#6b3a1f",
            lineHeight: 1.62,
            marginBottom: 18,
            flex: 1,
          }}
        >
          {recipe.ingredients}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(recipe);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "11px 0",
            width: isWide ? 300 : "100%",
            borderRadius: 13,
            border: "none",
            background: "linear-gradient(135deg,#c05621,#ed8936)",
            color: "#fff",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(192,86,33,0.36)",
            transition: "transform 0.28s, box-shadow 0.28s",
            marginTop: "auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          📖 View Recipe
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function RecipeModal({
  recipe,
  onClose,
}: {
  recipe: Recipe | null;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = recipe ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [recipe]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {recipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4"
          style={{ background: "rgba(20,5,0,0.8)", backdropFilter: "blur(14px)" }}
        >
          <motion.div
            initial={{ scale: 0.87, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fffdf9] rounded-[24px] sm:rounded-[30px] w-full max-w-[800px] max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
            style={{ boxShadow: "0 50px 130px rgba(0,0,0,0.44), 0 0 0 1px rgba(245,166,35,0.13)" }}
          >
            {/* Image panel — top on mobile, left on md+ */}
            <div className="relative overflow-hidden h-[220px] sm:h-[260px] md:h-auto md:w-[290px] shrink-0">
              <div className="absolute inset-0" style={{ background: recipe.bgGrad }}>
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent to-[rgba(61,31,0,0.18)]" />
              </div>

              {/* Number badge */}
              <div
                className="absolute top-4 left-4 z-[5] w-10 h-10 rounded-full flex items-center justify-center text-white font-black"
                style={{ background: "linear-gradient(135deg,#c05621,#ed8936)", fontFamily: "'Playfair Display',serif", fontSize: "1rem", boxShadow: "0 4px 14px rgba(192,86,33,0.5)" }}
              >
                {recipe.num}
              </div>
              {/* Type badge */}
              <div
                className="absolute bottom-4 left-4 z-[5] px-4 py-1 rounded-full backdrop-blur-md"
                style={{ background: "rgba(255,253,249,0.88)", fontSize: "0.62rem", fontWeight: 700, color: "#c05621", letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid rgba(245,166,35,0.28)" }}
              >
                {recipe.type}
              </div>

              {/* Close — on image for mobile */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-[#3d1f00] cursor-pointer"
                style={{ background: "rgba(255,253,249,0.9)", backdropFilter: "blur(10px)", border: "1px solid rgba(61,31,0,0.1)", fontSize: "1rem" }}
              >
                ✕
              </motion.button>
            </div>

            {/* Content — scrollable */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                <div className="text-[0.64rem] font-extrabold tracking-[0.22em] uppercase text-[#c05621] mb-1.5">
                  {recipe.label}
                </div>
                <div className="font-['Playfair_Display'] text-[1.4rem] sm:text-[1.7rem] font-black text-[#3d1f00] leading-[1.1] mb-3">
                  {recipe.title}
                </div>
                <div className="text-[0.86rem] text-[#6b3a1f] leading-[1.78] mb-4">
                  {recipe.intro}
                </div>
              </motion.div>

              <hr className="h-px border-none mb-4" style={{ background: "linear-gradient(90deg,rgba(245,166,35,0.3),transparent)" }} />

              {/* Ingredients */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
                <div className="text-[0.62rem] font-extrabold tracking-[0.2em] uppercase text-[#c05621] mb-2.5">
                  Ingredients
                </div>
                <div className="rounded-[14px] p-3.5 sm:p-4 text-[0.84rem] text-[#6b3a1f] leading-[1.76] mb-5"
                  style={{ background: "rgba(245,166,35,0.07)", border: "1px solid rgba(245,166,35,0.18)" }}>
                  {recipe.ingredients}
                </div>
              </motion.div>

              {/* Method */}
              <div className="text-[0.62rem] font-extrabold tracking-[0.2em] uppercase text-[#c05621] mb-3">
                Method
              </div>
              <div className="flex flex-col gap-3 mb-6">
                {recipe.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.07 }}
                    className="flex gap-3 items-start"
                  >
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white font-black mt-0.5"
                      style={{ background: "linear-gradient(135deg,#c05621,#ed8936)", fontFamily: "'Playfair Display',serif", fontSize: "0.8rem", boxShadow: "0 3px 10px rgba(192,86,33,0.28)" }}
                    >
                      {i + 1}
                    </div>
                    <div className="text-[0.84rem] text-[#6b3a1f] leading-[1.72] pt-0.5">
                      {step}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <motion.a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3.5 rounded-[15px] text-white font-bold flex items-center justify-center gap-2 no-underline text-[0.88rem]"
                  style={{ background: "linear-gradient(135deg,#c05621,#ed8936)", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 8px 24px rgba(192,86,33,0.42)" }}
                >
                  🍪 Try This Recipe <span className="text-[0.8rem] opacity-70">↗</span>
                </motion.a>
                <motion.button
                  whileHover={{ y: -2, background: "rgba(192,86,33,0.06)" }}
                  onClick={onClose}
                  className="py-3.5 px-6 rounded-[15px] font-bold text-[#c05621] text-[0.88rem] cursor-pointer"
                  style={{ background: "transparent", border: "1.5px solid rgba(192,86,33,0.28)", fontFamily: "'DM Sans',sans-serif" }}
                >
                  ← Back
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function RecipesSection() {
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });

  return (
    <>
      <section className="relative overflow-hidden py-[100px] pb-[140px] px-[6%] bg-[linear-gradient(160deg,#fffdf9_0%,#fff8f0_52%,#fef3e2_100%)]">
        {/* BG texture */}
        <div
          className="absolute -inset-[12%] pointer-events-none opacity-[0.38] 
      bg-[radial-gradient(circle,rgba(192,86,33,0.1)_1px,transparent_1px)]
      bg-[size:36px_36px]"
        />

        <div className="max-w-[1260px] mx-auto relative z-1">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-[72px] mt-4">
          
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.82 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-4 rounded-full border border-[#c05621]/20 bg-white/60 backdrop-blur-md shadow-sm"
            >
              <span className="text-[#c05621] text-sm">☀️</span>
              <span className="text-[#c05621] text-xs font-bold tracking-widest uppercase">
                {" "}
                Made with Sun Delight
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.88 }}
              className="font-['Playfair_Display'] text-[clamp(2.2rem,4.5vw,4.2rem)] 
            font-black text-[#3d1f00] leading-[1.07] tracking-[-0.02em] mb-[14px]"
            >
              Cookie <em className="text-[#c05621] italic">Recipes</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.74 }}
              className="text-[#9c6644] text-[0.95rem] leading-[1.82] max-w-[480px] mx-auto"
            >
              Four delicious ways to use your favourite Sun Delight biscuits —
              from no-bake truffles to a homemade cookie butter spread.
            </motion.p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
            {/* Hero Card */}
            {/* <div className="col-span-1 row-span-2"> */}
            <RecipeCard
              recipe={RECIPES[0]}
              index={0}
              //   isHero
              onOpen={setActiveRecipe}
            />
            {/* </div> */}

            {/* Card 2 */}
            <RecipeCard
              recipe={RECIPES[1]}
              index={1}
              onOpen={setActiveRecipe}
            />

            {/* Card 3 */}
            <RecipeCard
              recipe={RECIPES[2]}
              index={2}
              onOpen={setActiveRecipe}
            />

            {/* Card 4 Full Width */}
            {/* <motion.div
          ref={card4Ref}
          initial={{ opacity: 0, x: -36 }}
          animate={card4InView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.14, duration: 0.82 }}
          className="mt-[22px]"
        > */}
            <RecipeCard
              recipe={RECIPES[3]}
              index={3}
              // isWide
              onOpen={setActiveRecipe}
            />
            {/* </motion.div> */}
          </div>
        </div>
      </section>

      <RecipeModal
        recipe={activeRecipe}
        onClose={() => setActiveRecipe(null)}
      />
    </>
  );
}
