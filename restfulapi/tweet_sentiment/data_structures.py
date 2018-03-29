"""
Plain Old Python Object versions of the data structures that are used in both the REST API and the Angular application
"""


class TweetQuery:
    """
    Represents a search query together with its type (hashtag or username)
    """
    def __init__(self, type, content):
        self.type = type
        self.content = content

    def __repr__(self):
        return "TweetQuery({}, {})".format(self.type, self.content)


class TweetList:
    """
    Represents a list of tweets that is sent back to the Angular app
    """
    def __init__(self, number_found, tweets):
        self.number_found = number_found
        self.tweets = tweets

    def __repr__(self):
        tweets = ",\n".join(repr(t) for t in self.tweets)
        return "TweetList({}, {})".format(self.number_found, tweets)


class Tweet:
    """
    Represents a tweet together with some essential metadata
    """
    def __init__(self, author, date_time, content):
        self.author = author
        self.date_time = date_time
        self.content = content

    def __repr__(self):
        return "Tweet({}, {}, ".format(self.author, str(self.date_time)) + \
               "{})".format(self.content[:30] + '...' if len(self.content) >= 30 else self.content)


class SentimentQuery:
    """
    Represents a list of tweets on which to perform sentiment analysis
    """
    def __init__(self, tweets):
        self.tweets = tweets

    def __repr__(self):
        tweets = ",\n".join(repr(t) for t in self.tweets)
        return "SentimentQuery({})".format(tweets)


class SentimentData:
    """
    Contains information about a collection of analyzed tweets
    """
    def __init__(self, number_found, skipped, score):
        self.number_found = number_found
        self.skipped = skipped
        self.score = score

    def __repr__(self):
        return "SentimentData({}, {}, {})".format(self.number_found, self.skipped, repr(self.score))


class Score:
    """
    Represents aggregated score information for a collection of analyzed tweets
    """
    def __init__(self, positive_number, positive_percentage, negative_number, negative_percentage, neutral_number,
                 neutral_percentage):
        self.positive_number = positive_number
        self.positive_percentage = positive_percentage
        self.negative_number = negative_number
        self.negative_percentage = negative_percentage
        self.neutral_number = neutral_number
        self.neutral_percentage = neutral_percentage

    def __repr__(self):
        return "Score({}, {}, {}, ".format(self.positive_number, self.positive_percentage, self.negative_number) + \
               "{}, {}, {})".format(self.negative_percentage, self.neutral_number, self.neutral_percentage)


class Error:
    """
    Represents error information to be sent back to the Angular app in case something goes wrong during analysis
    """
    def __init__(self, error_information):
        self.error_information = error_information

    def __repr__(self):
        return "Error({})".format(self.error_information)
