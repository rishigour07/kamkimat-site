"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
  tiltMax?: number;
  glowColor?: string;
};

export function TiltCard({
  className,
  children,
  tiltMax = 12,
  glowColor = "rgba(59, 130, 246, 0.15)"
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (-mouseY / (rect.height / 2)) * tiltMax;
    const rotateY = (mouseX / (rect.width / 2)) * tiltMax;

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 p-6 shadow-glass backdrop-blur-xl transition-all duration-300 ease-out",
        isHovering && "border-blue-500/30 shadow-card-hover",
        className
      )}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: isHovering
          ? "transform 0.1s ease-out, border-color 0.3s, box-shadow 0.3s"
          : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s, box-shadow 0.3s"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight glow that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 60%)`
        }}
      />
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </div>
  );
}
