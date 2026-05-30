import React, { useEffect, useRef } from 'react';

export default function LeafParticles({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle class definition
    const particles = [];
    const particleCount = 40; // Balanced for good looks and performance

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -20;
        this.size = Math.random() * 8 + 4; // Leaf width/radius
        this.length = this.size * (Math.random() * 0.8 + 1.2); // Leaf length
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = Math.random() * 0.02 - 0.01;
        this.colorType = Math.random() > 0.45 ? 'gold' : 'green';
        this.opacity = Math.random() * 0.5 + 0.3;
        this.type = Math.random() > 0.4 ? 'leaf' : 'sparkle';
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.angle += this.spin;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.type === 'leaf') {
          // Draw leaf shape
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);

          if (this.colorType === 'gold') {
            ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
            ctx.strokeStyle = 'rgba(184, 147, 38, 0.8)';
          } else {
            ctx.fillStyle = 'rgba(58, 88, 66, 0.4)';
            ctx.strokeStyle = 'rgba(30, 53, 37, 0.6)';
          }

          ctx.beginPath();
          // Draw a leaf using quadratic curves
          ctx.moveTo(0, -this.length / 2);
          ctx.quadraticCurveTo(this.size, 0, 0, this.length / 2);
          ctx.quadraticCurveTo(-this.size, 0, 0, -this.length / 2);
          ctx.fill();
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Draw leaf vein
          ctx.beginPath();
          ctx.moveTo(0, -this.length / 2);
          ctx.lineTo(0, this.length / 2);
          ctx.stroke();
        } else {
          // Draw glowing gold sparkle
          const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size / 2
          );
          gradient.addColorStop(0, 'rgba(255, 240, 180, 0.9)');
          gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.7)');
          gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10 }}
    />
  );
}
