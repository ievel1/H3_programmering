#!/usr/bin/env python3
import sys
import requests

# Config
COUCHDB_URL = "http://localhost:5984"
DB_NAME = "todos"
AUTH = ("admin", "Ievel142")


def ensure_db() -> None:
    r = requests.head(f"{COUCHDB_URL}/{DB_NAME}", auth=AUTH)
    if r.status_code == 404:
        c = requests.put(f"{COUCHDB_URL}/{DB_NAME}", auth=AUTH)
        c.raise_for_status()
    elif r.status_code >= 400:
        r.raise_for_status()


def upsert_by_title(title: str, description: str, isdone: bool) -> None:
    find_url = f"{COUCHDB_URL}/{DB_NAME}/_find"
    sel = {"selector": {"type": "todo", "title": title}, "limit": 1}
    r = requests.post(
        find_url, json=sel, auth=AUTH, headers={"Content-Type": "application/json"}
    )
    r.raise_for_status()
    docs = r.json().get("docs", [])

    if docs:
        doc = docs[0]
        # Update fields
        doc["isdone"] = isdone
        doc["description"] = description
        put = requests.put(f"{COUCHDB_URL}/{DB_NAME}/{doc['_id']}", json=doc, auth=AUTH)
        put.raise_for_status()
        print(f"updated '{title}'  Description='{description}' : isdone={isdone}")
    else:
        # create a new one
        doc = {
            "type": "todo",
            "title": title,
            "description": description,
            "isdone": isdone,
        }
        post = requests.post(f"{COUCHDB_URL}/{DB_NAME}", json=doc, auth=AUTH)
        post.raise_for_status()
        print(f"created '{title}' description='{description}' -> isdone={isdone};")


def parse_bool(val: str) -> bool:
    v = val.strip().lower()
    if v == "true":
        return True
    if v == "false":
        return False
    raise SystemExit('Usage: python3 couchdb.py "<title>" true|false')


if __name__ == "__main__":
    if len(sys.argv) != 4:
        raise SystemExit(
            'Usage: python3 couchdb.py "<title>" "<description>" true|false'
        )
    ensure_db()
    title = sys.argv[1]
    description = sys.argv[2]
    isdone = parse_bool(sys.argv[3])
    upsert_by_title(title, description, isdone)
