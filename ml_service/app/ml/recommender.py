import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

class FundRecommender:
    def __init__(self):
        self.funds_df = None
        self.similarity_matrix = None
        
    def load_data(self, funds_path: str):
        self.funds_df = pd.read_csv(funds_path)
        # Precompute similarity if needed
        # Simple content features: risk_level (mapped), returns, expense
        # For demo, we compute similarity on numerical features
        features = self.funds_df[['returns_1y', 'returns_3y', 'expense_ratio']].fillna(0)
        self.similarity_matrix = cosine_similarity(features)

    def recommend(self, user_profile: dict, top_k: int = 5) -> List[Dict]:
        """
        Hybrid recommendation:
        1. Filter by risk compatibility.
        2. Rank by performance/score.
        """
        if self.funds_df is None:
            raise ValueError("Fund data not loaded")
            
        # 1. Rule-based Filter
        # Map user risk (1-10) to accepted fund risk levels
        risk_score = user_profile.get('risk_appetite', 5)
        allowed_risks = []
        if risk_score <= 3:
            allowed_risks = ['Low']
        elif risk_score <= 6:
            allowed_risks = ['Low', 'Moderate']
        elif risk_score <= 8:
            allowed_risks = ['Moderate', 'High']
        else:
            allowed_risks = ['High', 'Very High']
            
        candidates = self.funds_df[self.funds_df['risk_level'].isin(allowed_risks)].copy()
        
        if candidates.empty:
            # Fallback
            candidates = self.funds_df.copy()
            
        # 2. Scoring (Simple weighted score for demo)
        # Higher returns + Lower expense = Better
        candidates['score'] = (
            candidates['returns_3y'] * 0.7 + 
            candidates['returns_1y'] * 0.3 - 
            candidates['expense_ratio'] * 2
        )
        
        # Sort and take top K
        recs = candidates.sort_values('score', ascending=False).head(top_k)
        
        return recs.to_dict(orient='records')
