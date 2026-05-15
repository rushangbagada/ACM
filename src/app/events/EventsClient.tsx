"use client";

import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Calendar, Users, Target, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { EVENTS } from "@/data/events";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

export default function EventsClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".event-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Animate grid items individually
      gsap.utils.toArray(".bento-item").forEach((item: any, index: number) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to assign different visual weights based on event scale
  const getBentoSpan = (index: number, participants: string) => {
    const pCount = parseInt(participants.replace("+", ""));
    if (pCount >= 300 || index === 9) { // High participants or Dotslash (Flagship)
      return "md:col-span-2 md:row-span-2";
    }
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Navigation Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 glass rounded-b-3xl mx-4 mt-4">
        <Link href="/" className="font-bold text-xl tracking-widest text-white">ACM<span className="text-[#0070f3]">.</span>SVNIT</Link>
        <div className="flex gap-8">
          <Link href="/team" className="text-sm font-medium text-[#c0c0c0] hover:text-white transition-colors uppercase tracking-wider">Archive</Link>
          <Link href="/events" className="text-sm font-medium text-white transition-colors uppercase tracking-wider">Events</Link>
        </div>
      </nav>

      {/* Background grain & grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #0070f3 0%, transparent 80%)', mixBlendMode: 'screen' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 event-header">
            <span className="text-gradient">Event Horizon.</span>
          </h1>
          <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl event-header">
            Explore our comprehensive timeline of hackathons, workshops, and symposiums that bridge the gap between theory and execution.
          </p>
        </header>

        {/* Bento Grid layout */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min md:auto-rows-[300px]">
          {EVENTS.map((event, i) => {
            const spanClass = getBentoSpan(i, event.participants);
            const isLarge = spanClass.includes("col-span-2");

            return (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className={cn(
                  "bento-item block group relative overflow-hidden rounded-3xl border border-white/10 glass p-8 flex flex-col h-full transition-all duration-500 hover:border-[#0070f3]/50 hover:shadow-[0_0_30px_rgba(0,112,243,0.15)]",
                  spanClass
                )}
              >
                {/* Image Background (Demo Image) */}
                <div className="absolute inset-0 z-0">
                  <Image 
                    src={`https://picsum.photos/seed/${event.id * 5}/800/600`} 
                    alt={event.name} 
                    fill 
                    className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    sizes={isLarge ? "50vw" : "25vw"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
                </div>

                {/* Top Section */}
                <div className="relative z-10 flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider mb-3 uppercase bg-[#0070f3]/20 text-[#0070f3] border border-[#0070f3]/30">
                      {event.type}
                    </span>
                    <h3 className={cn("font-bold text-white tracking-tight group-hover:text-[#0070f3] transition-colors", isLarge ? "text-4xl" : "text-2xl")}>
                      {event.name}
                    </h3>
                  </div>
                  <div className="p-3 glass rounded-full opacity-50 group-hover:opacity-100 group-hover:bg-[#0070f3] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <Activity size={20} />
                  </div>
                </div>

                {/* Middle Content - Objective (Only show if large card to maintain clean layout) */}
                {isLarge && (
                  <div className="relative z-10 my-6">
                    <p className="text-[#a0a0a0] flex items-start gap-3">
                      <Target className="shrink-0 text-[#0070f3] mt-1" size={18} />
                      <span className="text-sm md:text-base">{event.objective}</span>
                    </p>
                    <p className="text-[#c0c0c0] flex items-start gap-3 mt-3">
                      <CheckCircle2 className="shrink-0 text-[#0070f3] mt-1" size={18} />
                      <span className="text-sm md:text-base font-medium">{event.outcome}</span>
                    </p>
                  </div>
                )}

                {/* Bottom Stats Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-4 mt-auto border-t border-white/10 pt-6">
                  <div>
                    <p className="text-xs text-[#555] font-mono uppercase mb-1">Date</p>
                    <p className="text-sm font-medium text-[#f0f0f0] flex items-center gap-2">
                      <Calendar size={14} className="text-[#0070f3]" />
                      {event.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#555] font-mono uppercase mb-1">Impact</p>
                    <p className="text-sm font-medium text-[#f0f0f0] flex items-center gap-2">
                      <Users size={14} className="text-[#0070f3]" />
                      {event.participants} Participants
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
