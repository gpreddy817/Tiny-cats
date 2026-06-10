import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  steps?: string[];
  durationPerStep?: number;
}

const defaultSteps = [
  "Analyzing preferences...",
  "Querying MongoDB breeds database...",
  "Retrieving MCP breed context...",
  "Consulting Google Gemini AI...",
  "Ranking breed compatibility scores...",
  "Structuring personalized recommendation report..."
];

export default function LoadingState({ steps = defaultSteps, durationPerStep = 2000 }: LoadingStateProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const intervals = steps.map((_, index) => {
      if (index === 0) return null;
      return setTimeout(() => {
        setCurrentStepIndex(index);
      }, index * durationPerStep);
    });

    return () => {
      intervals.forEach((timer) => timer && clearTimeout(timer));
    };
  }, [steps, durationPerStep]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto">
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/10 rounded-full"
        />
        
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary z-10 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            pets
          </span>
        </motion.div>
      </div>

      <h3 className="font-display font-bold text-xl text-primary mb-2">Analyzing Lifestyle Matching</h3>
      <p className="text-muted text-sm mb-6 max-w-xs">Our Invisible Expert AI is crafting your bespoke breed recommendation report.</p>

      <div className="w-full space-y-3 bg-[#fff1ed] p-5 rounded-2xl border border-[#ffe9e4]">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isPending = index > currentStepIndex;

          return (
            <div
              key={step}
              className="flex items-center gap-3 text-left transition-all duration-300"
              style={{ opacity: isPending ? 0.4 : 1 }}
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {isCompleted ? (
                  <span className="material-symbols-outlined text-accent text-lg font-bold">check_circle</span>
                ) : isActive ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="material-symbols-outlined text-primary text-lg"
                  >
                    sync
                  </motion.span>
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-muted/40" />
                )}
              </div>
              
              <span
                className={`text-sm ${
                  isActive
                    ? "text-primary font-semibold"
                    : isCompleted
                    ? "text-[#43664d] font-medium"
                    : "text-muted"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
