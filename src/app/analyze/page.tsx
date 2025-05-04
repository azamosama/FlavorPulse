"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type SentimentResult = {
    overallSentiment: string;
    summary: string;
    details?: Record<string, unknown>;
  };  

function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <h1 className="text-xl font-bold text-gray-900">FlavorPulse</h1>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}

export default function AnalyzePage() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviews: [{ text: review, date: new Date().toISOString() }]
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
  };

  const handleLiveFetch = async () => {
    try {
      const response = await fetch(`${API_URL}/fetch-and-analyze?restaurant=Chick-In Waffle&location=Kansas City`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching & analyzing live reviews:", error);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <motion.div
          className="text-center space-y-6 max-w-2xl w-full"
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

          <textarea
            className="border border-gray-300 rounded-lg shadow-sm p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            placeholder="Enter a review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleSubmit} size="lg" className="text-lg px-8 py-6">
              Analyze Review
            </Button>
            <Button onClick={handleLiveFetch} variant="secondary" size="lg" className="text-lg px-8 py-6">
              Live Analyze (Scraped Reviews)
            </Button>
          </div>

          {result && (
            <div className="mt-8 text-left bg-white shadow p-6 rounded-lg w-full">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Analysis Result</h2>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
}
