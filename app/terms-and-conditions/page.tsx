export default function TermsAndConditionsPage() {
  return (
    <section
      className="min-h-screen py-28 px-6"
      style={{ background: "linear-gradient(160deg, #fffdf9 0%, #fff8f0 50%, #fef3e2 100%)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-0.5 rounded" style={{ background: "linear-gradient(90deg,#c05621,transparent)" }} />
          <span className="text-[0.68rem] font-extrabold tracking-[0.22em] uppercase text-[#c05621]">
            Legal
          </span>
        </div>

        <h1
          className="font-black text-[#3d1f00] mb-6 leading-tight"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
        >
          Terms &amp; <em className="text-[#c05621] italic">Conditions</em>
        </h1>

        <div className="bg-white rounded-[24px] border border-[#3d1f00]/7 p-8 sm:p-10 shadow-sm">
          <p className="text-[#6b3a1f] text-[0.95rem] leading-[1.85]">
            By accessing and using this website, you agree to comply with all applicable laws and
            regulations. All content on this website including text, images, logos, and product
            information is the property of Suntek SuperFoods Pvt. Ltd. and may not be reproduced
            without permission. Suntek SuperFoods Pvt. Ltd. reserves the right to modify website
            content, product information, and policies at any time without prior notice.
          </p>
        </div>

        <p className="text-[#9c6644] text-[0.78rem] mt-6 text-center">
          © {new Date().getFullYear()} Sun Delight — SUNTEK SUPERFOODS LLP. All rights reserved.
        </p>
      </div>
    </section>
  );
}
