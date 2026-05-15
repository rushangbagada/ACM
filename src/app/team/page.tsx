import TeamArchive from "./TeamArchive";

export const metadata = {
  title: "Team Archive | ACM SVNIT",
  description: "Explore the historical archive of ACM SVNIT executive boards.",
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#0070f3] selection:text-white">
      <TeamArchive />
    </main>
  );
}
