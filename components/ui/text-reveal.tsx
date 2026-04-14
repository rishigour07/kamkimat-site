"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function TextReveal({
  children,
  className,
  tag: Tag = "h2",
  delay = 0,
  stagger = 0.04,
  once = true
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const words = containerRef.current.querySelectorAll(".tr-word");

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 30,
        rotateX: 40,
        filter: "blur(4px)"
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [children, delay, stagger, once]);

  const words = children.split(" ");

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLHeadingElement>}
      className={cn("overflow-hidden", className)}
      style={{ perspective: "600px" }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="tr-word inline-block"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
