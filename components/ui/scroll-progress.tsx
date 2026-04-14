"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.4)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
