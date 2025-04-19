// src/app/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";

// ✅ This is the correct way for framer-motion v12+

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      {/* Animated Header Section */}
      <motion.div
        className="text-center space-y-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          FlavorPulse
        </h1>
        <p className="text-lg text-gray-600">
          Analyze restaurant reviews in real-time using AI sentiment analysis & live web scraping.
        </p>
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <a href="https://v0-sentiment-analysis-app-rm2alg.vercel.app/" target="_blank">
            Try the Demo
          </a>
        </Button>
      </motion.div>

      {/* Animated Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
        {[
          { title: "Live Web Scraping", desc: "Pulls reviews directly from restaurant websites in real-time." },
          { title: "Sentiment Analysis", desc: "Classifies reviews as positive, neutral, or negative." },
          { title: "Fast & Easy", desc: "Enter a URL and get instant feedback with beautiful summaries." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        Built with ❤️ for demo purposes – FlavorPulse
      </footer>
    </main>
  );
}
