import datetime
import requests


def example_request():

    data = {
        "tweets": [
            {
                "author": "gossminn",
                "date_time": datetime.datetime.now().timestamp(),
                "content": "Hello world! I love organic cookies!"
            },
            {
                "author": "gossminn",
                "date_time": datetime.datetime.now().timestamp(),
                "content": "I hate studying!"
            }
        ]
    }

    r = requests.get("http://127.0.0.1:8000/tweet_sentiment/sentiment", json=data)

    print(r.text)


if __name__ == "__main__":
    example_request()