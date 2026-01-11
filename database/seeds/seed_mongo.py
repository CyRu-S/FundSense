import random
import uuid
from datetime import datetime, timedelta
import faker
import json
import pymongo
from pymongo import MongoClient

# Setup
fake = faker.Faker()
FUNDS_COUNT = 550
USERS_COUNT = 100
ADMIN_COUNT = 5
ANALYST_COUNT = 2

# Connect to MongoDB
# Assuming localhost for script execution, or override from env
client = MongoClient("mongodb://localhost:27017/")
db = client["mutual_fund_db"]

# Constants
CATEGORIES = ['EQUITY', 'DEBT', 'HYBRID', 'INDEX']
SUB_CATEGORIES = {
    'EQUITY': ['Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap', 'ELSS'],
    'DEBT': ['Liquid Fund', 'Overnight Fund', 'Gilt Fund', 'Corporate Bond'],
    'HYBRID': ['Aggressive Hybrid', 'Conservative Hybrid', 'Arbitrage Fund'],
    'INDEX': ['Nifty 50', 'Nifty Next 50', 'Sensex', 'Bank Nifty']
}
RISK_LEVELS = ['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']
FUND_HOUSES = ['HDFC Mutual Fund', 'SBI Mutual Fund', 'ICICI Prudential', 'Axis Mutual Fund', 'Kotak Mahindra', 'Nippon India', 'UTI Mutual Fund']
INVESTMENT_GOALS = ['WEALTH_CREATION', 'RETIREMENT', 'TAX_SAVING', 'INCOME']
TIMELINES = ['SHORT', 'MEDIUM', 'LONG']
CLUSTERS = ['Conservative Saver', 'Balanced Planner', 'Aggressive Grower', 'HNI']

def generate_seed_data():
    print("Clearing existing data...")
    db.users.delete_many({})
    db.investor_profiles.delete_many({})
    db.mutual_funds.delete_many({})
    db.nav_history.delete_many({})
    db.recommendations.delete_many({})
    db.audit_logs.delete_many({})

    print("Seeding Users...")
    users_docs = []
    # Admins
    for i in range(ADMIN_COUNT):
        users_docs.append({
            'email': f'admin{i+1}@example.com',
            'password_hash': 'hashed_pass',
            'role': 'ADMIN',
            'is_active': True,
            'favorites': [],
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        })
    
    # Analysts
    for i in range(ANALYST_COUNT):
        users_docs.append({
            'email': f'analyst{i+1}@example.com',
            'password_hash': 'hashed_pass',
            'role': 'ANALYST',
            'is_active': True,
            'favorites': [],
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        })
        
    # Investors
    investors = []
    for i in range(USERS_COUNT):
        u = {
            'email': fake.email(),
            'password_hash': 'hashed_pass',
            'role': 'INVESTOR',
            'is_active': True,
            'favorites': [],
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        users_docs.append(u)
        investors.append(u) # Keep track for profiles linked by email for now or insert and get ID
        
    result_users = db.users.insert_many(users_docs)
    print(f"Inserted {len(result_users.inserted_ids)} users")
    
    # Map inserted IDs back to investor list for profile creation
    # Pymongo insert_many returns ids in order
    all_ids = result_users.inserted_ids
    # admin + analyst count
    investor_start_idx = ADMIN_COUNT + ANALYST_COUNT
    
    print("Seeding Profiles...")
    profiles_docs = []
    for i in range(USERS_COUNT):
        user_id = all_ids[investor_start_idx + i]
        profiles_docs.append({
            'user_id': user_id,
            'risk_score': round(random.uniform(1, 9.5), 2),
            'cluster_id': random.choice(CLUSTERS),
            'investment_goal': random.choice(INVESTMENT_GOALS),
            'investment_timeline': random.choice(TIMELINES),
            'survey_responses': {"q1": "a", "q2": "b"}
        })
    db.investor_profiles.insert_many(profiles_docs)
    
    print("Seeding Mutual Funds...")
    funds_docs = []
    for i in range(FUNDS_COUNT):
        cat = random.choice(CATEGORIES)
        sub = random.choice(SUB_CATEGORIES[cat])
        house = random.choice(FUND_HOUSES)
        
        funds_docs.append({
            'name': f"{house} {sub} Fund - Growth",
            'category': cat,
            'sub_category': sub,
            'fund_house': house,
            'risk_level': random.choice(RISK_LEVELS),
            'current_nav': round(random.uniform(10, 500), 4),
            'expense_ratio': round(random.uniform(0.1, 2.5), 2),
            'aum': random.randint(100, 50000),
            'returns_history': {
                '1y': round(random.uniform(-5, 30), 2),
                '3y': round(random.uniform(0, 50), 2),
                '5y': round(random.uniform(5, 80), 2)
            },
            'min_investment': random.choice([100, 500, 1000, 5000]),
            'fund_manager': fake.name(),
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        })
        
    result_funds = db.mutual_funds.insert_many(funds_docs)
    fund_ids = result_funds.inserted_ids
    print(f"Inserted {len(fund_ids)} funds")

    print("Seeding NAV History (Time Series)...")
    nav_docs = []
    today = datetime.now()
    
    for fid in fund_ids:
        # Generate 30 days history
        base_nav = round(random.uniform(10, 500), 4)
        for d in range(30):
            date_val = today - timedelta(days=d)
            nav_val = round(base_nav * (1 + random.uniform(-0.01, 0.01)), 4)
            nav_docs.append({
                'fund_id': fid,
                'date': date_val,
                'nav': nav_val
            })
            base_nav = nav_val
            
    # Batch insert for NAVs
    # In a real TS collection, this is very efficient
    if nav_docs:
        db.nav_history.insert_many(nav_docs)
    print(f"Inserted {len(nav_docs)} NAV entries")
    
    print("Seeding Recommendations...")
    recs_docs = []
    # Generate some random recs
    for i in range(200):
        recs_docs.append({
            'user_id': random.choice(all_ids),
            'fund_id': random.choice(fund_ids),
            'score': round(random.uniform(60, 99), 2),
            'reason': "Good fit for risk profile",
            'model_version': 'v1.0',
            'created_at': datetime.now()
        })
    db.recommendations.insert_many(recs_docs)

    print("Seeding completed successfully!")

if __name__ == "__main__":
    try:
        generate_seed_data()
    except Exception as e:
        print(f"Error seeding data: {e}")
        print("Ensure MongoDB is running and you have pymongo installed: pip install pymongo faker")
