import React, { useEffect, useRef } from 'react';

export const HeroFieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool for floating pollen, dew shimmer, and light motes
    const particleCount = window.innerWidth < 768 ? 24 : 60;
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
    }

    const colors = [
      'rgba(163, 230, 53, ', // soft lime
      'rgba(116, 198, 157, ', // leaf light
      'rgba(254, 240, 138, ', // warm morning sun
      'rgba(255, 255, 255, '  // dew shimmer
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.2) * 0.4,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Soft sunray gradient from top-center
      const sunGradient = ctx.createRadialGradient(
        width * 0.52, height * 0.18, 10,
        width * 0.52, height * 0.18, width * 0.65
      );
      sunGradient.addColorStop(0, 'rgba(253, 224, 71, 0.14)');
      sunGradient.addColorStop(0.35, 'rgba(163, 230, 53, 0.06)');
      sunGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = sunGradient;
      ctx.fillRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        // Draw floating natural particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX + Math.sin(tick + i) * 0.25;
          p.y += p.speedY;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const currentOpacity = Math.max(0.1, p.opacity + Math.sin(tick * 2 + i) * 0.2);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentOpacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(116, 198, 157, 0.5)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
