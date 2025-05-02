from fastapi import APIRouter, Request, Query
import sys
import os

# Add backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sentiment_analyzer import analyze_reviews

router = APIRouter()

@router.post("/api/analyze")
async def analyze(request: Request, mode: str = Query("real", enum=["demo", "real"])):
    payload = await request.json()

    if mode == "demo":
        demo_reviews = [{
            "text": "The chicken and waffles were amazing, but the service was slow.",
            "date": "2025-04-20"
        }]
        result = analyze_reviews(demo_reviews)
    else:
        reviews = payload.get("reviews")
        if not reviews:
            return {"error": "Missing 'reviews' in request body for real mode"}
        result = analyze_reviews(reviews)

    return {"result": result}
