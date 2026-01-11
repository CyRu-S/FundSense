from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="FundSense ML Service", version="0.1.0")

class SurveyResponse(BaseModel):
    user_id: str
    risk_score: int
    investment_goal: str

@app.get("/")
def read_root():
    return {"message": "Welcome to FundSense ML Service"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/recommend")
def recommend_funds(survey: SurveyResponse):
    # Placeholder for recommendation logic
    return {
        "user_id": survey.user_id,
        "recommendations": [
            {"fund_name": "Axis Bluechip Fund", "reason": "Matches high risk profile"},
            {"fund_name": "SBI Small Cap Fund", "reason": "High growth potential"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
