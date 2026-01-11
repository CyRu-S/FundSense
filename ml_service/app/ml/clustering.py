import pickle
import os
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from app.core.config import settings

class InvestorClustering:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.model_path = os.path.join(settings.MODEL_PATH, "kmeans.pkl")
        self.scaler_path = os.path.join(settings.MODEL_PATH, "scaler.pkl")
        self.load_model()

    def train(self, df: pd.DataFrame, n_clusters: int = 4):
        """Train KMeans on user profile features."""
        # Features: age, income, risk_appetite, horizon
        features = df[['age', 'income_level', 'risk_appetite', 'investment_horizon_years']]
        
        self.scaler = StandardScaler()
        scaled_features = self.scaler.fit_transform(features)
        
        self.model = KMeans(n_clusters=n_clusters, random_state=42)
        self.model.fit(scaled_features)
        
        self.save_model()
        return self.model.labels_

    def predict(self, user_data: dict) -> int:
        """Predict cluster for a single user."""
        if not self.model or not self.scaler:
            raise ValueError("Model not trained or loaded")
            
        df = pd.DataFrame([user_data])
        # Ensure columns match training
        features = df[['age', 'income_level', 'risk_appetite', 'investment_horizon_years']]
        scaled = self.scaler.transform(features)
        return int(self.model.predict(scaled)[0])

    def save_model(self):
        if not os.path.exists(settings.MODEL_PATH):
            os.makedirs(settings.MODEL_PATH)
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.model, f)
        with open(self.scaler_path, 'wb') as f:
            pickle.dump(self.scaler, f)

    def load_model(self):
        if os.path.exists(self.model_path) and os.path.exists(self.scaler_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
            with open(self.scaler_path, 'rb') as f:
                self.scaler = pickle.load(f)
