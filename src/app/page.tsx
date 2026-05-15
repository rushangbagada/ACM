"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Magnetic from "@/components/Magnetic";
import anime from "animejs/lib/anime.es.js";
import { EVENTS } from "@/data/events";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const eventsContainerRef = useRef<HTMLDivElement>(null);
  const eventsWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Text Reveal Animation with SplitType
    if (textRef.current) {
      const text = new SplitType(textRef.current, { types: "chars,words" });
      gsap.from(text.chars, {
        y: 100,
        opacity: 0,
        rotationZ: 10,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
        delay: 0.2,
      });
    }

    // 2. Parallax Hero Background
    gsap.to(canvasRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 3. Stats Counter Animation
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target") || "0", 10);
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
      });
    });

    // 4. Horizontal Scroll Events Gallery
    if (eventsContainerRef.current && eventsWrapperRef.current) {
      const getScrollAmount = () => {
        const eventsWidth = eventsWrapperRef.current!.scrollWidth;
        return -(eventsWidth - window.innerWidth + 100);
      };

      const tween = gsap.to(eventsWrapperRef.current, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: eventsContainerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }

    // 5. Canvas Suble 3D Background with Anime.js (Points connecting)
    const ctx = canvasRef.current?.getContext("2d");
    if (canvasRef.current && ctx) {
      const c = canvasRef.current;
      c.width = window.innerWidth;
      c.height = window.innerHeight;

      const particles: {x: number, y: number, radius: number, color: string}[] = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * c.width,
          y: Math.random() * c.height,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "#0070f3" : "#c0c0c0",
        });
      }

      anime({
        targets: particles,
        x: () => Math.random() * c.width,
        y: () => Math.random() * c.height,
        duration: 10000,
        easing: "linear",
        direction: "alternate",
        loop: true,
        update: () => {
          ctx.clearRect(0, 0, c.width, c.height);
          particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          });
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 glass rounded-b-3xl mx-4 mt-4">
        <div className="font-bold text-xl tracking-widest text-white">ACM<span className="text-[#0070f3]">.</span>SVNIT</div>
        <div className="flex gap-8">
          <Link href="/team" className="text-sm font-medium text-[#c0c0c0] hover:text-white transition-colors uppercase tracking-wider">Archive</Link>
          <Link href="/events" className="text-sm font-medium text-[#c0c0c0] hover:text-white transition-colors uppercase tracking-wider">Events</Link>
          <a href="#" className="text-sm font-medium text-[#c0c0c0] hover:text-white transition-colors uppercase tracking-wider">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40"></canvas>
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 ref={textRef} className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-white clip-text">
            Architecting The <br />
            <span className="text-gradient">Digital Future.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#a0a0a0] mb-12 max-w-2xl mx-auto font-light">
            We are the premier computer science chapter at SVNIT, bridging the gap between theoretical knowledge and bleeding-edge industry standards.
          </p>
          <Magnetic>
            <Link href="/team" className="inline-flex items-center justify-center px-8 py-4 bg-[#0070f3] hover:bg-[#005bb5] text-white rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(0,112,243,0.4)]">
              Explore The Archive
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 px-8 border-y border-white/5 relative z-10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Active Members", value: "350" },
            { label: "Events Conducted", value: "120" },
            { label: "Projects Shipped", value: "45" },
            { label: "Years of Legacy", value: "10" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-5xl md:text-7xl font-bold text-white mb-2 stat-number" data-target={stat.value}>0</span>
              <span className="text-sm uppercase tracking-widest text-[#0070f3] font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Events Horizontal Scroll Gallery */}
      <section ref={eventsContainerRef} className="h-screen bg-[#0a0a0a] flex flex-col justify-center overflow-hidden relative z-10">
        <div className="px-12 mb-12 flex justify-between items-end">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Event Horizon.</h2>
          <p className="text-[#a0a0a0] max-w-sm text-right">Discover our technical workshops, hackathons, and symposiums.</p>
        </div>
        <div ref={eventsWrapperRef} className="flex gap-8 px-12 w-max pb-12">
          {EVENTS.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="w-[400px] h-[500px] glass rounded-3xl p-6 flex flex-col justify-between group overflow-hidden relative shrink-0 block">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0070f3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 h-1/2 rounded-2xl overflow-hidden mb-6">
                <Image 
                  src={`https://picsum.photos/seed/${event.id * 10}/400/300`} 
                  alt={event.name} 
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-end">
                <div className="text-sm font-mono text-[#0070f3] mb-2 uppercase">{event.date} • {event.type}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#0070f3] transition-colors">{event.name}</h3>
                <p className="text-[#a0a0a0] text-sm line-clamp-2">{event.objective}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/10 bg-[#0a0a0a] relative z-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <div className="font-bold text-2xl tracking-widest text-white mb-2">ACM<span className="text-[#0070f3]">.</span>SVNIT</div>
          <p className="text-[#a0a0a0] text-sm">Building the future of technology, one line of code at a time.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-[#a0a0a0] hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-[#a0a0a0] hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-[#a0a0a0] hover:text-white transition-colors">GitHub</a>
        </div>
        <div className="mt-8 md:mt-0 text-sm text-[#555] font-mono">
          © {new Date().getFullYear()} ACM SVNIT. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </main>
  );
}
