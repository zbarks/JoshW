import json
import threading
import time
import urllib.request
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import DEFAULT_DATA, load_data, save_data, run


_SERVER_STARTED = False


class ServerThread(threading.Thread):
    daemon = True

    def run(self):
        run(host="127.0.0.1", port=5055)


def ensure_server_started():
    global _SERVER_STARTED
    if _SERVER_STARTED:
        return
    t = ServerThread()
    t.start()
    time.sleep(0.2)
    _SERVER_STARTED = True


def request(method, path, payload=None):
    data = None
    headers = {}
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(
        f"http://127.0.0.1:5055{path}", method=method, headers=headers, data=data
    )
    with urllib.request.urlopen(req) as response:
        return response.status, json.loads(response.read().decode("utf-8"))


def test_submit_review_is_stored_with_author():
    ensure_server_started()
    save_data(DEFAULT_DATA)

    status, review = request("POST", "/api/reviews", {"text": "Great app", "author": "Alex"})
    assert status == 201
    assert review["author"] == "Alex"
    assert review["text"] == "Great app"
    assert "created_at" in review

    data = load_data()
    assert len(data["reviews"]) == 1
    assert data["reviews"][0]["author"] == "Alex"


def test_internal_setting_persists_and_applies_to_new_reviews():
    ensure_server_started()
    save_data(DEFAULT_DATA)

    status, settings = request("PUT", "/api/settings", {"internal_review_enabled": True})
    assert status == 200
    assert settings["internal_review_enabled"] is True

    status, review = request("POST", "/api/reviews", {"text": "Internal note"})
    assert status == 201
    assert review["internal"] is True
