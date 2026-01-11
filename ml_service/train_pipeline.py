import os
import pandas as pd
from app.services.data_gen import generate_users, generate_funds

DATA_DIR = "data"

def run_data_generation():
    print("Generating synthetic data...")
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        
    users = generate_users(2000)
    funds = generate_funds(500)
    
    users.to_csv(os.path.join(DATA_DIR, 'users.csv'), index=False)
    funds.to_csv(os.path.join(DATA_DIR, 'funds.csv'), index=False)
    
    print(f"Data saved to {DATA_DIR}/users.csv and {DATA_DIR}/funds.csv")

    # Train Clustering Model
    print("Training Investor Segmentation Model...")
    from app.ml.clustering import InvestorClustering
    clustering = InvestorClustering()
    try:
        clustering.train(users)
        print("Clustering model trained and saved.")
    except Exception as e:
        print(f"Failed to train clustering model: {e}")

if __name__ == "__main__":
    run_data_generation()
