import { notFound } from "next/navigation";
import { EVENTS } from "@/data/events";
import EventDetailClient from "./EventDetailClient";

export function generateStaticParams() {
  return EVENTS.map((event) => ({
    id: event.id.toString(),
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const event = EVENTS.find((e) => e.id.toString() === params.id);
  if (!event) return { title: "Event Not Found" };
  
  return {
    title: `${event.name} | ACM SVNIT`,
    description: event.objective,
  };
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = EVENTS.find((e) => e.id.toString() === params.id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#0070f3] selection:text-white">
      <EventDetailClient event={event} />
    </main>
  );
}
