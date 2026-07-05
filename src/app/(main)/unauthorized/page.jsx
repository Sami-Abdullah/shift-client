import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 border border-zinc-800 flex items-center justify-center">
            <ShieldAlert size={22} strokeWidth={1.25} className="text-zinc-400" />
          </div>
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-4">
          Access Restricted
        </p>

        <h1
          className="text-3xl font-normal tracking-wide text-zinc-100 mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Unauthorized
        </h1>

        <p className="text-[13px] text-zinc-400 leading-relaxed mb-10">
          This section is reserved for Ferrum administrators. Please contact support.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-200 px-8 py-3 text-[10px] font-bold tracking-[0.18em] uppercase hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}