from fastapi import FastAPI
from routes.analyze import router as analyze_router
from routes.fetch_and_analyze import router as fetch_router

app = FastAPI()
app.include_router(analyze_router, prefix="/analyze")
app.include_router(fetch_router)

@app.get("/")
def read_root():
    return {"message": "FlavorPulse backend is live!"}
