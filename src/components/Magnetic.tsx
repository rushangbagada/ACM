"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const magnetic = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = magnetic.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(magnetic.current, { x: x * 0.35, y: y * 0.35, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  const onMouseLeave = () => {
    gsap.to(magnetic.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div ref={magnetic} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      {children}
    </div>
  );
}
