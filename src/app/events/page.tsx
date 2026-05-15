import EventsClient from "./EventsClient";

export const metadata = {
  title: "Events | ACM SVNIT",
  description: "Discover our technical workshops, hackathons, and symposiums.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#0070f3] selection:text-white">
      <EventsClient />
    </main>
  );
}
