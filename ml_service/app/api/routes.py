from fastapi import APIRouter, HTTPException, Depends
from typing import List
import pandas as pd
import os
from app.schemas.models import (
    UserSurvey, UserProfile, FundItem, RecommendationResponse,
    ClusterResponse, ForecastRequest, ForecastResponse, ExplanationRequest, ExplanationResponse
)
from app.ml.clustering import InvestorClustering
from app.ml.recommender import FundRecommender
from app.ml.forecasting import NAVForecaster
from app.core.config import settings

api_router = APIRouter()

# Global instances (lazy load would be better in prod)
clustering_model = InvestorClustering()
recommender = FundRecommender()
forecaster = NAVForecaster()

# Load recommender data on startup if available
data_path = os.path.join("data", "funds.csv")
if os.path.exists(data_path):
    recommender.load_data(data_path)

@api_router.post("/ml/cluster", response_model=ClusterResponse)
def predict_cluster(survey: UserSurvey):
    """Predict investor cluster based on survey."""
    data = survey.model_dump()
    try:
        cluster_id = clustering_model.predict(data)
    except Exception as e:
        # If model not trained, return mock or error
        # For demo, if load fails, we can mock or raise
        if not clustering_model.model:
             # creating a simple fallback for demo purposes if model isn't trained yet
             cluster_id = data['risk_appetite'] % 4 
        else:
             raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")
             
    risk_map = {0: "Conservative", 1: "Moderate", 2: "Aggressive", 3: "Very Aggressive"}
    return ClusterResponse(cluster_id=cluster_id, risk_segment=risk_map.get(cluster_id, "Unknown"))

@api_router.post("/ml/recommend", response_model=RecommendationResponse)
def recommend_funds(user_id: str, survey: UserSurvey):
    """Recommend funds based on profile."""
    # We use survey data as profile proxy here
    try:
        recs = recommender.recommend(survey.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    return RecommendationResponse(user_id=user_id, recommended_funds=recs)

@api_router.post("/ml/forecast-nav", response_model=ForecastResponse)
def forecast_nav(req: ForecastRequest):
    """Forecast NAV for a fund."""
    # In real scenario, we'd fetch history from DB. Here we generate/mock.
    from app.services.data_gen import generate_nav_history
    hist_df = generate_nav_history(req.fund_id)
    history = hist_df['nav'].values.tolist()
    
    forecast, lower, upper = forecaster.predict(history, req.days)
    
    dates = [str(d.date()) for d in pd.date_range(start=pd.Timestamp.now(), periods=req.days)]
    
    return ForecastResponse(
        fund_id=req.fund_id,
        forecast_dates=dates,
        forecast_values=forecast,
        confidence_lower=lower,
        confidence_upper=upper
    )

@api_router.post("/ml/explain", response_model=ExplanationResponse)
def explain_fund_choice(req: ExplanationRequest):
    """Explain why a fund was recommended using LLM."""
    # Placeholder for LLM call
    text = f"We recommended Fund {req.fund_id} because it aligns with your risk tolerance and has shown consistent performance over the last 3 years."
    return ExplanationResponse(fund_id=req.fund_id, explanation=text)
