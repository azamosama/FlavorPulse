# Updated sentiment_analyzer with error handling, insights, trend generation, and structural consistency

import time
import random
import json
from datetime import datetime
from collections import defaultdict
import openai  # Assuming you have this set up
import os
import logging

from dotenv import load_dotenv
from openai_utils import generate_text
load_dotenv()  # Load the .env file
openai.api_key = os.getenv("OPENAI_API_KEY")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def analyze_review_sentiment(text):
    prompt = f"""
    Analyze the sentiment of the following restaurant review:

    Review: "{text}"

    Provide a JSON with:
    - sentiment: positive, neutral, or negative
    - score: a float between -1 and 1
    - categories: sentiment scores for Food Quality, Customer Service, Cleanliness, Value for Money, Wait Times, Ambiance
    - menuItems: for each mentioned menu item, return mentioned (true/false), sentiment, and score
    """

    attempts = 0
    max_attempts = 2  # Try once normally + 1 retry

    while attempts < max_attempts:
        try:
            analysis_result = generate_text({
                "model": "gpt-4o",
                "prompt": prompt
            })

            analysis = json.loads(analysis_result)
            return analysis  # Success, return immediately
        except (json.JSONDecodeError, Exception) as e:
            logger.warning(f"Attempt {attempts + 1} to analyze review failed: {e}")
            attempts += 1
            time.sleep(1)  # Optional: small delay before retry

    logger.error("Failed to analyze review after retries.")
    return None


def aggregate_sentiment_results(reviews):
    summary = {
        "positive": 0,
        "neutral": 0,
        "negative": 0,
        "scores": [],
        "categories": defaultdict(list),
        "menuItems": defaultdict(lambda: {"positive": [], "neutral": [], "negative": []}),
        "monthlyTrends": defaultdict(list)
    }

    for review in reviews:
        analysis = analyze_review_sentiment(review["text"])
        if not analysis:
            continue

        sentiment = analysis["sentiment"]
        score = analysis["score"]

        summary[sentiment] += 1
        summary["scores"].append(score)

        for category, cat_score in analysis.get("categories", {}).items():
            key = category.lower().replace(" ", "")  # normalize
            if cat_score is not None:
                summary["categories"][key].append(cat_score)

        for item, data in analysis.get("menuItems", {}).items():
            if data["mentioned"]:
                summary["menuItems"][item][data["sentiment"]].append(review["text"])

        # Trend by month
        if "date" in review:
            month = datetime.strptime(review["date"], "%Y-%m-%d").strftime("%Y-%m")
            summary["monthlyTrends"][month].append(score)

        time.sleep(random.uniform(1.1, 1.7))

    # Post process
    processed_summary = {
        "sentimentBreakdown": {
            "positive": summary["positive"],
            "neutral": summary["neutral"],
            "negative": summary["negative"]
        },
        "averageScore": sum(summary["scores"]) / len(summary["scores"] or [1]),
        "categories": {
            k: sum(v)/len(v) for k, v in summary["categories"].items()
        },
        "menuItems": summary["menuItems"],
        "trends": {
            month: sum(scores)/len(scores) for month, scores in summary["monthlyTrends"].items()
        }
    }

    return processed_summary


def generate_insights(summary):
    prompt = f"""
    Given this restaurant review analysis summary JSON:

    {json.dumps(summary, indent=2)}

    Generate insights including:
    - strengths
    - weaknesses
    - opportunities
    - recommendations

    Return as a JSON with keys: strengths, weaknesses, opportunities, recommendations.
    """

    response = generate_text({
        "model": "gpt-4o",
        "prompt": prompt
    })

    try:
        insights = json.loads(response)
    except json.JSONDecodeError:
        print("Failed to parse insights:", response)
        insights = {
            "strengths": [],
            "weaknesses": [],
            "opportunities": [],
            "recommendations": []
        }

    return insights


def analyze_reviews(reviews):
    summary = aggregate_sentiment_results(reviews)
    insights = generate_insights(summary)
    summary["insights"] = insights
    return summary

analyzeRestaurantSentiment = analyze_reviews
batchAnalyzeSentiment = analyze_reviews  # If you're using it like that

if __name__ == "__main__":
    sample_reviews = [
        {"text": "The food was amazing, but the service was a little slow.", "date": "2025-04-01"},
        {"text": "Terrible experience. Cold food and rude staff.", "date": "2025-04-02"},
        {"text": "Loved the ambiance and the food was decent.", "date": "2025-04-03"}
    ]

    result = analyze_reviews(sample_reviews)
    print(json.dumps(result, indent=2))
