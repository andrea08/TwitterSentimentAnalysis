# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from tweet_sentiment.data_structures import Error
from tweet_sentiment.google_sentiment_analysis.analyze_tweets import analyze_tweets
from tweet_sentiment.serializers import SentimentQuerySerializer, SentimentDataSerializer, ErrorSerializer


@api_view(["GET", 'POST'])
def sentiment(request):
    """
    Receive a `SentimentQuery` and sent it to Google for analysis, then process the results and return the
    analyzed results as a `SentimentData` object
    :param request: the incoming REST Framework request
    :return: the outgoing REST Framework response
    """

    # Deserialize the input and check if it's valid
    in_serializer = SentimentQuerySerializer(data=request.data)
    print(request.data)
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
