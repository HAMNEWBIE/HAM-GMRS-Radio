#!/usr/bin/env python3
"""Refresh repos-data.json from the GitHub API.

Reads the curated list in repos.json, fetches stars and last-push for each
repository, and writes repos-data.json for repos.html to render. Pure
standard library. On a per-repo failure, the previous values are kept so a
flaky API run never blanks the page.

Auth: set GITHUB_TOKEN to raise the rate limit (the Actions workflow does).
"""
import json
import os
import sys
import urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "repos.json")
OUT = os.path.join(ROOT, "repos-data.json")


def fetch(repo):
    req = urllib.request.Request(
        "https://api.github.com/repos/" + repo,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "amrad-repos-page",
        },
    )
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def main():
    with open(SRC) as f:
        curated = json.load(f)

    previous = {}
    if os.path.exists(OUT):
        try:
            with open(OUT) as f:
                for cat in json.load(f).get("categories", []):
                    for entry in cat.get("repos", []):
                        previous[entry["repo"]] = entry
        except Exception:
            pass

    failures = 0
    out = {"generated": datetime.now(timezone.utc).strftime("%Y-%m-%d"), "categories": []}
    for cat in curated["categories"]:
        rows = []
        for item in cat["repos"]:
            entry = {
                "repo": item["repo"],
                "url": "https://github.com/" + item["repo"],
                "desc": item["desc"],
                "stars": None,
                "pushed": None,
                "archived": False,
            }
            try:
                data = fetch(item["repo"])
                entry["stars"] = data.get("stargazers_count")
                entry["pushed"] = (data.get("pushed_at") or "")[:10] or None
                entry["archived"] = bool(data.get("archived"))
                entry["url"] = data.get("html_url") or entry["url"]
            except Exception as e:
                failures += 1
                old = previous.get(item["repo"])
                if old:
                    entry["stars"] = old.get("stars")
                    entry["pushed"] = old.get("pushed")
                    entry["archived"] = old.get("archived", False)
                print("warn: %s: %s (kept previous values)" % (item["repo"], e), file=sys.stderr)
            rows.append(entry)
        out["categories"].append({"title": cat["title"], "tag": cat["tag"], "repos": rows})

    with open(OUT, "w") as f:
        json.dump(out, f, indent=1)
        f.write("\n")
    total = sum(len(c["repos"]) for c in out["categories"])
    print("wrote %s: %d repos, %d fetch failures" % (OUT, total, failures))
    # All-failed means the API was unreachable; keep the old file meaningful
    # by failing the run so the workflow does not commit a no-op timestamp.
    if failures == total:
        sys.exit(1)


if __name__ == "__main__":
    main()
