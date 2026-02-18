from __future__ import annotations

import json
import threading
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

BASE_DIR = Path(__file__).parent
DATA_FILE = BASE_DIR / "data.json"
STATIC_DIR = BASE_DIR / "static"
DATA_LOCK = threading.Lock()

DEFAULT_DATA: dict[str, Any] = {
    "settings": {"internal_review_enabled": False},
    "reviews": [],
}


def load_data() -> dict[str, Any]:
    with DATA_LOCK:
        if not DATA_FILE.exists():
            save_data(DEFAULT_DATA)
        try:
            with DATA_FILE.open("r", encoding="utf-8") as f:
                data = json.load(f)
        except json.JSONDecodeError:
            save_data(DEFAULT_DATA)
            data = DEFAULT_DATA.copy()

    if not isinstance(data, dict):
        return DEFAULT_DATA.copy()

    settings = data.get("settings", {})
    reviews = data.get("reviews", [])
    if not isinstance(settings, dict):
        settings = {"internal_review_enabled": False}
    if not isinstance(reviews, list):
        reviews = []

    return {
        "settings": {
            "internal_review_enabled": bool(settings.get("internal_review_enabled", False)),
        },
        "reviews": reviews,
    }


def save_data(data: dict[str, Any]) -> None:
    with DATA_LOCK:
        with DATA_FILE.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)


def _json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict[str, Any] | list[Any]) -> None:
    raw = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(raw)))
    handler.end_headers()
    handler.wfile.write(raw)


def _read_json_body(handler: BaseHTTPRequestHandler) -> dict[str, Any]:
    length = int(handler.headers.get("Content-Length", "0"))
    raw = handler.rfile.read(length) if length else b"{}"
    if not raw:
        return {}
    try:
        payload = json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError:
        return {}
    return payload if isinstance(payload, dict) else {}


class ReviewHandler(BaseHTTPRequestHandler):
    def _route(self) -> str:
        return urlparse(self.path).path

    def do_GET(self) -> None:  # noqa: N802
        route = self._route()

        if route == "/":
            html = (STATIC_DIR / "index.html").read_bytes()
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(html)))
            self.end_headers()
            self.wfile.write(html)
            return

        if route == "/api/reviews":
            data = load_data()
            _json_response(self, HTTPStatus.OK, data["reviews"])
            return

        if route == "/api/settings":
            data = load_data()
            _json_response(self, HTTPStatus.OK, data["settings"])
            return

        _json_response(self, HTTPStatus.NOT_FOUND, {"error": "Not found"})

    def do_POST(self) -> None:  # noqa: N802
        route = self._route()
        if route != "/api/reviews":
            _json_response(self, HTTPStatus.NOT_FOUND, {"error": "Not found"})
            return

        payload = _read_json_body(self)
        text = (payload.get("text") or "").strip()
        author = (payload.get("author") or "Anonymous").strip() or "Anonymous"
        if not text:
            _json_response(self, HTTPStatus.BAD_REQUEST, {"error": "Review text is required"})
            return

        data = load_data()
        review = {
            "id": len(data["reviews"]) + 1,
            "author": author,
            "text": text,
            "internal": bool(data["settings"].get("internal_review_enabled", False)),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        data["reviews"].append(review)
        save_data(data)
        _json_response(self, HTTPStatus.CREATED, review)

    def do_PUT(self) -> None:  # noqa: N802
        route = self._route()
        if route != "/api/settings":
            _json_response(self, HTTPStatus.NOT_FOUND, {"error": "Not found"})
            return

        payload = _read_json_body(self)
        if "internal_review_enabled" not in payload:
            _json_response(self, HTTPStatus.BAD_REQUEST, {"error": "internal_review_enabled is required"})
            return

        data = load_data()
        data["settings"]["internal_review_enabled"] = bool(payload["internal_review_enabled"])
        save_data(data)
        _json_response(self, HTTPStatus.OK, data["settings"])


def run(host: str = "0.0.0.0", port: int = 5000) -> None:
    save_data(load_data())
    server = ThreadingHTTPServer((host, port), ReviewHandler)
    print(f"Server running on http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    run()
