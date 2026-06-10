import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 bg-transparent mt-16 border-t border-[#ffe9e4] pb-24 md:pb-12">
      <div className="flex flex-col items-center md:items-start gap-2">
        <Link to="/" className="flex items-center gap-2 text-primary font-display font-bold text-xl tracking-tight">
          <span className="material-symbols-outlined text-primary text-2xl">pets</span>
          Tiny Cats
        </Link>
        <p className="text-muted font-normal text-sm text-center md:text-left max-w-xs">
          The premium AI-powered concierge for breed recommendations and expert care.
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-8">
        <a href="#" className="text-muted hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
        <a href="#" className="text-muted hover:text-primary transition-colors text-sm font-medium">Terms of Service</a>
        <a href="#" className="text-muted hover:text-primary transition-colors text-sm font-medium">Contact Expert</a>
        <a href="#" className="text-muted hover:text-primary transition-colors text-sm font-medium">Breed Registry</a>
      </nav>

      <div className="flex flex-col items-center md:items-end gap-2">
        <div className="flex gap-3">
          <a href="#" className="w-9 h-9 rounded-full bg-[#ffe9e4]/30 hover:bg-primary/10 flex items-center justify-center text-primary transition-all">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-[#ffe9e4]/30 hover:bg-primary/10 flex items-center justify-center text-primary transition-all">
            <span className="material-symbols-outlined text-[18px]">language</span>
          </a>
        </div>
        <p className="text-muted text-xs">
          © {new Date().getFullYear()} Tiny Cats Premium Concierge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
