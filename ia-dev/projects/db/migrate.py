#!/usr/bin/env python3
"""Database migration runner"""

import os
import sqlite3
from pathlib import Path

def run_migrations():
    """Execute all pending migrations"""
    db_path = "app.db"
    migrations_dir = Path("db/migration")
    
    # Create database connection
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create migrations table if not exists
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY,
            filename VARCHAR(255) UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Get executed migrations
    cursor.execute("SELECT filename FROM migrations")
    executed = {row[0] for row in cursor.fetchall()}
    
    # Run pending migrations
    migration_files = sorted(migrations_dir.glob("*.sql"))
    
    for migration_file in migration_files:
        if migration_file.name not in executed:
            print(f"Running migration: {migration_file.name}")
            
            with open(migration_file, 'r') as f:
                sql = f.read()
            
            cursor.executescript(sql)
            cursor.execute("INSERT INTO migrations (filename) VALUES (?)", (migration_file.name,))
            conn.commit()
            
            print(f"✓ Migration {migration_file.name} completed")
    
    conn.close()
    print("All migrations completed!")

if __name__ == "__main__":
    run_migrations()