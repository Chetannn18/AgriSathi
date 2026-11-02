import React, { useEffect, useRef } from 'react';

export const HeroFieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Precomputed sun gradient
    let sunGradient: CanvasGradient | null = null;
    const updateSunGradient = () => {
      sunGradient = ctx.createRadialGradient(
        width * 0.52, height * 0.18, 10,
        width * 0.52, height * 0.18, width * 0.65
      );
      sunGradient.addColorStop(0, 'rgba(253, 224, 71, 0.12)');
      sunGradient.addColorStop(0.35, 'rgba(163, 230, 53, 0.05)');
      sunGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    };
    updateSunGradient();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      updateSunGradient();
    };

    let resizeTimeout: any;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };
    window.addEventListener('resize', debouncedResize);

    // Optimized particle pool (16 on mobile, 26 on desktop)
    const particleCount = window.innerWidth < 768 ? 14 : 24;
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
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
      size: Math.random() * 1.8 + 0.8,
      speedX: (Math.random() - 0.2) * 0.35,
      speedY: -Math.random() * 0.4 - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    let tick = 0;

    const render = () => {
      if (!isVisible) return; // Do not render if scrolled away

      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      if (sunGradient) {
        ctx.fillStyle = sunGradient;
        ctx.fillRect(0, 0, width, height);
      }

      if (!prefersReducedMotion) {
        // Fast, hardware-accelerated particle drawing without CPU shadowBlur
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX + Math.sin(tick + i) * 0.2;
          p.y += p.speedY;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const currentOpacity = Math.max(0.1, p.opacity + Math.sin(tick * 2 + i) * 0.18);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentOpacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when hero is offscreen
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (!wasVisible && isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      }
    }, { threshold: 0.05 });

    observer.observe(canvas);
    render();

    return () => {
      observer.disconnect();
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
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
