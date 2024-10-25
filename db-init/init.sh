#!/bin/bash
# Dumps external db to local db
PGPASSWORD=SOMEPASSWORD pg_dump -C -h ep-noisy-rain-a99999kw.us-west-2.aws.neon.tech -U neondb_owner neondb | psql -U neondb_owner postgres