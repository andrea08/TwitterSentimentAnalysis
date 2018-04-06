# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from tweet_sentiment.data_structures import Error
from tweet_sentiment.google_sentiment_analysis.analyze_tweets import analyze_tweets
from tweet_sentiment.serializers import SentimentQuerySerializer, SentimentDataSerializer, ErrorSerializer
from tweet_sentiment.serializers import TweetListSerializer, TweetSerializer, TweetQuerySerializer
from tweet_sentiment.tweet_search.get_tweets import get_tweets_by_hashtag, get_user_tweets


@api_view(["GET"])
def sentiment(request):
    """
    Receive a `SentimentQuery` and sent it to Google for analysis, then process the results and return the
    analyzed results as a `SentimentData` object
    :param request: the incoming REST Framework request
    :return: the outgoing REST Framework response
    """

    # Deserialize the input and check if it's valid
    in_serializer = SentimentQuerySerializer(data=request.data)
    if in_serializer.is_valid():
        query = in_serializer.save()

        # Analyze the tweets
        result = analyze_tweets(query.tweets)

        # Serialize and return the result
        out_serializer = SentimentDataSerializer(result)
        return Response(out_serializer.data)

    # Otherwise, return an error
    else:
        error = Error("Invalid SentimentQuery")
        err_serializer = ErrorSerializer(error)
        return Response(err_serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def tweets(request):
    """
    Receive a `Tweeter Query` and send it to Twitter to retrieve it, then process the results and return them as a `TwitterList` object
    :param request: the incoming REST Framework request
    :return: the outgoing REST Framework response
    """

    # Deserialize the input and check if it's valid
    in_serializer = TweetQuerySerializer(data=request.data)
    if in_serializer.is_valid():
        query = in_serializer.save()
        if query.type == "hashtag":
            result = get_tweets_by_hashtag(query.content)
        elif query.type == "user":
            result = get_user_tweets(query.content)
        else:
            error = Error("Invalid  Tweet query type")
            err_serializer = ErrorSerializer(error)
            return Response(err_serializer.data, status=status.HTTP_400_BAD_REQUEST)
         # Serialize and return the result
        out_serializer = TweetListSerializer(result)
        return Response(out_serializer.data)

    # Otherwise, return an error
    else:
        error = Error("Invalid  Tweet Query")
        err_serializer = ErrorSerializer(error)
        return Response(err_serializer.data, status=status.HTTP_400_BAD_REQUEST)