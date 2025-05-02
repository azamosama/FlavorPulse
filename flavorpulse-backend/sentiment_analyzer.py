# sentiment_analyzer_local.py

from textblob import TextBlob

def analyze_sentiment(text, menu_item=None, platform=None, timestamp=None):
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    sentiment = "positive" if polarity > 0 else "negative" if polarity < 0 else "neutral"
    
    return {
        "text": text,
        "sentiment": sentiment,
        "polarity": polarity,
        "menu_item": menu_item,
        "platform": platform,
        "timestamp": timestamp
    }

def generate_insights(analysis_results):
    # Optional: simple insights
    most_positive_item = None
    most_positive_score = -1

    for result in analysis_results:
        if result['analysis']['sentiment'] == "positive" and result['analysis']['polarity'] > most_positive_score:
            most_positive_score = result['analysis']['polarity']
            most_positive_item = result['review']['menu_item']

    insights = []
    if most_positive_item:
        insights.append(f"Customers love the {most_positive_item}! Consider highlighting it more in promotions.")

    return insights
