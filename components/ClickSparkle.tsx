"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  shape: string;
  size: number;
  life: number;
  decay: number;
}



export default function ClickSparkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleClick = (e: MouseEvent) => {
      // Create a single ripple
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: 0,
        vy: 0,
        radius: 0, // Start small
        color: "rgba(114, 9, 183, 0.5)", // Primary brand color
        shape: "circle",
        size: 0,
        life: 1,
        decay: 0.03, // Faster fade
      });
    };

    window.addEventListener("click", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // We can use a simpler loop since we don't need collision
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.life -= p.decay;
        p.radius += 1.5; // Expand

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 180, 255, ${p.life * 0.3})`; // Inner glow
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `rgba(114, 9, 183, ${p.life})`; // Rim color
        ctx.stroke();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
