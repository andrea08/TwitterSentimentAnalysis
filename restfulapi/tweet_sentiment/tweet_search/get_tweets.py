import twitter
from tweet_sentiment.data_structures import Tweet, TweetList

api = twitter.Api(consumer_key='o6U3cEE0EMijpPwlgSBWAgNmu',
                  consumer_secret='hN8GnKtNZLaBkOKNfHDCzQvFLevM2Q7wEXbtrXziUgBsewD0T8',
                  access_token_key='843234589-bE3dyAcErm6WenxYLFi2W3Z4j8eAeciuUIH8Lnvs',
                  access_token_secret='BM4OPTvwIKAfo8LbKRvvojrN0ULTxrPhnFiX8Mfcawiwx', tweet_mode='extended')


def get_tweets_by_search(search):
    '''Returns a TweetList object made of Twit objects'''
    search = api.GetSearch(search, include_entities=True, count=10)
    for tweet in search:
        # print(tweet)
        hashtags = [i.text for i in tweet.hashtags]
        # print(tweet.id, tweet.full_text, hashtags)
        print(tweet.id, "\n", tweet.full_text, hashtags[:3], "\n")


def get_tweets_by_hashtag(hashtag):
    search = api.GetSearch(raw_query="q=%23" + hashtag + "&count=10")
    tweet_list = []
    for tweet in search:
        #hashtags = [i.text for i in tweet.hashtags]
        # if hashtag in hashtags:
        # print(tweet.id, tweet.full_text, hashtags)
        tweet_list.append(Tweet(tweet.id, 0, tweet.full_text))
    return TweetList(len(tweet_list), tweet_list)


def get_tweets_stream(content):
    hashtag_list = []
    hashtag_list.append(content)
    stream = api.GetStreamFilter(track=hashtag_list)
    for line in stream:
        # Signal that the line represents a tweet
        if 'in_reply_to_status_id' in line:
            print(type(line))
            tweet = twitter.Status.NewFromJsonDict(line)
            #todo: proper format to get float for datetime
            print("User: {user}, Tweet: '{tweet}', Created at: {time}".format(user=tweet.user.screen_name,
                                                                              tweet=tweet.text, time=0))


def get_user_tweets(user, count):
    t = api.GetUserTimeline(screen_name=user, count=count)
    tweets = [i.AsDict() for i in t]
    tweet_list = []
    for t in tweets:
        # print(t['id'], t['full_text'])
        tweet_list.append(Tweet(t['id'], t['created_at'], t['full_text']))
    return TweetList(len(tweet_list), tweet_list)


def run_example():
    #print( get_tweets_by_hashtag("exilio"))
    print(get_user_tweets("@KRLS",3))
    #get_user_tweets("@KRLS", 3)


if __name__ == "__main__":
    run_example()
