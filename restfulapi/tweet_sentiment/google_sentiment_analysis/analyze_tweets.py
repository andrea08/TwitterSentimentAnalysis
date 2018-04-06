import datetime

from google.api_core.exceptions import InvalidArgument
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

from tweet_sentiment.data_structures import SentimentData, Score, Tweet


def analyze_tweets(tweets):
    client = language.LanguageServiceClient()
    annotations, skipped = collect_annotations(client, tweets)

    counts = {
        "positive": 0,
        "negative": 0,
        "neutral": 0
    }

    for annotation in annotations:
        doc_score = annotation.document_sentiment.score
        if doc_score < -0.25:
            counts["negative"] += 1
        elif -0.25 <= doc_score > 0.25:
            counts["neutral"] += 1
        else:
            counts["positive"] += 1

    return SentimentData(len(annotations), skipped, Score(
        counts["positive"],
        counts["positive"] / len(annotations),
        counts["negative"],
        counts["negative"] / len(annotations),
        counts["neutral"],
        counts["neutral"] / len(annotations)
    ))


def collect_annotations(client, tweets):
    annotations = []
    skipped = 0
    for tweet in tweets:
        document = types.Document(
            content=tweet.content,
            type=enums.Document.Type.PLAIN_TEXT
        )
        try:
            annotations.append(client.analyze_sentiment(document=document))
        except InvalidArgument:
            skipped += 1
            continue

    return annotations, skipped


def run_example():
    tweets = []
    with open("sample_tweets.txt") as f:
        for line in f.readlines():
            tweet = Tweet("BarackObama", datetime.datetime.now().timestamp(), line)
            tweets.append(tweet)

    print(analyze_tweets(tweets))


if __name__ == "__main__":
    run_example()
