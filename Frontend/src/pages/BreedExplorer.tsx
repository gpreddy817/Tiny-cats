import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CatBreed {
  _id: string;
  name: string;
  breed: string;
  description: string;
  lifeSpan: number;
  energyLevel: string;
  kidsFriendly: boolean;
  apartmentFriendly: boolean;
  image: string;
  color: string;
}

export default function BreedExplorer() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterApartment, setFilterApartment] = useState(false);
  const [filterKids, setFilterKids] = useState(false);
  const [filterLowGrooming, setFilterLowGrooming] = useState(false);
  const [filterHighAffection, setFilterHighAffection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/breeds")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setBreeds(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching explorer breeds:", err);
        setError("Could not retrieve cat breeds. Please check that the server is online.");
        setLoading(false);
      });
  }, []);

  const getGroomingLevel = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("persian") || n.includes("ragdoll") || n.includes("coon")) return "High";
    if (n.includes("shorthair") || n.includes("fold")) return "Medium";
    return "Low";
  };

  const isHighAffection = (name: string) => {
    const n = name.toLowerCase();
    return n.includes("ragdoll") || n.includes("siamese") || n.includes("fold") || n.includes("abyssinian");
  };

  // Filter logic
  const filteredBreeds = breeds.filter((b) => {
    // Search query
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.breed.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filters
    const matchesApartment = !filterApartment || b.apartmentFriendly;
    const matchesKids = !filterKids || b.kidsFriendly;
    const matchesGrooming = !filterLowGrooming || getGroomingLevel(b.name) === "Low";
    const matchesAffection = !filterHighAffection || isHighAffection(b.name);

    return matchesSearch && matchesApartment && matchesKids && matchesGrooming && matchesAffection;
  });

  return (
    <main className="pt-[88px] min-h-screen bg-background text-text">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="bg-[#e8f5e9] text-[#2e7d32] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
            Breed Database Directory
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">
            Explore Cat Breeds
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Browse through our verified database of cat breeds, analyze their profiles, characteristics, and find your matches.
          </p>
        </div>

        {/* Search & Filters Controls */}
        <div className="bg-white rounded-[24px] p-6 mb-8 border border-[#ffe9e4] shadow-sm space-y-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
              <span className="material-symbols-outlined text-xl">search</span>
            </span>
            <input
              type="text"
              placeholder="Search by breed name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-[16px] bg-background border border-[#dec0b9]/40 focus:outline-none focus:border-primary text-text text-sm transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-sm font-semibold text-primary mr-2">Filters:</span>
            
            <button
              onClick={() => setFilterApartment(!filterApartment)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                filterApartment
                  ? "bg-primary text-white border border-primary shadow-sm"
                  : "bg-background text-muted border border-[#dec0b9]/30 hover:border-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">apartment</span>
              Apartment Friendly
            </button>

            <button
              onClick={() => setFilterKids(!filterKids)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                filterKids
                  ? "bg-primary text-white border border-primary shadow-sm"
                  : "bg-background text-muted border border-[#dec0b9]/30 hover:border-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">child_care</span>
              Kid Friendly
            </button>

            <button
              onClick={() => setFilterLowGrooming(!filterLowGrooming)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                filterLowGrooming
                  ? "bg-primary text-white border border-primary shadow-sm"
                  : "bg-background text-muted border border-[#dec0b9]/30 hover:border-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">content_cut</span>
              Low Grooming
            </button>

            <button
              onClick={() => setFilterHighAffection(!filterHighAffection)}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                filterHighAffection
                  ? "bg-primary text-white border border-primary shadow-sm"
                  : "bg-background text-muted border border-[#dec0b9]/30 hover:border-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">favorite</span>
              High Affection
            </button>

            {/* Clear Filters Button */}
            {(filterApartment || filterKids || filterLowGrooming || filterHighAffection || searchTerm) && (
              <button
                onClick={() => {
                  setFilterApartment(false);
                  setFilterKids(false);
                  setFilterLowGrooming(false);
                  setFilterHighAffection(false);
                  setSearchTerm("");
                }}
                className="text-xs font-bold text-primary hover:underline ml-auto flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted">
            Showing <span className="font-bold text-primary">{filteredBreeds.length}</span> breeds matching your query
          </p>
        </div>

        {/* Card Grid */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-8 rounded-2xl border border-red-200 text-center">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <p className="font-semibold">{error}</p>
          </div>
        ) : filteredBreeds.length === 0 ? (
          <div className="bg-white p-12 rounded-[24px] text-center border border-[#ffe9e4] shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <span className="material-symbols-outlined text-5xl text-primary mb-4">do_not_disturb</span>
            <h3 className="text-xl font-display font-bold text-primary mb-1">No Breeds Found</h3>
            <p className="text-muted text-sm max-w-xs">
              We couldn't find any breeds matching your exact search terms or filter combinations. Try resetting filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <motion.div
                key={breed._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#ffe9e4] flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden border-b border-[#ffe9e4]">
                    <img
                      alt={breed.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={breed.image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {breed.energyLevel} Energy
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-display font-bold text-primary">{breed.name}</h3>
                        <p className="text-xs text-muted">Origin: {breed.color || "Registry Default"}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted leading-relaxed line-clamp-3">
                      {breed.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="px-2.5 py-0.5 bg-[#e3f2fd] text-[#1565c0] text-[10px] font-bold rounded-full">
                        {breed.apartmentFriendly ? "Apartment Friendly" : "House Required"}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#e8f5e9] text-[#2e7d32] text-[10px] font-bold rounded-full">
                        {breed.kidsFriendly ? "Kid Friendly" : "Special Handling"}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#f3ded9] text-primary text-[10px] font-bold rounded-full">
                        Grooming: {getGroomingLevel(breed.name)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#ffe9e4]/30 mt-4">
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xs text-muted">Lifespan: {breed.lifeSpan} yrs</span>
                    <Link
                      to={`/breed/${breed._id}`}
                      className="text-primary font-bold text-xs hover:underline flex items-center gap-0.5"
                    >
                      View Details
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
