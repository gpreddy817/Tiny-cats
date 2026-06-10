import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
    });
  } catch (error) {
    console.error("Error initializing GoogleGenAI client:", error);
  }
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not defined in .env. AI suggestions will run in offline mode.");
}

export async function generateAiResponse(prompt: string) {
  if (!ai) {
    console.warn("Gemini service is uninitialized. Returning offline fallback response.");
    if (prompt.includes("Kids Friendly")) {
      return `# Best Cat Breed Matches (Offline Fallback)

Based on your lifestyle preferences, we have analyzed breed compatibilities.

## 1. Ragdoll
Match Score: 95/100

### Why It Matches
Ragdolls are extremely sweet-natured, calm, and kid-friendly. They adapt beautifully to apartment constraints due to their low-energy levels.

### Pros
- Highly affectionate and gentle.
- Low vocal signature.

### Cons
- Requires regular brushing (high grooming need).

### Key Characteristics
- Energy Level: Low
- Affection Level: High
- Grooming: High
- Life Span: 15 years
- Kids Friendly: Yes
- Apartment Friendly: Yes

---

## 2. British Shorthair
Match Score: 88/100

### Why It Matches
British Shorthairs are easygoing and calm, making them perfect for relaxed home settings or beginners.

### Pros
- Quite independent and patient.
- Round, teddy-bear appearance.

### Cons
- Can be reserved initially.

### Key Characteristics
- Energy Level: Low
- Affection Level: Medium
- Grooming: Medium
- Life Span: 14 years
- Kids Friendly: Yes
- Apartment Friendly: Yes

# Final Recommendation
The **Ragdoll** is the best choice if you prioritize high affection, whereas the **British Shorthair** represents an excellent low-maintenance companion.`;
    }

    return `### Behaviorist Breed Analysis (Offline Mode)
    
**Note: GEMINI_API_KEY is not configured.**

The requested breed details:
* **Origin**: Domestic/Registry specifications.
* **Temperament**: Active and social when engaged.
* **Grooming**: Standard maintenance patterns.`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
