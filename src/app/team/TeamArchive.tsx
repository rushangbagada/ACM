"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Code, User } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const YEARS = [2025, 2024, 2023, 2022, 2021];

const currentTeam = [
  { id: 1, name: "Chairperson", role: "Chairperson", img: "/pictures/cp/221.jpg" },
  { id: 2, name: "Vice Chairperson", role: "Vice Chairperson", img: "/pictures/vcp/222.jpg" },
  { id: 3, name: "Secretary", role: "Secretary", img: "/pictures/Secretary/223.jpg" },
  { id: 4, name: "Joint Secretary", role: "Secretary", img: "/pictures/Secretary/224.jpg" },
  { id: 5, name: "Treasurer", role: "Treasurer", img: "/pictures/treasurer/225.jpg" },
  { id: 6, name: "Co-Treasurer", role: "Treasurer", img: "/pictures/treasurer/226.jpg" },
  { id: 7, name: "Community Head", role: "Community Head", img: "/pictures/community-head/227.jpg" },
  { id: 8, name: "Lead Developer", role: "Developer", img: "/pictures/developer/228.jpg" },
  { id: 9, name: "Developer", role: "Developer", img: "/pictures/developer/229.jpg" },
  { id: 10, name: "Developer", role: "Developer", img: "/pictures/developer/230.jpg" },
  { id: 11, name: "Lead Designer", role: "Designer", img: "/pictures/designer/designer.jpg" },
  { id: 12, name: "Designer", role: "Designer", img: "/pictures/designer/234.jpg" },
  { id: 13, name: "Problem Setter", role: "Problem Setter", img: "/pictures/problem-setter/231.jpg" },
  { id: 14, name: "Problem Setter", role: "Problem Setter", img: "/pictures/problem-setter/232.jpg" },
  { id: 15, name: "Core Member", role: "Core Member", img: "/pictures/core-member/core-member.jpg" },
  { id: 16, name: "Core Member", role: "Core Member", img: "/pictures/core-member/core-member1.jpg" },
  { id: 17, name: "Core Member", role: "Core Member", img: "/pictures/core-member/core-member2.jpg" },
];

const pastTeams: Record<number, { name: string; role: string; img?: string }[]> = {
  2024: [
    { name: "Arjun Mehta", role: "Chairperson", img: "/pictures/210.jpg" },
    { name: "Priya Sharma", role: "Vice Chair", img: "/pictures/209.jpg" },
    { name: "Rohan Gupta", role: "Web Master", img: "/pictures/208.jpg" },
    { name: "Ananya Iyer", role: "Design Lead", img: "/pictures/207.jpg" },
    { name: "Vikram Singh", role: "Event Coordinator", img: "/pictures/206.jpg" },
  ],
  2023: [
    { name: "Siddharth Malhotra", role: "Chairperson", img: "/pictures/190.jpg" },
    { name: "Ishani Verma", role: "Vice Chair", img: "/pictures/189.jpg" },
    { name: "Kabir Bakshi", role: "Treasurer", img: "/pictures/188.jpg" },
  ],
  2022: [
    { name: "Aditya Roy", role: "Chairperson", img: "/pictures/170.jpg" },
    { name: "Meera Kapoor", role: "Vice Chair", img: "/pictures/169.jpg" },
    { name: "Sanjay Dutt", role: "Web Master", img: "/pictures/168.jpg" },
  ],
  2021: [
    { name: "Rahul Khanna", role: "Chairperson", img: "/pictures/150.jpg" },
    { name: "Simran Kaur", role: "Vice Chair", img: "/pictures/149.jpg" },
  ],
};

export default function TeamArchive() {
  const [activeYear, setActiveYear] = useState(2025);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate transition when activeYear changes
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
      
      // Shift background slightly based on year to simulate time travel
      const yearIndex = YEARS.indexOf(activeYear);
      const shiftPercent = yearIndex * 5;
      gsap.to(containerRef.current, {
        backgroundColor: `hsl(0, 0%, ${5 - shiftPercent * 0.2}%)`,
        duration: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeYear]);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Navigation Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 glass rounded-b-3xl mx-4 mt-4">
        <Link href="/" className="font-bold text-xl tracking-widest text-white">ACM<span className="text-[#0070f3]">.</span>SVNIT</Link>
        <div className="flex gap-8">
          <Link href="/team" className="text-sm font-medium text-white transition-colors uppercase tracking-wider">Archive</Link>
          <Link href="/events" className="text-sm font-medium text-[#c0c0c0] hover:text-white transition-colors uppercase tracking-wider">Events</Link>
        </div>
      </nav>

      {/* Background grain & grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #0070f3 0%, transparent 70%)', mixBlendMode: 'screen' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-8">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            <span className="text-gradient">The Archive.</span>
          </h1>
          <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl">
            A historical timeline of the minds behind ACM SVNIT. Travel back in time to explore our past executive boards.
          </p>
        </header>

        {/* Timeline Slider */}
        <div className="flex items-center space-x-4 mb-16 overflow-x-auto pb-4 scrollbar-hide" ref={timelineRef}>
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={cn(
                "px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 border backdrop-blur-md relative overflow-hidden",
                activeYear === year
                  ? "bg-white/10 border-[#0070f3] text-white shadow-[0_0_20px_rgba(0,112,243,0.3)]"
                  : "bg-transparent border-white/10 text-[#a0a0a0] hover:text-white hover:border-white/30"
              )}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div ref={contentRef} className="min-h-[50vh]">
          {activeYear === 2025 ? (
            // Bento Grid for Current Year
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
              {currentTeam.map((member, i) => (
                <div
                  key={member.id}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-white/10 glass p-6 flex flex-col justify-end transition-all duration-500 hover:border-[#0070f3]/50 hover:shadow-[0_0_30px_rgba(0,112,243,0.15)]",
                    i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"
                  )}
                >
                  {/* Image Background */}
                  <div className="absolute inset-0 z-0">
                    <Image 
                      src={member.img} 
                      alt={member.name} 
                      fill 
                      className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className={cn("font-bold text-white mb-1", i === 0 ? "text-4xl" : "text-xl")}>{member.name}</h3>
                    <p className="text-[#0070f3] font-medium tracking-wide text-sm uppercase">{member.role}</p>
                    
                    {/* Socials (reveal on hover) */}
                    <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#0070f3] hover:text-white transition-colors"><Code size={16} /></a>
                      <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#0070f3] hover:text-white transition-colors"><User size={16} /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List-based Archive for Past Years
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#0070f3] to-transparent opacity-50"></div>
                <h2 className="text-2xl font-mono text-[#0070f3]">ARCHIVE / {activeYear}</h2>
              </div>
              
              {pastTeams[activeYear]?.map((member, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-crosshair"
                >
                  <div className="flex items-center gap-6">
                    {member.img && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-[#0070f3]/50 transition-colors">
                        <Image 
                          src={member.img} 
                          alt={member.name} 
                          fill 
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#0070f3] transition-colors">{member.name}</h3>
                      <p className="text-[#a0a0a0] mt-1 font-mono text-sm uppercase tracking-wider">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-white/20 group-hover:text-white/50 transition-colors font-mono">
                    [{activeYear.toString().slice(-2)}/{i.toString().padStart(2, '0')}]
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
