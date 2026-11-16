import { profile } from "@/data/portfolioData";
import { SocialRow } from "./primitives";

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="" width={32} height={32} className="rounded-md" />
          <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
        </div>
        <SocialRow />
      </div>
    </footer>
  );
}
