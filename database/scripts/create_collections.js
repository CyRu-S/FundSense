/*
 * MongoDB Schema Initialization Script
 * Run with: mongosh "mongodb://localhost:27017/mutual_fund_db" create_collections.js
 */

const dbName = 'mutual_fund_db';
const db = db.getSiblingDB(dbName);

// 1. Users Collection
db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password_hash", "role", "is_active", "created_at"],
            properties: {
                email: {
                    bsonType: "string",
                    pattern: "^.+@.+$",
                    description: "must be a valid email string and is required"
                },
                password_hash: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                role: {
                    enum: ["ADMIN", "INVESTOR", "ANALYST"],
                    description: "can only be one of the enum values and is required"
                },
                is_active: {
                    bsonType: "bool",
                    description: "must be a boolean"
                },
                favorites: {
                    bsonType: "array",
                    items: {
                        bsonType: "objectId"
                    }
                },
                created_at: {
                    bsonType: "date"
                },
                updated_at: {
                    bsonType: "date"
                }
            }
        }
    }
});

db.users.createIndex({ "email": 1 }, { unique: true });

// 2. Investor Profiles Collection
db.createCollection("investor_profiles", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "risk_score"],
            properties: {
                user_id: {
                    bsonType: "objectId",
                    description: "must be an ObjectId referencing a user"
                },
                risk_score: {
                    bsonType: "double",
                    minimum: 0,
                    maximum: 10,
                    description: "must be a double between 0 and 10"
                },
                investment_goal: {
                    enum: ["WEALTH_CREATION", "RETIREMENT", "TAX_SAVING", "INCOME", null]
                },
                investment_timeline: {
                    enum: ["SHORT", "MEDIUM", "LONG", null]
                },
                survey_responses: {
                    bsonType: "object"
                }
            }
        }
    }
});

db.investor_profiles.createIndex({ "user_id": 1 }, { unique: true });

// 3. Mutual Funds Collection
db.createCollection("mutual_funds", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "category", "risk_level"],
            properties: {
                name: {
                    bsonType: "string"
                },
                category: {
                    enum: ["EQUITY", "DEBT", "HYBRID", "INDEX"]
                },
                risk_level: {
                    enum: ["LOW", "MODERATE", "HIGH", "VERY_HIGH"]
                },
                current_nav: {
                    bsonType: "double"
                },
                expense_ratio: {
                    bsonType: "double",
                    minimum: 0
                },
                returns_history: {
                    bsonType: "object",
                    properties: {
                        "1y": { bsonType: "double" },
                        "3y": { bsonType: "double" },
                        "5y": { bsonType: "double" }
                    }
                }
            }
        }
    }
});

db.mutual_funds.createIndex({ "category": 1 });
db.mutual_funds.createIndex({ "risk_level": 1 });
db.mutual_funds.createIndex({ "returns_history.3y": -1 });

// 4. NAV History (Time Series or Bucket Pattern)
// We will use standard Time Series collection features available in MongoDB 5.0+
try {
    db.createCollection("nav_history", {
        timeseries: {
            timeField: "date",
            metaField: "fund_id",
            granularity: "hours" // 'hours' or 'days' usually fine for daily NAV
        }
    });
} catch (e) {
    print("Time series collection might already exist or not supported, skipping creation.");
}

db.nav_history.createIndex({ "fund_id": 1, "date": -1 });

// 5. Recommendations Collection
db.createCollection("recommendations", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "fund_id", "score"],
            properties: {
                user_id: { bsonType: "objectId" },
                fund_id: { bsonType: "objectId" },
                score: { bsonType: "double", minimum: 0, maximum: 100 }
            }
        }
    }
});

db.recommendations.createIndex({ "user_id": 1, "created_at": -1 });

// 6. Audit Logs (Capped Collection)
// Fixed size: 100MB or 100,000 documents
db.createCollection("audit_logs", {
    capped: true,
    size: 104857600, // 100 MB
    max: 100000
});

print("Collections created successfully with validation rules.");
