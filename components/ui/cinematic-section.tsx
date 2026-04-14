"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

type CinematicSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  parallaxSpeed?: number;
  fadeDirection?: "up" | "left" | "right";
};

export function CinematicSection({
  id,
  className,
  children,
  parallaxSpeed = 0,
  fadeDirection = "up"
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !innerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const directionProps = {
      up: { y: 60 },
      left: { x: -60 },
      right: { x: 60 }
    };

    const initial = directionProps[fadeDirection];

    gsap.fromTo(
      innerRef.current,
      {
        opacity: 0,
        scale: 0.96,
        ...initial
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none none"
        }
      }
    );

    // Optional parallax on inner content
    if (parallaxSpeed > 0) {
      gsap.to(innerRef.current, {
        y: -parallaxSpeed * 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, [fadeDirection, parallaxSpeed]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative py-16 sm:py-20 lg:py-24", className)}
      id={id}
    >
      <div ref={innerRef} className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
