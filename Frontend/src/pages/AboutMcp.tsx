import React from "react";
import { motion } from "framer-motion";

export default function AboutMcp() {
  return (
    <main className="pt-[88px] min-h-screen bg-background text-text">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
            Technical Architecture
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">
            Understanding Model Context Protocol
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Discover how Tiny Cats combines generative AI models with verified database context using Model Context Protocol (MCP) to prevent hallucinations.
          </p>
        </div>

        {/* Introduction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm space-y-4">
            <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">help</span>
              What is Model Context Protocol?
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Model Context Protocol (MCP) is an open standard that enables developers to build secure, structured two-way connections between AI models (like Google Gemini) and local/remote data sources (like databases, APIs, and file structures).
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Instead of relying solely on pre-trained model weights, MCP allows the model to dynamically request context from specialized servers. This makes AI agents far more precise and aligned with real-world schemas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm space-y-4">
            <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">check_circle</span>
              Why Tiny Cats uses MCP
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              AI chatbots often hallucinate traits, health risks, or grooming specifications for pet advice. Hallucinations in pet care can lead to poor compatibility matches or misinformation.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Tiny Cats integrates an MCP database server. When you submit your questionnaire, Gemini queries the MCP server to retrieve verified breed metrics. The final recommendation is grounded in authentic, structured records.
            </p>
          </div>
        </div>

        {/* Architecture Diagram Card */}
        <div className="bg-white rounded-[24px] p-8 border border-[#ffe9e4] shadow-sm mb-16">
          <h2 className="text-2xl font-display font-bold text-primary text-center mb-10 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">schema</span>
            System Data Flow Diagram
          </h2>

          <div className="flex justify-center items-center py-4 overflow-x-auto">
            {/* SVG Interactive Diagram */}
            <svg viewBox="0 0 800 500" className="w-full max-w-3xl h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Definitions for arrow markers */}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#a33d23" />
                </marker>
                <marker id="arrow-accent" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#43664d" />
                </marker>
              </defs>

              {/* User Block */}
              <g transform="translate(325, 20)">
                <rect width="150" height="60" rx="16" fill="#ffe9e4" stroke="#a33d23" strokeWidth="2" />
                <text x="75" y="35" fill="#a33d23" fontWeight="bold" fontSize="14" textAnchor="middle" fontFamily="Sora">User</text>
                <text x="75" y="50" fill="#6b7280" fontSize="10" textAnchor="middle" fontFamily="Inter">Preferences Input</text>
              </g>

              {/* Arrow: User -> Frontend */}
              <path d="M 400 80 L 400 130" stroke="#a33d23" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Frontend Block */}
              <g transform="translate(325, 140)">
                <rect width="150" height="60" rx="16" fill="#fff1ed" stroke="#a33d23" strokeWidth="2" />
                <text x="75" y="35" fill="#a33d23" fontWeight="bold" fontSize="14" textAnchor="middle" fontFamily="Sora">Frontend UI</text>
                <text x="75" y="50" fill="#6b7280" fontSize="10" textAnchor="middle" fontFamily="Inter">React Client (Vite)</text>
              </g>

              {/* Arrow: Frontend -> Backend */}
              <path d="M 400 200 L 400 250" stroke="#a33d23" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Backend API Block */}
              <g transform="translate(325, 260)">
                <rect width="150" height="60" rx="16" fill="#ffe9e4" stroke="#a33d23" strokeWidth="2" />
                <text x="75" y="35" fill="#a33d23" fontWeight="bold" fontSize="14" textAnchor="middle" fontFamily="Sora">Backend API</text>
                <text x="75" y="50" fill="#6b7280" fontSize="10" textAnchor="middle" fontFamily="Inter">Express Controller</text>
              </g>

              {/* Left Flow Line: Backend -> MCP Server */}
              <path d="M 325 290 L 195 290 L 195 360" stroke="#43664d" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow-accent)" />
              
              {/* Right Flow Line: Backend -> Gemini AI */}
              <path d="M 475 290 L 605 290 L 605 360" stroke="#a33d23" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* MCP Server Block */}
              <g transform="translate(120, 370)">
                <rect width="150" height="60" rx="16" fill="#e8f5e9" stroke="#43664d" strokeWidth="2" />
                <text x="75" y="35" fill="#43664d" fontWeight="bold" fontSize="14" textAnchor="middle" fontFamily="Sora">MCP Server</text>
                <text x="75" y="50" fill="#43664d" fontSize="10" textAnchor="middle" fontFamily="Inter">Context Retrieval</text>
              </g>

              {/* Gemini AI Block */}
              <g transform="translate(530, 370)">
                <rect width="150" height="60" rx="16" fill="#fff1ed" stroke="#a33d23" strokeWidth="2" />
                <text x="75" y="35" fill="#a33d23" fontWeight="bold" fontSize="14" textAnchor="middle" fontFamily="Sora">Gemini AI Model</text>
                <text x="75" y="50" fill="#6b7280" fontSize="10" textAnchor="middle" fontFamily="Inter">gemini-2.5-flash</text>
              </g>

              {/* Connect MCP context back to Gemini */}
              <path d="M 270 400 L 520 400" stroke="#43664d" strokeWidth="2" markerEnd="url(#arrow-accent)" />
              <text x="395" y="390" fill="#43664d" fontWeight="bold" fontSize="11" textAnchor="middle" fontFamily="Inter">Context Grounding</text>

              {/* Final Flow from Gemini to Recommendation Engine output */}
              <path d="M 605 430 L 605 460 L 400 460" stroke="#a33d23" strokeWidth="2" />
              
              {/* Arrow back to Backend for return response */}
              <path d="M 400 460 L 400 330" stroke="#a33d23" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
          </div>
        </div>

        {/* Key Technical Benefits */}
        <div className="space-y-6">
          <h2 className="text-3xl font-display font-bold text-primary text-center">Core Technical Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#ffe9e4] shadow-sm space-y-2">
              <span className="material-symbols-outlined text-primary text-3xl">task_alt</span>
              <h4 className="font-display font-bold text-primary text-base">Accurate Breed Context</h4>
              <p className="text-xs text-muted leading-relaxed">Retrieves registry listings containing authentic, structured specs rather than guessing parameters.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-[#ffe9e4] shadow-sm space-y-2">
              <span className="material-symbols-outlined text-primary text-3xl">do_not_disturb_on</span>
              <h4 className="font-display font-bold text-primary text-base">Reduced Hallucinations</h4>
              <p className="text-xs text-muted leading-relaxed">Limits the LLM text generator to the boundaries of verified datasets, eliminating false stats.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffe9e4] shadow-sm space-y-2">
              <span className="material-symbols-outlined text-primary text-3xl">thumb_up</span>
              <h4 className="font-display font-bold text-primary text-base">Better Advice</h4>
              <p className="text-xs text-muted leading-relaxed">Synthesizes lifestyle questions with registry properties to ensure optimal matches.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#ffe9e4] shadow-sm space-y-2">
              <span className="material-symbols-outlined text-primary text-3xl">terminal</span>
              <h4 className="font-display font-bold text-primary text-base">Structured Retrieval</h4>
              <p className="text-xs text-muted leading-relaxed">Separates representation schemas from the layout interfaces, creating standard API abstractions.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
