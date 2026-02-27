"""
Fetches total user count from Google Analytics 4 Data API.
Adds a base offset of 2000 and writes results to public/stats/ga-stats.json.

Required environment variables:
  GA_PROPERTY_ID          - Numeric GA4 property ID (e.g. "123456789")
  GA_SERVICE_ACCOUNT_JSON - Full JSON content of the service account key file
"""

import json
import os
import sys
from datetime import datetime, timezone


def fetch_ga_stats() -> dict:
    property_id = os.environ.get("GA_PROPERTY_ID", "").strip()
    service_account_json = os.environ.get("GA_SERVICE_ACCOUNT_JSON", "").strip()

    if not property_id or not service_account_json:
        print("❌  Missing GA_PROPERTY_ID or GA_SERVICE_ACCOUNT_JSON env vars")
        return _fallback_stats()

    try:
        from google.oauth2 import service_account
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Metric,
            RunReportRequest,
        )

        credentials_info = json.loads(service_account_json)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=["https://www.googleapis.com/auth/analytics.readonly"],
        )

        client = BetaAnalyticsDataClient(credentials=credentials)

        request = RunReportRequest(
            property=f"properties/{property_id}",
            metrics=[Metric(name="totalUsers")],
            date_ranges=[DateRange(start_date="2020-01-01", end_date="today")],
        )

        response = client.run_report(request)

        raw_users = 0
        if response.rows:
            raw_users = int(response.rows[0].metric_values[0].value)

        BASE_OFFSET = 2000
        display_count = raw_users + BASE_OFFSET

        stats = {
            "totalVisitors": display_count,
            "rawGAUsers": raw_users,
            "baseOffset": BASE_OFFSET,
            "lastUpdated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "source": "google-analytics",
        }

        print(f"✅  GA users: {raw_users}  →  display count: {display_count}")
        return stats

    except Exception as exc:
        print(f"❌  Error fetching GA stats: {exc}")
        return _fallback_stats()


def _fallback_stats() -> dict:
    return {
        "totalVisitors": 2000,
        "rawGAUsers": 0,
        "baseOffset": 2000,
        "lastUpdated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": "fallback",
    }


def main() -> None:
    stats = fetch_ga_stats()

    out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "stats")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "ga-stats.json")

    with open(out_path, "w") as f:
        json.dump(stats, f, indent=2)

    print(f"📄  Written to {os.path.abspath(out_path)}")

    if stats["source"] == "fallback":
        sys.exit(1)


if __name__ == "__main__":
    main()
