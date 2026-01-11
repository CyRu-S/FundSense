# MongoDB Operations Guide

## 1. Backup & Recovery

### Backup Strategy
We use `mongodump` for logical backups and Atlas Backups (if using MongoDB Atlas) for continuous protection.

#### Manual Backup (Logical)
```bash
# Dump the entire database
mongodump --uri="mongodb://localhost:27017/mutual_fund_db" --out=./backups/$(date +%Y%m%d)

# Dump specific collection
mongodump --uri="mongodb://localhost:27017/mutual_fund_db" --collection=users --out=./backups/users_only
```

#### Restore Procedure
```bash
# Restore entire database
mongorestore --uri="mongodb://localhost:27017/mutual_fund_db" ./backups/20250110/mutual_fund_db

# Restore specific collection
mongorestore --uri="mongodb://localhost:27017/mutual_fund_db" --collection=users ./backups/users_only/mutual_fund_db/users.bson
```

### Point-in-Time Recovery
If using MongoDB Atlas or Ops Manager, PITR is enabled via the Oplog. Ensure your Oplog size is sufficient (e.g., 5-10% of disk space) to hold the desired window of changes if managing self-hosted.

## 2. Performance Optimization

### Indexing Strategy
- **Compound Indexes**:
    - `mutual_funds`: `{ category: 1, risk_level: 1 }` - Optimizes filtering by both fields.
    - `nav_history`: `{ fund_id: 1, date: -1 }` - Essential for retrieving latest NAVs.
- **Unique Indexes**:
    - `users`: `{ email: 1 }`
    - `investor_profiles`: `{ user_id: 1 }`

### Schema Validation
- **Enforcement**: Validation rules are applied at the collection level (see `create_collections.js`).
- **Strictness**: Checks for required fields and data types.
- **Updates**: To update validation rules, use the `collMod` command:
  ```javascript
  db.runCommand({
     collMod: "users",
     validator: { ...new rules... }
  })
  ```

### Data Lifecycle
- **Audit Logs**: Uses a Capped Collection to automatically overwrite old logs when the size limit (100MB) is reached.
- **NAV History**: Uses Time Series collections (Mongo 5.0+) which are optimized for storage efficiency and date-based queries.
