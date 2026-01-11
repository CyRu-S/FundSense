import numpy as np
import pandas as pd
from typing import List, Tuple
# Import tensorflow conditionally to avoid crashing if not installed in some envs
try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import LSTM, Dense
except ImportError:
    tf = None

class NAVForecaster:
    def __init__(self):
        self.model = None
        self.window_size = 90
        
    def build_model(self):
        if not tf:
            print("TensorFlow not available")
            return
        self.model = Sequential([
            LSTM(50, activation='relu', input_shape=(self.window_size, 1)),
            Dense(1)
        ])
        self.model.compile(optimizer='adam', loss='mae')
        
    def train(self, history: List[float]):
        if not self.model:
            self.build_model()
        if not self.model: return 
        
        X, y = self._prepare_data(history)
        if len(X) == 0: return
        self.model.fit(X, y, epochs=5, verbose=0)
        
    def predict(self, history: List[float], days: int = 7) -> Tuple[List[float], List[float], List[float]]:
        """Predict next 'days' NAVs. Returns (forecast, lower_bound, upper_bound)."""
        if not self.model:
             # Fallback if no TF
             return self._simple_forecast(history, days)
             
        # Iterative prediction
        current_sequence = list(history[-self.window_size:])
        forecast = []
        
        for _ in range(days):
            # Reshape for LSTM [1, window, 1]
            input_seq = np.array(current_sequence[-self.window_size:]).reshape(1, self.window_size, 1)
            pred = self.model.predict(input_seq, verbose=0)[0][0]
            forecast.append(float(pred))
            current_sequence.append(pred)
            
        # Dummy confidence intervals for demo
        lower = [v * 0.95 for v in forecast]
        upper = [v * 1.05 for v in forecast]
        return forecast, lower, upper
        
    def _prepare_data(self, data: List[float]):
        X, y = [], []
        for i in range(len(data) - self.window_size):
            X.append(data[i:i+self.window_size])
            y.append(data[i+self.window_size])
        return np.array(X).reshape(-1, self.window_size, 1), np.array(y)

    def _simple_forecast(self, history, days):
        """Fallback linear projection."""
        last = history[-1]
        trend = np.mean(np.diff(history[-30:])) if len(history) > 30 else 0
        forecast = [last + trend * (i+1) for i in range(days)]
        return forecast, [f*0.9 for f in forecast], [f*1.1 for f in forecast]
