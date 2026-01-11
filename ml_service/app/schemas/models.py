from pydantic import BaseModel, Field
from typing import List, Optional, Literal

# --- User Schemas ---
class UserSurvey(BaseModel):
    age: int = Field(..., ge=18, le=100)
    income_level: float = Field(..., ge=0)
    risk_appetite: int = Field(..., ge=1, le=10, description="1-10 scale, 10 is highest risk")
    investment_horizon_years: int = Field(..., ge=1)
    goal_category: Literal["retirement", "wealth_creation", "education", "short_term"]
    
class UserProfile(BaseModel):
    user_id: str
    cluster_id: int
    risk_score: float
    
# --- Investment Schemas ---
class FundItem(BaseModel):
    fund_id: str
    fund_name: str
    category: str
    risk_level: str
    returns_3y: float
    expense_ratio: float
    recommendation_score: Optional[float] = None
    
class RecommendationResponse(BaseModel):
    user_id: str
    recommended_funds: List[FundItem]
    
# --- ML Inputs/Outputs ---
class ClusterResponse(BaseModel):
    cluster_id: int
    risk_segment: str 

class ForecastRequest(BaseModel):
    fund_id: str
    days: int = 7

class ForecastResponse(BaseModel):
    fund_id: str
    forecast_dates: List[str]
    forecast_values: List[float]
    confidence_lower: List[float]
    confidence_upper: List[float]

class ExplanationRequest(BaseModel):
    user_id: str
    fund_id: str

class ExplanationResponse(BaseModel):
    fund_id: str
    explanation: str
