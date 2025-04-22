from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "FlavorPulse backend is running"}
