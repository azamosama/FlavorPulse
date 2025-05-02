import random
import os
import openai
from dotenv import load_dotenv
from datetime import datetime, timedelta
from sentiment_analyzer import analyze_sentiment, generate_insights


load_dotenv()

USE_LOCAL_SENTIMENT = os.getenv("USE_LOCAL_SENTIMENT", "false").lower() == "true"

if not USE_LOCAL_SENTIMENT:
    import openai
    openai.api_key = os.getenv("OPENAI_API_KEY")

from datetime import datetime, timedelta
import random

# Now import the correct sentiment analyzer
if USE_LOCAL_SENTIMENT:
    from sentiment_analyzer import analyze_sentiment, generate_insights
else:
    from sentiment_analyzer import analyze_review_sentiment as analyze_sentiment
    from sentiment_analyzer import generate_insights



load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_text(prompt, model="gpt-4-0125-preview"):
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates insights based on restaurant reviews."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=300
        )
        return response["choices"][0]["message"]["content"].strip()
    except Exception as e:
        return f"Error generating text: {e}"
# Simulated platforms and sample menu items
PLATFORMS = ["Google", "Yelp", "TripAdvisor", "Zomato"]
MENU_ITEMS = ["chicken & waffle", "spicy tenders", "classic waffle", "syrup", "iced tea"]


def simulate_review(platform, menu_item):
    sample_reviews = [
        f"The {menu_item} was amazing! Highly recommend.",
        f"Didn't love the {menu_item}. Could be better.",
        f"Average experience, the {menu_item} was okay.",
        f"Terrible service and the {menu_item} was cold.",
        f"Loved the vibe and the {menu_item} was delicious!"
    ]
    return {
        "text": random.choice(sample_reviews),
        "platform": platform,
        "menu_item": menu_item,
        "timestamp": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat()
    }


def generate_reviews(num_reviews=20):
    reviews = []
    for _ in range(num_reviews):
        platform = random.choice(PLATFORMS)
        item = random.choice(MENU_ITEMS)
        reviews.append(simulate_review(platform, item))
    return reviews


def aggregate_analysis(reviews):
    results = []
    for review in reviews:
        analysis = analyze_sentiment(
            text=review["text"],
            menu_item=review.get("menu_item"),
            platform=review.get("platform"),
            timestamp=review.get("timestamp")
        )
        results.append({
            "review": review,
            "analysis": analysis
        })
    return results


def summarize_results(analysis_results):
    insights = generate_insights(analysis_results)
    platform_breakdown = {}
    for result in analysis_results:
        platform = result["review"].get("platform")
        sentiment = result["analysis"].get("sentiment")
        platform_breakdown.setdefault(platform, {"positive": 0, "neutral": 0, "negative": 0})
        platform_breakdown[platform][sentiment] += 1

    menu_feedback = {}
    for result in analysis_results:
        item = result["review"].get("menu_item")
        sentiment = result["analysis"].get("sentiment")
        menu_feedback.setdefault(item, {"positive": 0, "neutral": 0, "negative": 0})
        menu_feedback[item][sentiment] += 1

    return {
        "platform_breakdown": platform_breakdown,
        "menu_feedback": menu_feedback,
        "insights": insights
    }


if __name__ == "__main__":
    print("Generating simulated reviews for Chick-In Waffle...")
    reviews = generate_reviews(50)
    print(f"Generated {len(reviews)} reviews.")

    print("Analyzing sentiment...")
    analysis = aggregate_analysis(reviews)

    print("Summarizing results...")
    summary = summarize_results(analysis)

    print("\n--- Platform Breakdown ---")
    for platform, counts in summary["platform_breakdown"].items():
        print(f"{platform}: {counts}")

    print("\n--- Menu Feedback ---")
    for item, counts in summary["menu_feedback"].items():
        print(f"{item}: {counts}")

    print("\n--- Actionable Insights ---")
    for insight in summary["insights"]:
        print(f"- {insight}")
