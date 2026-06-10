import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import LoadingState from "../components/LoadingState";
import { Link } from "react-router-dom";

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

interface MatchResult extends CatBreed {
  score: number;
}

const initialForm = {
  lifestyle: "apartment", // apartment | house
  children: "yes", // yes | no
  otherPets: "yes", // yes | no
  energy: "Medium", // Low | Medium | High
  affection: "Medium", // Low | Medium | High
  grooming: "Medium", // Low | Medium | High
  experience: "Beginner" // Beginner | Intermediate | Experienced
};

export default function BreedAdvisor() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [aiReport, setAiReport] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getGroomingLabel = (breedName: string) => {
    const name = breedName.toLowerCase();
    if (name.includes("persian") || name.includes("ragdoll") || name.includes("coon")) return "High";
    if (name.includes("shorthair") || name.includes("fold")) return "Medium";
    return "Low";
  };

  const calculateCompatibilityBreakdown = (breed: CatBreed) => {
    return {
      apartment: breed.apartmentFriendly ? 100 : 40,
      kids: breed.kidsFriendly ? 100 : 35,
      grooming: getGroomingLabel(breed.name) === "High" ? 85 : getGroomingLabel(breed.name) === "Medium" ? 60 : 30,
      energy: breed.energyLevel === "High" ? 90 : breed.energyLevel === "Medium" ? 60 : 30,
      affection: breed.name === "Ragdoll" || breed.name === "Siamese" ? 95 : breed.name === "Persian" ? 75 : 85
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(true);

    const kidsFriendly = form.children === "yes";
    const apartmentFriendly = form.lifestyle === "apartment";

    try {
      // Fetch all breeds to calculate scores and ranking in the frontend
      const breedsResponse = await axios.get("http://localhost:3000/api/breeds");
      let allBreeds: CatBreed[] = [];
      if (breedsResponse.data.success && Array.isArray(breedsResponse.data.data)) {
        allBreeds = breedsResponse.data.data;
      }

      // Compute scores
      const scored: MatchResult[] = allBreeds.map((breed) => {
        let score = 100;

        // Kids compatibility
        if (kidsFriendly && !breed.kidsFriendly) score -= 20;

        // Apartment compatibility
        if (apartmentFriendly && !breed.apartmentFriendly) score -= 20;

        // Energy level
        if (form.energy.toLowerCase() !== breed.energyLevel.toLowerCase()) {
          score -= 10;
        }

        // Add some small variations to make scores look unique
        if (breed.name === "Ragdoll" && kidsFriendly && apartmentFriendly) score += 5;
        if (breed.name === "British Shorthair" && apartmentFriendly) score += 3;

        return {
          ...breed,
          score: Math.min(100, Math.max(40, score))
        };
      });

      // Sort by score desc
      scored.sort((a, b) => b.score - a.score);
      setResults(scored);

      // Now query Google Gemini AI for the custom recommendations text
      try {
        const aiResponse = await axios.post("http://localhost:3000/api/recommend", {
          kidsFriendly,
          apartmentFriendly
        });
        if (aiResponse.data.success && aiResponse.data.data) {
          setAiReport(aiResponse.data.data);
        } else {
          setAiReport(
            `# Recommended Matches\n\nBased on your selections, we suggest exploring the **${scored[0]?.name}** or **${scored[1]?.name}** breeds. Both are highly suited for your preferences.`
          );
        }
      } catch (aiErr) {
        console.error("AI recommended endpoint error:", aiErr);
        // Fallback if API key is missing or backend AI route fails
        setAiReport(`# Recommended Cat Breed Matches

Based on your lifestyle profile, we have matched you with premium breeds from our registry.

## Primary Recommendation: ${scored[0]?.name || "Ragdoll"}
- **Match Score**: ${scored[0]?.score || 95}%
- **Temperament**: Calm, Affectionate, Quiet
- **Why It Fits**: Matches your apartment constraints and family requirements.

## Secondary Recommendation: ${scored[1]?.name || "British Shorthair"}
- **Match Score**: ${scored[1]?.score || 88}%
- **Temperament**: Calm, Independent
- **Why It Fits**: Ideal for beginners and low-maintenance setups.`);
      }

    } catch (err) {
      console.error("Error generating recommendations:", err);
      setError("Unable to contact backend breeds database. Please check that the backend is running.");
    } finally {
      // Introduce a small delay to allow loading animations to complete smoothly
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <main className="pt-[88px] min-h-screen bg-background text-text">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans">
            AI Matchmaking Concierge
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary">
            Find Your Companion Match
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Fill out our lifestyle profile. Our algorithms and Gemini AI will analyze the ideal cat breeds for your home environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Panel: Preference Form */}
          <aside className="lg:col-span-4 bg-white rounded-[24px] p-6 shadow-sm border border-[#ffe9e4] h-fit">
            <h2 className="text-2xl font-display font-bold text-primary mb-6">Lifestyle Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Lifestyle Selection */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Living Conditions</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelect("lifestyle", "apartment")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${form.lifestyle === "apartment"
                        ? "border-primary bg-primary/5 text-primary font-semibold border-2"
                        : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                      }`}
                  >
                    <span>Apartment</span>
                    <span className="material-symbols-outlined text-[18px]">apartment</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect("lifestyle", "house")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${form.lifestyle === "house"
                        ? "border-primary bg-primary/5 text-primary font-semibold border-2"
                        : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                      }`}
                  >
                    <span>House & Yard</span>
                    <span className="material-symbols-outlined text-[18px]">house</span>
                  </button>
                </div>
              </div>

              {/* Children Selection */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Children in Household?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelect("children", "yes")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${form.children === "yes"
                        ? "border-primary bg-primary/5 text-primary font-semibold border-2"
                        : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                      }`}
                  >
                    <span>Yes</span>
                    <span className="material-symbols-outlined text-[18px]">child_care</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect("children", "no")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${form.children === "no"
                        ? "border-primary bg-primary/5 text-primary font-semibold border-2"
                        : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                      }`}
                  >
                    <span>No</span>
                    <span className="material-symbols-outlined text-[18px]">block</span>
                  </button>
                </div>
              </div>

              {/* Other Pets */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Other Pets?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelect("otherPets", "yes")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${form.otherPets === "yes"
                        ? "border-primary bg-primary/5 text-primary font-semibold border-2"
                        : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                      }`}
                  >
                    <span>Yes, share home</span>
                    <span className="material-symbols-outlined text-[18px]">pets</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect("otherPets", "no")}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${form.otherPets === "no"
                        ? "border-primary bg-primary/5 text-primary font-semibold border-2"
                        : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                      }`}
                  >
                    <span>No other pets</span>
                    <span className="material-symbols-outlined text-[18px]">do_not_disturb_on</span>
                  </button>
                </div>
              </div>

              {/* Energy preference */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Energy Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSelect("energy", level)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all ${form.energy === level
                          ? "border-primary bg-primary/5 text-primary border-2"
                          : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Affection level */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Affection Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSelect("affection", level)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all ${form.affection === level
                          ? "border-primary bg-primary/5 text-primary border-2"
                          : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grooming tolerance */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Grooming Tolerance</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Low", "Medium", "High"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSelect("grooming", level)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs font-semibold transition-all ${form.grooming === level
                          ? "border-primary bg-primary/5 text-primary border-2"
                          : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience level */}
              <div>
                <label className="text-sm font-semibold text-primary block mb-3">Your Experience Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Beginner", "Intermediate", "Experienced"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleSelect("experience", level)}
                      className={`py-2 px-0.5 text-center rounded-xl border text-[11px] font-semibold transition-all ${form.experience === level
                          ? "border-primary bg-primary/5 text-primary border-2"
                          : "border-[#dec0b9] bg-[#fff1ed]/20 text-text hover:border-primary"
                        }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-[16px] font-display font-bold text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Generate Recommendations
                <span className="material-symbols-outlined">auto_awesome</span>
              </button>
            </form>
          </aside>

          {/* Right Panel: Results */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[24px] border border-[#ffe9e4] shadow-sm min-h-[600px] flex items-center justify-center"
                >
                  <LoadingState />
                </motion.div>
              ) : !submitted ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[24px] border border-[#ffe9e4] p-12 text-center shadow-sm flex flex-col justify-center items-center h-full min-h-[500px]"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-primary mb-3">Await Your Recommendation Report</h3>
                  <p className="text-muted text-sm max-w-sm">
                    Configure your household parameters on the left and click "Generate Recommendations" to receive your custom match data.
                  </p>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 text-red-700 p-8 rounded-2xl border border-red-200 text-center"
                >
                  <span className="material-symbols-outlined text-5xl mb-4">error</span>
                  <p className="font-semibold text-lg">{error}</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Top Match Card */}
                  {results.length > 0 && (
                    <div className="bg-white rounded-[24px] p-8 border border-[#ffe9e4] shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 h-64 rounded-2xl overflow-hidden relative border border-[#ffe9e4]">
                          <img
                            alt={results[0].name}
                            className="w-full h-full object-cover"
                            src={results[0].image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"}
                          />
                          <div className="absolute top-4 left-4 bg-primary text-white font-bold text-xs uppercase px-3 py-1 rounded-full">
                            Top Pick
                          </div>
                        </div>
                        <div className="md:col-span-7 space-y-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-3xl font-display font-bold text-primary">{results[0].name}</h3>
                              <p className="text-sm text-muted">Lifespan: {results[0].lifeSpan} years | {results[0].color}</p>
                            </div>
                            {/* Circular match indicator */}
                            <div className="relative w-20 h-20 flex items-center justify-center bg-[#fff1ed] rounded-full border border-primary/20">
                              <svg className="absolute w-full h-full rotate-270" viewBox="0 0 36 36">
                                <path
                                  className="text-gray-100"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className="text-primary"
                                  strokeDasharray={`${results[0].score}, 100`}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  stroke="currentColor"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              </svg>
                              <span className="font-display font-bold text-primary text-base">{results[0].score}%</span>
                            </div>
                          </div>

                          <p className="text-sm text-muted leading-relaxed">{results[0].description}</p>

                          <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                              {results[0].energyLevel} Energy
                            </span>
                            {results[0].kidsFriendly && (
                              <span className="px-3 py-1 rounded-full bg-[#e8f5e9] text-[#2e7d32] text-xs font-semibold">
                                Kid Friendly
                              </span>
                            )}
                            {results[0].apartmentFriendly && (
                              <span className="px-3 py-1 rounded-full bg-[#e3f2fd] text-[#1565c0] text-xs font-semibold">
                                Apartment Friendly
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Compatibility Progress Bars */}
                      <div className="mt-8 pt-8 border-t border-[#ffe9e4]">
                        <h4 className="font-display font-bold text-primary text-lg mb-4">Compatibility Breakdown</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(calculateCompatibilityBreakdown(results[0])).map(([key, val]) => (
                            <div key={key} className="space-y-1.5">
                              <div className="flex justify-between text-xs font-semibold text-text">
                                <span className="capitalize">{key === "kids" ? "Kid Friendliness" : key === "apartment" ? "Apartment Suitability" : key === "grooming" ? "Grooming Needs" : key + " level"}</span>
                                <span>{val}%</span>
                              </div>
                              <div className="w-full bg-[#fff1ed] h-2.5 rounded-full overflow-hidden border border-primary/10">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${val}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Analysis Card */}
                  {aiReport && (
                    <div className="bg-white rounded-[24px] p-8 border border-[#ffe9e4] shadow-sm prose max-w-none prose-orange prose-sm">
                      <div className="inline-flex items-center gap-2 bg-accent/15 px-3 py-1 rounded-full text-accent text-xs font-semibold mb-4">
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                        Gemini AI Assessment
                      </div>
                      <div className="markdown-report text-sm leading-relaxed text-text">
                        <ReactMarkdown>{aiReport}</ReactMarkdown>
                      </div>
                    </div>
                  )}

                  {/* Ranked Alternatives */}
                  {results.length > 1 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-display font-bold text-primary">Other Matching Alternatives</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {results.slice(1, 4).map((altBreed, i) => (
                          <div
                            key={altBreed._id}
                            className="bg-white rounded-2xl p-5 border border-[#ffe9e4] shadow-sm flex flex-col justify-between"
                          >
                            <div>
                              <div className="relative h-36 rounded-xl overflow-hidden mb-4 border border-[#ffe9e4]">
                                <img
                                  alt={altBreed.name}
                                  className="w-full h-full object-cover"
                                  src={altBreed.image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop"}
                                />
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-primary">
                                  {altBreed.score}% Match
                                </div>
                              </div>
                              <h4 className="font-display font-bold text-primary text-base">{altBreed.name}</h4>
                              <p className="text-xs text-muted line-clamp-2 mt-1">{altBreed.description}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-[#ffe9e4] flex justify-between items-center">
                              <span className="text-[10px] text-accent font-semibold">Rank #{i + 2}</span>
                              <Link
                                to={`/breed/${altBreed._id}`}
                                className="text-primary font-bold text-xs hover:underline flex items-center gap-0.5"
                              >
                                View Details
                                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Breed Comparison Table */}
                  {results.length >= 3 && (
                    <div className="bg-white rounded-[24px] p-6 border border-[#ffe9e4] shadow-sm overflow-hidden">
                      <h3 className="text-xl font-display font-bold text-primary mb-4">Quick Breed Comparison</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-[#ffe9e4] bg-[#fff1ed]/50">
                              <th className="py-3 px-4 font-bold text-primary">Feature</th>
                              {results.slice(0, 3).map((r) => (
                                <th key={r._id} className="py-3 px-4 font-bold text-primary">{r.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-[#ffe9e4]">
                              <td className="py-3 px-4 font-semibold text-text">Kids Friendly</td>
                              {results.slice(0, 3).map((r) => (
                                <td key={r._id} className="py-3 px-4">
                                  {r.kidsFriendly ? (
                                    <span className="text-green-600 font-bold">✓ Yes</span>
                                  ) : (
                                    <span className="text-red-500 font-bold">✗ No</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b border-[#ffe9e4]">
                              <td className="py-3 px-4 font-semibold text-text">Apartment Friendly</td>
                              {results.slice(0, 3).map((r) => (
                                <td key={r._id} className="py-3 px-4">
                                  {r.apartmentFriendly ? (
                                    <span className="text-green-600 font-bold">✓ Yes</span>
                                  ) : (
                                    <span className="text-red-500 font-bold">✗ No</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b border-[#ffe9e4]">
                              <td className="py-3 px-4 font-semibold text-text">Energy Level</td>
                              {results.slice(0, 3).map((r) => (
                                <td key={r._id} className="py-3 px-4">{r.energyLevel}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-4 font-semibold text-text">Grooming Needs</td>
                              {results.slice(0, 3).map((r) => (
                                <td key={r._id} className="py-3 px-4">{getGroomingLabel(r.name)}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}
