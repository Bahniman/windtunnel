"""Build a synthetic customer population from a company's own evidence.

The prototype reads a reviews CSV (text + rating + spend) and segments
customers with transparent keyword rules. Production replaces the rules with
LLM-graded segmentation over reviews, tickets, transactions and CRM fields.
The contract stays: every synthetic customer traces back to evidence, not to
an invented persona.
"""
import csv
import random
from dataclasses import dataclass

PRICE_WORDS = {"price", "expensive", "cost", "cheap", "value", "worth",
               "afford", "discount", "deal"}
QUALITY_WORDS = {"quality", "premium", "durable", "build", "material",
                 "finish", "broke", "lasted"}
CONVENIENCE_WORDS = {"delivery", "fast", "easy", "convenient", "quick",
                     "support", "return", "refund"}


@dataclass
class Customer:
    segment: str            # price_sensitive | quality_focused | convenience
    monthly_spend: float
    satisfaction: float     # 0..1, from rating
    price_sensitivity: float  # 0..1
    source_review: str      # provenance: the evidence this customer grew from


def _segment(text: str) -> str:
    words = set(text.lower().split())
    scores = {
        "price_sensitive": len(words & PRICE_WORDS),
        "quality_focused": len(words & QUALITY_WORDS),
        "convenience": len(words & CONVENIENCE_WORDS),
    }
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "quality_focused"


def build_population(reviews_csv: str, n: int = 10_000, seed: int = 7) -> list:
    """Grow n synthetic customers from the empirical review distribution."""
    rng = random.Random(seed)
    seeds = []
    with open(reviews_csv, encoding="utf-8") as f:
        for row in csv.DictReader(f):
            seeds.append({
                "segment": _segment(row["review_text"]),
                "rating": float(row["rating"]),
                "spend": float(row["monthly_spend"]),
                "text": row["review_text"][:80],
            })
    if not seeds:
        raise ValueError("no reviews found")

    population = []
    for _ in range(n):
        s = rng.choice(seeds)
        sensitivity = {"price_sensitive": 0.75, "convenience": 0.45,
                       "quality_focused": 0.30}[s["segment"]]
        population.append(Customer(
            segment=s["segment"],
            monthly_spend=max(50.0, rng.gauss(s["spend"], s["spend"] * 0.25)),
            satisfaction=min(1.0, max(0.0, rng.gauss(s["rating"] / 5, 0.12))),
            price_sensitivity=min(1.0, max(0.05, rng.gauss(sensitivity, 0.12))),
            source_review=s["text"],
        ))
    return population
