"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowLeft, Calendar, Users, MapPin, Clock, Info, CheckCircle } from "lucide-react";

type EventType = {
  id: number;
  name: string;
  date: string;
  type: string;
  participants: string;
  objective: string;
  outcome: string;
};

export default function EventDetailClient({ event }: { event: EventType }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Hero Image
      gsap.from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      // Animate Content Blocks
      gsap.from(".animate-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 glass rounded-b-3xl mx-4 mt-4">
        <Link href="/" className="font-bold text-xl tracking-widest text-white">ACM<span className="text-[#0070f3]">.</span>SVNIT</Link>
        <div className="flex gap-8">
          <Link href="/team" className="text-sm font-medium text-[#c0c0c0] hover:text-white transition-colors uppercase tracking-wider">Archive</Link>
          <Link href="/events" className="text-sm font-medium text-white transition-colors uppercase tracking-wider">Events</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full mt-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="w-full h-full rounded-3xl overflow-hidden relative glass border border-white/10">
          <Image
            src={`https://picsum.photos/seed/${event.id * 10}/1600/900`}
            alt={event.name}
            fill
            priority
            className="object-cover opacity-60 transition-transform duration-[1500ms] ease-out"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end">
            <Link href="/events" className="animate-content flex items-center gap-2 text-[#a0a0a0] hover:text-white transition-colors w-fit mb-6 uppercase text-xs font-mono tracking-widest">
              <ArrowLeft size={16} /> Back to Events
            </Link>
            <div className="animate-content inline-block px-4 py-1.5 rounded-full text-sm font-mono font-bold tracking-wider mb-4 uppercase bg-[#0070f3]/20 text-[#0070f3] border border-[#0070f3]/30 w-fit">
              {event.type}
            </div>
            <h1 className="animate-content text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl">
              {event.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Column - Main Details */}
        <div className="md:col-span-2 space-y-12">
          <section className="animate-content">
            <div className="flex items-center gap-3 mb-4">
              <Info className="text-[#0070f3]" size={24} />
              <h2 className="text-2xl font-bold text-white">Objective</h2>
            </div>
            <p className="text-lg text-[#a0a0a0] leading-relaxed">
              {event.objective}
            </p>
            {/* Demo extended description */}
            <p className="text-lg text-[#a0a0a0] leading-relaxed mt-4">
              Join us for an immersive experience designed to challenge your skills and expand your network. This {event.type.toLowerCase()} brings together the brightest minds to collaborate, innovate, and solve real-world problems. Expect intensive sessions, expert mentorship, and a platform to showcase your talent.
            </p>
          </section>

          <section className="animate-content">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-[#0070f3]" size={24} />
              <h2 className="text-2xl font-bold text-white">Outcome</h2>
            </div>
            <div className="glass p-8 rounded-3xl border border-[#0070f3]/20 bg-[#0070f3]/5">
              <p className="text-lg text-[#f0f0f0] font-medium leading-relaxed">
                {event.outcome}
              </p>
            </div>
          </section>

          {/* Demo Gallery */}
          <section className="animate-content pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Event Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-2xl overflow-hidden glass">
                <Image 
                  src={`https://picsum.photos/seed/${event.id * 11}/600/400`} 
                  alt="Gallery 1" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </div>
              <div className="relative h-48 rounded-2xl overflow-hidden glass">
                <Image 
                  src={`https://picsum.photos/seed/${event.id * 12}/600/400`} 
                  alt="Gallery 2" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Meta Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="animate-content glass p-6 rounded-3xl border border-white/10 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">Event Details</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#0070f3]/10 text-[#0070f3]">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-[#555] font-mono uppercase">Date</p>
                <p className="text-[#f0f0f0] font-medium mt-1">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#0070f3]/10 text-[#0070f3]">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-[#555] font-mono uppercase">Time</p>
                <p className="text-[#f0f0f0] font-medium mt-1">10:00 AM - 05:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#0070f3]/10 text-[#0070f3]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-[#555] font-mono uppercase">Location</p>
                <p className="text-[#f0f0f0] font-medium mt-1">SVNIT Campus, Surat</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#0070f3]/10 text-[#0070f3]">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs text-[#555] font-mono uppercase">Impact</p>
                <p className="text-[#f0f0f0] font-medium mt-1">{event.participants} Participants</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
