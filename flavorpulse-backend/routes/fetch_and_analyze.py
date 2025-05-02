# route/fetch_and_analyze.py
import asyncio
from concurrent.futures import ThreadPoolExecutor
from fastapi import APIRouter, Query
from sentiment_analyzer import analyze_reviews
from scraper import scrape_reviews  # <- this is your puppeteer wrapper or API

executor = ThreadPoolExecutor()

router = APIRouter()

@router.get("/api/fetch-and-analyze")
async def fetch_and_analyze(
    restaurant: str = Query("Chick-In Waffle"),
    location: str = Query("Kansas City")
):
    try:
        # Scrape live reviews
        reviews = scrape_reviews(restaurant=restaurant, location=location, limit=10)
        
        # Analyze them
        analyzed = analyze_reviews(reviews)

        return {"reviews": analyzed}
    except Exception as e:
        return {"error": str(e)}
