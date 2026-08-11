#!/usr/bin/env python3
"""Scout GitHub for new repo candidates and propose them in an issue.

Searches radio-related topics for active, well-starred repositories that are
not already on the site and have never been proposed before, then opens a
GitHub issue listing them for a human to accept or ignore. Nothing this
script finds ever reaches the published page on its own; accepting a
candidate is a hand edit to repos.json.

State: scout-seen.json records every repo ever proposed, so an ignored
candidate is not proposed again. Pure standard library.

Env: GITHUB_TOKEN (required for the search API rate limit),
GITHUB_REPOSITORY like "WSNJ234/amrad" (set by Actions). With DRY_RUN=1 the
issue body is printed instead of posted and no state is saved.
"""
import json
import os
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

TOPICS = [
    "ham-radio", "amateur-radio", "hamradio",
    "sdr", "software-defined-radio", "rtl-sdr",
    "aprs", "meshtastic", "meshcore", "gmrs",
]
MIN_STARS = 300
ACTIVE_DAYS = 60
MAX_PROPOSALS = 30

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "repos.json")
SEEN = os.path.join(ROOT, "scout-seen.json")


def api(url, payload=None):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode() if payload is not None else None,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "amrad-repo-scout",
            **({"Content-Type": "application/json"} if payload is not None else {}),
        },
    )
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        req.add_header("Authorization", "Bearer " + token)
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def search(topic, cutoff):
    q = "topic:%s stars:>=%d pushed:>%s fork:false archived:false" % (topic, MIN_STARS, cutoff)
    url = ("https://api.github.com/search/repositories?q=%s&sort=stars&order=desc&per_page=50"
           % urllib.parse.quote(q))
    return api(url).get("items", [])


def main():
    dry = os.environ.get("DRY_RUN") == "1"

    with open(SRC) as f:
        curated = json.load(f)
    listed = set()
    for cat in curated["categories"]:
        for entry in cat["repos"]:
            listed.add(entry["repo"].lower())

    seen = []
    if os.path.exists(SEEN):
        with open(SEEN) as f:
            seen = json.load(f)
    seen_set = {s.lower() for s in seen}

    cutoff = (datetime.now(timezone.utc) - timedelta(days=ACTIVE_DAYS)).strftime("%Y-%m-%d")
    found = {}
    for topic in TOPICS:
        try:
            for item in search(topic, cutoff):
                full = item["full_name"]
                key = full.lower()
                if key in listed or key in seen_set or key in found:
                    continue
                found[key] = item
        except Exception as e:
            print("warn: search %s: %s" % (topic, e), file=sys.stderr)

    candidates = sorted(found.values(), key=lambda i: i["stargazers_count"], reverse=True)
    candidates = candidates[:MAX_PROPOSALS]
    if not candidates:
        print("No new candidates this week.")
        return

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    lines = [
        "The weekly scout found repositories that clear the bar "
        "(%d+ stars, pushed in the last %d days, not a fork, not archived) "
        "and are not on the site or in any earlier proposal." % (MIN_STARS, ACTIVE_DAYS),
        "",
        "To accept one: add it to `repos.json` with a hand-written description, "
        "mirror it in the README, and push. To ignore one: close this issue; "
        "nothing is proposed twice.",
        "",
    ]
    for item in candidates:
        desc = (item.get("description") or "no description").strip()
        lines.append("- [%s](%s) · ★ %s · pushed %s" % (
            item["full_name"], item["html_url"],
            item["stargazers_count"], (item.get("pushed_at") or "")[:10]))
        lines.append("  - %s" % desc)
    body = "\n".join(lines)
    title = "Repo candidates, week of %s" % today

    if dry:
        print("=== DRY RUN: would open issue ===")
        print(title)
        print(body)
        return

    repo = os.environ.get("GITHUB_REPOSITORY")
    if not repo:
        print("error: GITHUB_REPOSITORY not set", file=sys.stderr)
        sys.exit(1)
    issue = api("https://api.github.com/repos/%s/issues" % repo,
                {"title": title, "body": body, "labels": ["repo-candidates"]})
    print("Opened issue #%s with %d candidates" % (issue.get("number"), len(candidates)))

    seen.extend(item["full_name"] for item in candidates)
    with open(SEEN, "w") as f:
        json.dump(sorted(set(seen)), f, indent=1)
        f.write("\n")


if __name__ == "__main__":
    main()
