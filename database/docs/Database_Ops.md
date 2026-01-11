# Database Operations & Performance Guide

## 1. Backup & Recovery

### Backup Strategy
We use a combination of daily full backups and continuous WAL archiving for Point-in-Time Recovery (PITR).

- **Tool**: `pgBackRest` or standard `pg_dump` + WAL archiving.
- **Destination**: Google Cloud Storage (GCS) bucket `gs://mutual-fund-platform-backups`.
- **Retention**: 30 Days.

#### Automated Daily Backup Script
```bash
#!/bin/bash
# Backup script to be run via cron daily at 02:00 UTC
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/tmp/db_backup_$TIMESTAMP.sql.gz"
GCS_BUCKET="gs://mutual-fund-platform-backups"

echo "Starting backup for $TIMESTAMP..."

# Dump database
pg_dump -h localhost -U postgres -d mutual_fund_db | gzip > $BACKUP_FILE

# Upload to GCS
gsutil cp $BACKUP_FILE $GCS_BUCKET

# Cleanup local
rm $BACKUP_FILE

echo "Backup completed and uploaded to $GCS_BUCKET"
```

### Recovery Procedure
**Point-in-Time Recovery (PITR)**
To recover to a specific timestamp (e.g., before a bad deployment):

1.  **Stop the Database**:
    ```bash
    sudo systemctl stop postgresql
    ```
2.  **Restore Base Backup**:
    Restore the latest base backup from GCS before the target time.
3.  **Configure Recovery**:
    Edit `postgresql.conf` or create `recovery.signal`:
    ```ini
    restore_command = 'gsutil cp gs://mutual-fund-platform-backups/wal/%f %p'
    recovery_target_time = '2025-10-25 14:30:00'
    ```
4.  **Start Database**:
    ```bash
    sudo systemctl start postgresql
    ```
    PostgreSQL will replay WAL files until the target time.

---

## 2. Performance Optimization

### Partitioning
- **Table**: `nav_history`
- **Strategy**: Range Partitioning by Year.
- **Reason**: This table grows rapidly (Funds * 365 rows/year). Partitioning allows faster queries on recent data and efficient archival of old data.
- **Maintenance**: Ensure new partitions are created before the new year starts.

### Materialized Views
- **View**: `fund_analytics_mv`
- **Refresh Strategy**: Hourly concurrent refresh.
- **Impact**: Pre-calculates complex aggregations (returns, risk metrics) for the dashboard, reducing load on the transactional tables.

### Connection Pooling
**HikariCP Configuration** (for Java/Spring services) or **PgBouncer** (generic):

- **Maximum Pool Size**: 10-20 connections per service instance.
- **Minimum Idle**: 5
- **Connection Timeout**: 30000ms
- **Idle Timeout**: 600000ms

**Recommended Postgres Settings**:
- `max_connections`: 200 (Adjust based on total service instances)
- `shared_buffers`: 25% of RAM
- `effective_cache_size`: 75% of RAM
- `work_mem`: 16MB (Monitor for temp file usage)

### Indexing Strategy
- **B-Tree**: Used for most equality and range queries (`category`, `risk_level`, `date`).
- **Partial Indexes**: Consider for active vs inactive users if table grows huge.
- **Monitoring**: Regularly run `pg_stat_user_indexes` to identify unused indexes.
