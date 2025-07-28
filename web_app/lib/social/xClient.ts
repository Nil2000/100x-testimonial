import { Client } from "twitter-api-sdk";

let xClient: Client | null;

export const getXClient = () => {
  if (!xClient) {
    xClient = new Client(process.env.TWITTER_TOKEN!);
  }
  return xClient;
};

export const getTweetById = async (tweetId: string) => {
  const client = getXClient();
  const tweet = await client.tweets.findTweetById(tweetId);
  console.log(tweet);
  return tweet;
};
