"""네이버 플레이스 방문자 리뷰 수집 → data/reviews.json

사용법:  python tools/fetch_reviews.py
수집 후 index.html 의 리뷰 섹션은 수동으로 골라 반영합니다.
"""
import json, sys, pathlib, collections
import requests

BUSINESS_ID = "2080201732"
OUT = pathlib.Path(__file__).resolve().parent.parent / "data" / "reviews.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    "Referer": f"https://m.place.naver.com/place/{BUSINESS_ID}/review/visitor",
    "Content-Type": "application/json",
    "Accept-Language": "ko-KR,ko;q=0.9",
}
QUERY = """query getVisitorReviews($input: VisitorReviewsInput) {
  visitorReviews(input: $input) {
    total
    items { id rating author { nickname } body created visitCount votedKeywords { name } }
  }
}"""


def fetch(page, size=50):
    payload = [{
        "operationName": "getVisitorReviews",
        "variables": {"input": {"businessId": BUSINESS_ID, "businessType": "place", "item": "0",
                                 "page": page, "size": size, "includeContent": True, "cidList": []}},
        "query": QUERY,
    }]
    r = requests.post("https://pcmap-api.place.naver.com/graphql", headers=HEADERS, json=payload, timeout=20)
    r.raise_for_status()
    return r.json()[0]["data"]["visitorReviews"]


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    first = fetch(1)
    items, total = list(first["items"]), first["total"]
    page = 2
    while len(items) < total:
        seen = {it["id"] for it in items}
        more = [it for it in fetch(page)["items"] if it["id"] not in seen]
        if not more:
            break
        items += more
        page += 1
    keywords = collections.Counter(k["name"] for it in items for k in (it.get("votedKeywords") or []))
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps({"total": total, "keywords": keywords.most_common(), "items": items},
                              ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"saved {len(items)}/{total} reviews -> {OUT}")
    for name, n in keywords.most_common(8):
        print(f"  {name}: {n}")


if __name__ == "__main__":
    main()
