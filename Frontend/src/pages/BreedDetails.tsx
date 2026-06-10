import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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

export default function BreedDetails() {
  const { id } = useParams<{ id: string }>();
  const [breed, setBreed] = useState<CatBreed | null>(null);
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAi, setLoadingAi] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    // Fetch breed document from MongoDB
    axios
      .get(`http://localhost:3000/api/breeds/${id}`)
      .then((res) => {
        if (res.data.success && res.data.data) {
          const breedData = res.data.data;
          setBreed(breedData);
          setLoading(false);
          
          // Now request a custom AI behaviorist summary
          fetchAiSummary(breedData);
        } else {
          setError("Breed profile not found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching breed details:", err);
        setError("Could not retrieve breed details. Please verify that the backend is running.");
        setLoading(false);
      });
  }, [id]);

  const fetchAiSummary = async (breedData: CatBreed) => {
    try {
      const prompt = `You are a certified feline behaviourist. Generate an expert, clinical summary of the ${breedData.name} cat breed based on these attributes:
- Lifespan: ${breedData.lifeSpan} years
- Coat color/pattern: ${breedData.color}
- Kids Friendly: ${breedData.kidsFriendly}
- Apartment Friendly: ${breedData.apartmentFriendly}
- Energy Level: ${breedData.energyLevel}

Format the response in markdown. Include:
1. ### Origin & History
2. ### Behavioral Profile & Temperament
3. ### Home Adaptation & Family Compatibility
4. ### Grooming & Care Protocol

Keep the tone expert, warm, and highly informative. Avoid generic AI introductory text.`;

      const res = await axios.post("http://localhost:3000/api/ai/ask", { prompt });
      if (res.data.success && res.data.data) {
        setAiSummary(res.data.data);
      } else {
        setAiSummary("Unable to generate AI summary at this time.");
      }
    } catch (err) {
      console.error("Error fetching AI summary:", err);
      setAiSummary(`### Behavioral Profile & Care

The **${breedData.name}** is a highly esteemed breed known for its distinctive features and engaging demeanor.

- **Activity Suitability**: With a **${breedData.energyLevel}** energy level, they adapt beautifully to structured home routines.
- **Apartment Living**: They are rated **${breedData.apartmentFriendly ? "Highly Adaptable" : "Moderately Adaptable"}** for apartment spaces.
- **Family Profile**: ${breedData.kidsFriendly ? "Superb with kids and high-activity households." : "Prefers quieter environments with experienced handlers."}

*Note: Expert AI summaries require a Google Gemini connection.*`);
    } finally {
      setLoadingAi(false);
    }
  };

  const getGroomingLevel = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("persian") || n.includes("ragdoll") || n.includes("coon")) return "High";
    if (n.includes("shorthair") || n.includes("fold")) return "Medium";
    return "Low";
  };

  const getPersonalityTags = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("ragdoll")) return ["Friendly", "Docile", "Placid", "Quiet"];
    if (n.includes("coon")) return ["Dog-like", "Playful", "Large", "Water-lover"];
    if (n.includes("shorthair")) return ["Calm", "Easygoing", "Independent", "Loyal"];
    if (n.includes("siamese")) return ["Vocal", "Social", "Intelligent", "Active"];
    if (n.includes("persian")) return ["Docile", "Quiet", "Sweet", "Dignified"];
    if (n.includes("bengal")) return ["Athletic", "Curious", "Vocal", "Energetic"];
    if (n.includes("abyssinian")) return ["Acrobatic", "Curious", "Active", "Playful"];
    if (n.includes("fold")) return ["Adaptable", "Affectionate", "Calm", "Quiet"];
    return ["Friendly", "Playful", "Intelligent", "Calm"];
  };

  if (loading) {
    return (
      <main className="pt-[88px] min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
          <p className="text-muted text-sm">Loading breed specifications...</p>
        </div>
      </main>
    );
  }

  if (error || !breed) {
    return (
      <main className="pt-[88px] min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-[#ffe9e4] text-center max-w-md shadow-sm">
          <span className="material-symbols-outlined text-5xl text-primary mb-4">error</span>
          <h2 className="text-2xl font-display font-bold text-primary mb-2">Error Loading Profile</h2>
          <p className="text-muted text-sm mb-6">{error || "Breed profile could not be resolved."}</p>
          <Link to="/breeds" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-primary-hover active:scale-95 transition-all">
            Return to Explorer
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[88px] min-h-screen bg-background text-text">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="relative rounded-[32px] overflow-hidden bg-surface-container h-[300px] md:h-[450px] flex items-end p-8 md:p-12 border border-[#ffe9e4]">
          <div className="absolute inset-0 z-0">
            <img
              alt={breed.name}
              className="w-full h-full object-cover opacity-75"
              src={breed.image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-white space-y-2">
            <Link to="/breeds" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-xs font-semibold mb-2 transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Explorer
            </Link>
            <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider block w-fit">
              {breed.color}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
              {breed.name}
            </h1>
            <p className="text-white/95 max-w-xl text-sm font-medium">
              Registered Breed Profile and AI Behaviorist Study
            </p>
          </div>
        </div>
      </section>

      {/* Profile Content split */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Stats & Tags */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Overview Stats */}
            <div className="bg-white rounded-[24px] p-6 border border-[#ffe9e4] shadow-sm">
              <h3 className="text-lg font-display font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Breed Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#fff1ed]/50 p-4 rounded-xl border border-primary/5">
                  <p className="text-xs text-muted">Lifespan</p>
                  <p className="text-lg font-bold text-primary">{breed.lifeSpan} Years</p>
                </div>
                <div className="bg-[#fff1ed]/50 p-4 rounded-xl border border-primary/5">
                  <p className="text-xs text-muted">Energy Level</p>
                  <p className="text-lg font-bold text-primary">{breed.energyLevel}</p>
                </div>
                <div className="bg-[#fff1ed]/50 p-4 rounded-xl border border-primary/5">
                  <p className="text-xs text-muted">Grooming Needs</p>
                  <p className="text-lg font-bold text-primary">{getGroomingLevel(breed.name)}</p>
                </div>
                <div className="bg-[#fff1ed]/50 p-4 rounded-xl border border-primary/5">
                  <p className="text-xs text-muted">Coat Pattern</p>
                  <p className="text-sm font-bold text-primary truncate">{breed.color}</p>
                </div>
              </div>
            </div>

            {/* Personality Tags */}
            <div className="bg-white rounded-[24px] p-6 border border-[#ffe9e4] shadow-sm">
              <h3 className="text-lg font-display font-bold text-primary mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">label</span>
                Personality Traits
              </h3>
              <div className="flex flex-wrap gap-2">
                {getPersonalityTags(breed.name).map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Compatibility Gauges */}
            <div className="bg-white rounded-[24px] p-6 border border-[#ffe9e4] shadow-sm space-y-4">
              <h3 className="text-lg font-display font-bold text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">dashboard</span>
                Home Adaptability Scores
              </h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-text">
                  <span>Apartment Suitability</span>
                  <span>{breed.apartmentFriendly ? "100%" : "40%"}</span>
                </div>
                <div className="w-full bg-[#fff1ed] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: breed.apartmentFriendly ? "100%" : "40%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-text">
                  <span>Kid Friendliness</span>
                  <span>{breed.kidsFriendly ? "100%" : "40%"}</span>
                </div>
                <div className="w-full bg-[#fff1ed] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: breed.kidsFriendly ? "100%" : "40%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-text">
                  <span>Other Pets compatibility</span>
                  <span>{breed.name === "Ragdoll" || breed.name === "Maine Coon" ? "95%" : "70%"}</span>
                </div>
                <div className="w-full bg-[#fff1ed] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: breed.name === "Ragdoll" || breed.name === "Maine Coon" ? "95%" : "70%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-text">
                  <span>Energy Activity Scale</span>
                  <span>{breed.energyLevel === "High" ? "90%" : breed.energyLevel === "Medium" ? "65%" : "35%"}</span>
                </div>
                <div className="w-full bg-[#fff1ed] h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: breed.energyLevel === "High" ? "90%" : breed.energyLevel === "Medium" ? "65%" : "35%" }} />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: AI Summary */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[24px] p-8 border border-[#ffe9e4] shadow-sm min-h-[500px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-[#ffe9e4] mb-6">
                  <div className="inline-flex items-center gap-2 bg-accent/15 px-3 py-1 rounded-full text-accent text-xs font-semibold">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    Behaviorist AI Report
                  </div>
                  <span className="text-xs text-muted">Powered by Gemini AI</span>
                </div>

                {loadingAi ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-3">
                    <span className="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
                    <p className="text-xs text-muted">Consulting expert behaviourist model...</p>
                  </div>
                ) : (
                  <div className="markdown-report text-sm leading-relaxed text-text space-y-4">
                    <ReactMarkdown>{aiSummary}</ReactMarkdown>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#ffe9e4] flex justify-between items-center text-xs text-muted">
                <span>Database ID: {breed._id}</span>
                <span>Context-grounded using MCP</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
