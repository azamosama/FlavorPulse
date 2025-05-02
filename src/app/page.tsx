"use client";

import { motion } from "framer-motion";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20">
        <motion.div
          className="text-center space-y-6 max-w-2xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-gray-900">FlavorPulse</h1>
          <p className="text-lg text-gray-600">
            AI-powered restaurant sentiment analysis
          </p>
        </motion.div>

        <motion.div
          className="mt-16 w-full max-w-6xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <FeatureCard
              title="Live Web Scraping"
              description="Pulls reviews directly from restaurant websites in real-time."
            />
            <FeatureCard
              title="Sentiment Analysis"
              description="Classifies reviews as positive, neutral, or negative."
            />
            <FeatureCard
              title="Fast & Easy"
              description="Enter a URL and get instant feedback with beautiful summaries."
            />
          </div>
        </motion.div>
      </main>
    </>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
