import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BreedAdvisor from "./pages/BreedAdvisor";
import BreedExplorer from "./pages/BreedExplorer";
import BreedDetails from "./pages/BreedDetails";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background font-sans text-text antialiased">
        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Content routing wrapper */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breed-advisor" element={<BreedAdvisor />} />
            <Route path="/breeds" element={<BreedExplorer />} />
            <Route path="/breed/:id" element={<BreedDetails />} />

          </Routes>
        </div>

        {/* Styled Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
