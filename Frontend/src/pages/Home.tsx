import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

interface CatBreed {
  _id: string;
  name: string;
  breed: string;
  description: string;
  image: string;
  energyLevel: string;
}

export default function Home() {
  const [featuredBreeds, setFeaturedBreeds] = useState<CatBreed[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/breeds")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          // Filter to get Ragdoll, Maine Coon, British Shorthair, Siamese if available
          const targetNames = ["Ragdoll", "Maine Coon", "British Shorthair", "Siamese"];
          const filtered = res.data.data.filter((b: CatBreed) =>
            targetNames.includes(b.name)
          );
          // If not enough match, take first 4
          setFeaturedBreeds(filtered.length > 0 ? filtered : res.data.data.slice(0, 4));
        }
      })
      .catch((err) => {
        console.error("Error fetching featured breeds:", err);
      });
  }, []);

  return (
    <main className="pt-[88px] min-h-screen bg-background text-text">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary-container/10 px-4 py-2 rounded-full border border-primary-container/20">
              <span className="material-symbols-outlined text-primary text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <span className="text-primary font-medium text-sm font-sans">AI-Powered Breed Matching</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-6xl text-primary leading-tight">
              Find Your <span className="text-secondary">Perfect</span> Cat Breed
            </h1>
            
            <p className="font-sans text-lg text-muted max-w-lg mx-auto md:mx-0">
              AI-powered recommendations backed by real breed data and Model Context Protocol (MCP). Discover the ideal feline friend for your home and lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/breed-advisor"
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-[16px] font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Get Recommendations
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                to="/breeds"
                className="bg-white border-2 border-primary-container/30 text-primary hover:bg-surface-container-low px-8 py-4 rounded-[16px] font-bold text-lg active:scale-95 transition-all flex items-center justify-center"
              >
                Explore Breeds
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl rotate-1 border-4 border-white"
          >
            <img
              alt="Beautiful Maine Coon lounging"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvMkAsFa8Z2lH6q5N_-YI5tK6w_GBam7gMqPmsQyV8N5vHEqy_zAbcVRl4BMOPXAbjpYUYVNmkZGejPYiheCCS2I93jYba0Ij-DeLPmK7DID7sp-yBVGGEs8NFwWPf1vgjTfjy2WYKIgp9k1DzHebCx6_81esR3OkTYIKTEd0L2r43_CeFW7p6fk_qUPK_vURjZMSIV0g3KNUEKINADLNOMmcNmGFm67Imf13WepPeFuMCCnwbCUJSnh4Se2ZpytMrXJkiaEjDLghX"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Floating Match Score Card */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-[24px] border border-white/50 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                </div>
                <div>
                  <p className="font-bold text-primary font-display text-sm">Maine Coon</p>
                  <p className="text-xs text-muted">96% apartment-friendly match with balcony protection</p>
                </div>
                <div className="ml-auto bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  #1 Match
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary">Platform Key Features</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Our advanced matching platform leverages cutting-edge technology and deep breed context to help you choose wisely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Bento Card 1 - AI */}
            <div className="md:col-span-2 bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary mb-2">Gemini AI Analysis</h3>
                <p className="text-muted text-sm leading-relaxed">
                  We use Google Gemini AI to analyze your lifestyle, personality, and physical layout. The output provides a highly targeted personality compatibility analysis.
                </p>
              </div>
            </div>

            {/* Bento Card 2 - MCP */}
            <div className="bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-accent mb-2">MCP Context Integration</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Model Context Protocol grounds the AI model with verified breed registries, preventing AI hallucinations.
                </p>
              </div>
            </div>

            {/* Bento Card 3 - Database */}
            <div className="bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-2xl">database</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-secondary mb-2">Structured Breed DB</h3>
                <p className="text-muted text-sm leading-relaxed">
                  A high-fidelity MongoDB database hosts structured profiles, lifespans, characteristics, and images.
                </p>
              </div>
            </div>

            {/* Bento Card 4 - Scoring */}
            <div className="bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary mb-2">Breed Match Scoring</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Algorithms cross-reference kid-friendliness, apartment compatibility, and grooming to assign match ratios.
                </p>
              </div>
            </div>

            {/* Bento Card 5 - Details */}
            <div className="md:col-span-2 bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                <span className="material-symbols-outlined text-2xl">apartment</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-accent mb-2">Apartment & Family Matching</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Filter specifically for low-maintenance, quiet breeds that thrive in small spaces or play well in busy households with kids.
                </p>
              </div>
            </div>

            {/* Bento Card 6 - Real-Time */}
            <div className="bg-white p-8 rounded-[24px] border border-[#ffe9e4] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-2xl">bolt</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-secondary mb-2">Real-Time Recommendations</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Immediate feedback cycles update suggestions as you tweak your grooming tolerances or activity inputs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary">How Tiny Cats Works</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Our Invisible Expert AI leverages data layers and model integration to curate recommendations.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#ffe9e4] shadow-sm relative">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold font-display text-lg mb-4">
              1
            </div>
            <h4 className="font-display font-bold text-primary mb-2">User Preferences</h4>
            <p className="text-xs text-muted">Fill out a simple form detailing kids, yard, energy, and grooming.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#ffe9e4] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold font-display text-lg mb-4">
              2
            </div>
            <h4 className="font-display font-bold text-secondary mb-2">MCP Context</h4>
            <p className="text-xs text-muted">Retrieve verified breed descriptions from registries using MCP.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#ffe9e4] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold font-display text-lg mb-4">
              3
            </div>
            <h4 className="font-display font-bold text-accent mb-2">Gemini AI Analysis</h4>
            <p className="text-xs text-muted">Google Gemini model processes your criteria alongside the retrieved context.</p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#ffe9e4] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold font-display text-lg mb-4">
              4
            </div>
            <h4 className="font-display font-bold text-primary mb-2">Breed Ranking</h4>
            <p className="text-xs text-muted">Database cats are sorted based on scoring filters and AI weights.</p>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#ffe9e4] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold font-display text-lg mb-4">
              5
            </div>
            <h4 className="font-display font-bold text-secondary mb-2">Recommendations</h4>
            <p className="text-xs text-muted">Get your tailored report, compatibility scores, and matching options.</p>
          </div>
        </div>
      </section>

      {/* Featured Breed Showcase */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary">Discover Breeds</h2>
              <p className="text-muted text-lg mt-2">Explore distinct personalities and characteristics.</p>
            </div>
            <Link to="/breeds" className="text-primary font-bold hover:underline flex items-center gap-2">
              Browse Registry
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredBreeds.map((breed) => (
              <div
                key={breed._id}
                className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#ffe9e4]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt={breed.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={breed.image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"}
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {breed.energyLevel} Energy
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-bold text-primary mb-1">{breed.name}</h3>
                  <p className="text-xs text-muted mb-4 line-clamp-2">{breed.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-[#ffe9e4]">
                    <span className="text-xs text-accent font-medium">Breed Profile</span>
                    <Link
                      to={`/breed/${breed._id}`}
                      className="text-primary font-bold text-xs hover:underline flex items-center gap-0.5"
                    >
                      View Details
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary">Recommendation Success Stories</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Read from members of our community who found their perfect feline matches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-[#ffe9e4] shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-all">
            <div className="w-full md:w-1/2 aspect-square rounded-[24px] overflow-hidden">
              <img
                alt="Happy client"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnbdgslHwseKZ9816eJykHVUMQwzzZGacpewEFM19aBCCFst3P5F4raGILGHqG3Gd6QbDQDOjXFj03DwXGKIraupK83KlxTs6E33nZm-iPVKuUFKCXJX55AVMflYnLFhANLv5MmNYCrq0Drg_pt-mlLzArRyh7IwSpc1WqQA4wwiorftY4Guxp8EKs6C0hiWx3jJi1MU4t3jxIzKzry_SQOaJz21VdofhWnUSy6NO80nLqaxCbYP62NEpJLvztUf5Ee6yOS_YDPYs8"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="italic text-muted text-sm font-sans">
                "The Breed Advisor was incredibly accurate! It suggested a British Shorthair for my quiet apartment setup. It fits perfectly!"
              </p>
              <div>
                <p className="font-bold text-primary font-display text-sm">James T.</p>
                <p className="text-xs text-muted">Matched via Advisor Platform</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-[#ffe9e4] shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-all">
            <div className="w-full md:w-1/2 aspect-square rounded-[24px] overflow-hidden">
              <img
                alt="Happy family"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE8fPWcdvPZyVw3xx0aEkDWSPKsYetL3Ympn-Z5QcrpxP92ZIgHQqzZKtX9nfcD9KAERtinxOT6I4cGsXtuvzecdNmd71Ad8lFevwLMRWiJowDI0a-ZRpLsSJoJPCudTzvX2KchLEy8-zYw7rUGl2u5qpD7i1FL6M9grluUP80h1e5tL6rY8XAOo3d3W_eT7rTvohgThKlfKeVcwtYjXUYxm7GzVK2TTM0eZwLNH95usohvnaxA8K7A5CAhW_A3-p_G3PHISTgPVld"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="italic text-muted text-sm font-sans">
                "We needed a kid-friendly companion, and the AI recommended Ragdoll. Leo has been gentle, loving, and a huge joy for our kids."
              </p>
              <div>
                <p className="font-bold text-primary font-display text-sm">The Miller Family</p>
                <p className="text-xs text-muted">Adoption Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-primary text-white rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="z-10 relative space-y-6">
            <h2 className="font-display font-bold text-3xl md:text-5xl max-w-2xl mx-auto">
              Ready to meet your perfect feline companion?
            </h2>
            <p className="text-lg opacity-90 max-w-xl mx-auto">
              Join thousands of owners who discovered their companions through our expert recommendation engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/breed-advisor"
                className="bg-white text-primary px-8 py-4 rounded-[16px] font-bold text-lg hover:bg-surface-container-low transition-all active:scale-95 shadow-md flex items-center justify-center"
              >
                Get Started
              </Link>
              <Link
                to="/about-mcp"
                className="bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-[16px] font-bold text-lg hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
          {/* Background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}
