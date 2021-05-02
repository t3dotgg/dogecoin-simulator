import React from "react";
import { Header } from "../common/header";
import { GeneratedTweets } from "../data/tweets";
import { useGameStore } from "../engine/game";
import { Unlocks } from "../engine/types";

export const TwitterFeed: React.FC = () => {
  const unlocks = useGameStore((state) => state.unlocks);
  const hasSocialMediaManager = unlocks.includes(Unlocks.SocialMediaManager);

  const dogeCount = useGameStore((state) => state.dogecoin);
  const sendTweet = useGameStore((state) => state.sendTweet);
  const tweets = useGameStore((state) => state.tweetIDs);
  const followers = useGameStore((state) => state.twitterFollowers);
  const tweetCount = useGameStore((state) => state.tweetCount);

  if (!hasSocialMediaManager) return null;

  return (
    <div className="panel">
      <Header>
        <span>Twitter Feed</span>
      </Header>
      <div
        style={{
          padding: 5,
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Followers: {followers}</span>
        <span>Tweets: {tweetCount}</span>
      </div>
      <div style={{ height: 200, overflowY: "scroll" }}>
        {tweets.slice(0, 20).map((tweet) => (
          <div
            style={{
              marginBottom: 3,
              padding: 10,
              backgroundColor: "white",
              display: "flex",
            }}
          >
            <img
              src="/assets/doge-head.png"
              style={{
                height: 50,
                borderRadius: 25,
                border: "1px solid black",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: 5,
              }}
            >
              <div>
                <span style={{ fontWeight: "bold" }}>DogeMan </span>
                <span>@DogeTycoon</span>
              </div>
              {GeneratedTweets[tweet]}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: 10, borderTop: "2px solid black" }}>
        <button
          onClick={() => {
            sendTweet();
          }}
          disabled={dogeCount < 50000}
          data-tip="Send a random tweet about Dogecoin"
          style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}
        >
          Tweet about Dogecoin (50,000 Doge)
        </button>
      </div>
    </div>
  );
};
