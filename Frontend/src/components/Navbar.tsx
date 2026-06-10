import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Breed Advisor", path: "/breed-advisor" },
    { name: "Explore Breeds", path: "/breeds" },

  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-nav shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-primary font-display font-bold text-2xl tracking-tight transition-transform active:scale-95">
          <span className="material-symbols-outlined text-primary text-3xl">pets</span>
          <span className="font-display">Tiny Cats</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive
                  ? "text-primary border-b-2 border-primary pb-1 font-semibold"
                  : "text-muted hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Menu Icon */}
        <div className="flex items-center gap-4">
          <Link
            to="/breed-advisor"
            className="hidden md:inline-flex bg-primary text-white hover:bg-primary-hover px-6 py-2.5 rounded-[16px] text-sm font-semibold shadow-md active:scale-95 transition-all"
          >
            Get Advice
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-[72px] left-0 w-full bg-white border-b border-surface-container shadow-lg z-40 transition-all duration-300 ease-in-out">
          <div className="flex flex-col px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium py-2 transition-colors ${isActive ? "text-primary font-semibold" : "text-muted"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/breed-advisor"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-white text-center py-3 rounded-[16px] font-bold shadow-md active:scale-95 transition-all"
            >
              Get Recommendations
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
