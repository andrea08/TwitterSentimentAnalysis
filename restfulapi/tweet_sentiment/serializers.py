"""
REST framework `Serializer`s for the data structures defined in `data_structures.py`
Classes support only serializing and deserializing, not updating existing objects
"""
import datetime
from django.conf import settings
from io import BytesIO

if __name__ == "__main__": settings.configure()  # needed to run the examples

from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework import serializers
from tweet_sentiment.data_structures import Score, TweetQuery, TweetList, Tweet, SentimentQuery, \
    SentimentData, Error


class TweetQuerySerializer(serializers.Serializer):
    """
    Class for (de)serializing a `TweetQuery` object
    """
    type = serializers.CharField()
    content = serializers.CharField()

    def create(self, validated_data):
        return TweetQuery(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


class TweetSerializer(serializers.Serializer):
    """
    Class for (de)serializing a `Tweet` object
    """
    author = serializers.CharField()
    date_time = serializers.FloatField()
    content = serializers.CharField

    def create(self, validated_data):
        return Tweet(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


class TweetListSerializer(serializers.Serializer):
    """
    Class for (de)serializing a `TweetList` object
    """
    number_found = serializers.IntegerField()
    tweets = TweetSerializer(many=True)

    def create(self, validated_data):
        return TweetList(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


class SentimentQuerySerializer(serializers.Serializer):
    """
    Class for (de)serializing a `SentimentQuery` object
    """
    tweets = TweetSerializer(many=True)

    def create(self, validated_data):
        return SentimentQuery(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


class ScoreSerializer(serializers.Serializer):
    """
    Class for (de)serializing a `Score` object
    """
    positive_number = serializers.IntegerField()
    positive_percentage = serializers.FloatField()
    negative_number = serializers.IntegerField()
    negative_percentage = serializers.FloatField()
    neutral_number = serializers.IntegerField()
    neutral_percentage = serializers.FloatField()

    def create(self, validated_data):
        return Score(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


class SentimentDataSerializer(serializers.Serializer):
    """
    Class for (de)serializing a `SentimentData` object
    """
    number_found = serializers.IntegerField()
    score = ScoreSerializer(many=False)

    def create(self, validated_data):
        return SentimentData(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


class ErrorSerializer(serializers.Serializer):
    """
    Class for (de)serializing an `Error` object
    """
    error_information = serializers.CharField()

    def create(self, validated_data):
        return Error(**validated_data)

    def update(self, instance, validated_data):
        raise NotImplementedError("Updating existing objects is not supported")


def run_examples():
    # Score: serialize
    score = Score(1, 50.0, 0, 0.0, 1, 50.0)
    serializer = ScoreSerializer(score)
    json_string = JSONRenderer().render(serializer.data)
    print(json_string)

    # Score: deserialize
    stream = BytesIO(json_string)
    data = JSONParser().parse(stream)
    serializer = ScoreSerializer(data=data)
    if serializer.is_valid():
        score2 = serializer.save()
        print(score2)

    # Tweet list: serialize
    tweets = [
        Tweet("gossminn", datetime.datetime.now().timestamp(), "Hello world!"),
        Tweet("RealDonaldTrump", datetime.datetime.now().timestamp(), "America First!")
    ]

    tweet_list = TweetList(2, tweets)

    serializer = TweetListSerializer(tweet_list)
    json_string = JSONRenderer().render(serializer.data)
    print(json_string)

    # Tweet list: deserialize


# Some examples/tests
if __name__ == "__main__":
    run_examples()
