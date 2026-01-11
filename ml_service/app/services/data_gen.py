import pandas as pd
import numpy as np
import random
from typing import List

def generate_users(n: int = 1000) -> pd.DataFrame:
    """Generate synthetic user profiles."""
    np.random.seed(42)
    data = {
        'user_id': [f'u_{i}' for i in range(n)],
        'age': np.random.randint(18, 70, n),
        'income_level': np.random.exponential(50000, n) + 20000, # Skewed income
        'risk_appetite': np.random.randint(1, 11, n), # 1-10
        'investment_horizon_years': np.random.randint(1, 30, n),
        'goal_category': np.random.choice(['retirement', 'wealth_creation', 'education', 'short_term'], n)
    }
    df = pd.DataFrame(data)
    return df

def generate_funds(n: int = 500) -> pd.DataFrame:
    """Generate synthetic mutual fund data."""
    np.random.seed(42)
    categories = ['Equity', 'Debt', 'Hybrid', 'Index']
    risk_levels = ['Low', 'Moderate', 'High', 'Very High']
    
    data = {
        'fund_id': [f'f_{i}' for i in range(n)],
        'fund_name': [f'Fund {i} {np.random.choice(categories)}' for i in range(n)],
        'category': np.random.choice(categories, n),
        'risk_level': np.random.choice(risk_levels, n),
        'expense_ratio': np.random.uniform(0.1, 2.5, n),
        'returns_1y': np.random.normal(12, 10, n),
        'returns_3y': np.random.normal(10, 8, n),
        'returns_5y': np.random.normal(9, 6, n),
    }
    df = pd.DataFrame(data)
    mask_high = df['risk_level'].isin(['High', 'Very High'])
    df.loc[mask_high, 'returns_1y'] += np.random.normal(2, 5, mask_high.sum())
    return df

def generate_nav_history(fund_id: str, days: int = 90) -> pd.DataFrame:
    """Generate random walk NAV for a fund."""
    start_price = 100
    returns = np.random.normal(0.0005, 0.01, days)
    prices = [start_price]
    for r in returns:
        prices.append(prices[-1] * (1 + r))
    dates = pd.date_range(end=pd.Timestamp.now(), periods=days+1)
    return pd.DataFrame({'date': dates, 'nav': prices, 'fund_id': fund_id})
