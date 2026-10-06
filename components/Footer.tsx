import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo size={44} decorative />
          <div>
            <p className="font-heading text-xl font-bold">
              Daftar <span lang="ar" dir="rtl" className="ml-1 text-apricot">دفتر</span>
            </p>
            <p className="text-paper/75">The smart notebook for Egypt&apos;s local shops.</p>
          </div>
        </div>
        <p className="font-hand text-2xl text-apricot">
          Built for CREATIVA Innovation Hub Alexandria × Replit
        </p>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-paper/60 sm:px-6">
          © {new Date().getFullYear()} Daftar. A hackathon project.
        </p>
      </div>
    </footer>
  );
}
