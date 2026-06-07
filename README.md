## 🚀 About TINY CATS

TINY CATS is an AI-powered cat breed recommendation platform that combines structured breed data, Generative AI, and Model Context Protocol (MCP) to deliver personalized cat breed recommendations.

The application analyzes user preferences such as:

* Kids friendliness
* Apartment suitability

and generates intelligent breed recommendations with detailed comparisons, rankings, pros and cons, and final suggestions.

---

## ✨ Key Features

* 🐱 Personalized cat breed recommendations
* 🤖 AI-generated breed analysis using Gemini
* 🔗 MCP (Model Context Protocol) integration
* 📊 Breed ranking and match scoring
* 🏠 Apartment-friendly breed filtering
* 👨‍👩‍👧‍👦 Family and kid-friendly breed matching
* ⚡ Real-time recommendation generation
* 📚 Structured breed data retrieval

---

## 🏗️ Architecture

```text
User
 │
 ▼
Frontend (React)
 │
 ▼
Backend API (Node.js + TypeScript)
 │
 ├── Cat Recommendation Service
 │
 ├── MCP Server
 │      │
 │      └── Provides Cat Breed Context
 │
 └── Gemini AI
        │
        ▼
 AI Recommendation Engine
        │
        ▼
 Personalized Response
```

---

## 🔗 MCP Integration

This project uses the **Model Context Protocol (MCP)** to provide structured cat breed information to the AI model.

Benefits of MCP integration:

* Consistent breed data retrieval
* Reduced AI hallucinations
* Context-aware recommendations
* Better breed comparison accuracy
* Easier integration with external data sources

The AI does not rely solely on its pre-trained knowledge. Instead, it can access relevant breed information through MCP tools and services, resulting in more accurate and reliable recommendations.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### AI & Context Layer

* Google Gemini API
* Model Context Protocol (MCP)

### Data Layer

* Cat Breed Database
* MCP Resources & Tools

---

## 🎯 Recommendation Workflow

1. User submits preferences.
2. Backend validates inputs.
3. MCP retrieves relevant cat breed information.
4. Gemini receives structured breed context.
5. AI ranks the best matching breeds.
6. Detailed recommendations are returned to the user.
