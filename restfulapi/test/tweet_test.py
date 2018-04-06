import datetime
import requests


def example_request():

    data = {
        'type' : 'hashtag',
        'content' : 'blocus'
    }

    r = requests.get("http://127.0.0.1:8000/tweet_sentiment/tweets", json=data)

    print(r.text)


if __name__ == "__main__":
    example_request()