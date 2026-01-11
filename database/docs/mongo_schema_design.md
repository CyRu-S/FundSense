# MongoDB Schema Design

## Overview
The database uses a NoSQL document model optimized for high read performance and flexible data structures.

## Collections

### `users`
- **Purpose**: Internal user management and authentication.
- **Key Fields**: `email`, `password_hash`, `role`.
- **Embedded**: `favorites` (Array of Fund IDs).
- **Rationale**: Embedding favorites reduces the need for joins when loading user dashboards.

### `investor_profiles`
- **Purpose**: ML and analysis data for users.
- **Link**: Referenced by `user_id` (1:1 with `users`).
- **Fields**: `risk_score`, `cluster_id`, `survey_responses` (flexible JSON).

### `mutual_funds`
- **Purpose**: Catalog of available funds.
- **Indexes**: `category`, `risk_level`, `returns_history.3y` (Compound indexes can be added as needed).

### `nav_history`
- **Type**: Time Series Collection (MongoDB 5.0+).
- **Meta Field**: `fund_id`
- **Time Field**: `date`
- **Rationale**: Optimized storage compression and query performance for time-series data.

### `audit_logs`
- **Type**: Capped Collection.
- **Rationale**: Automatically removes old logs to maintain fixed storage size (FIFO).

## Patterns Used
1.  **Bucket Pattern** (via Time Series): Efficiently stores daily NAVs.
2.  **Subset Pattern**: Only recent recommendations are kept active; older ones can be archived if needed (or just kept in the main collection with an index).
3.  **Extended Reference**: In `recommendations`, we reference `fund_id` but might embed `fund_name` if needed to avoid joins on list views (currently not strictly enforced).
