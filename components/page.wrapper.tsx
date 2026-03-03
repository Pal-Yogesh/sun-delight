"use client";

import { useState, useCallback } from "react";
import SunLoader from "./Loader/SunLoader";
import Navbar from "./Navbar";
import FooterSection from "./Footer";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <SunLoader onComplete={handleComplete} />}

      <div
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />
        {children}
        <FooterSection />
      </div>
    </>
  );
}
