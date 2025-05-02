from fastapi import FastAPI
from pydantic import BaseModel
from sentiment_analyzer import analyze_sentiment, generate_insights

app = FastAPI()

class Review(BaseModel):
    text: str
    date: str

class ReviewsRequest(BaseModel):
    reviews: list[Review]

@app.post("/analyze")
def analyze_sentiment_endpoint(request: ReviewsRequest):
    reviews_list = [{"text": r.text, "date": r.date} for r in request.reviews]
    result = [analyze_sentiment(review["text"]) for review in reviews_list]
    return result

@app.get("/")
def read_root():
    return {"message": "FlavorPulse API is running!"}

@app.post("/insights")
def generate_insights_endpoint(request: ReviewsRequest):
    reviews_list = [{"text": r.text, "date": r.date} for r in request.reviews]
    analysis_results = [{"review": review, "analysis": analyze_sentiment(review["text"])} for review in reviews_list]
    insights = generate_insights(analysis_results)
    return {"insights": insights}
