import React from "react";

const Social = (props) => {
  // console.log(props);
  return (
    <>
      <div className="social_media_section">
        <div className="reddit">
          <div className="reddit_logo">
            <i className="fa-brands fa-reddit fa-5x"></i>
            <h1>Reddit</h1>
          </div>
          <div className="reddit_users_info">
            <h3>Active Accounts 48h :</h3>
            <h4>
              -{" "}
              {props.coin?.community_data?.reddit_accounts_active_48h
                ? props.coin?.community_data?.reddit_accounts_active_48h.toLocaleString()
                : "No Information Available"}
            </h4>
            <h3>Average Comments 48h :</h3>
            <h4>
              -{" "}
              {props.coin?.community_data?.reddit_average_comments_48h
                ? props.coin?.community_data?.reddit_average_comments_48h.toLocaleString()
                : "No Information Available"}
            </h4>
            <h3>Average Posts 48h :</h3>
            <h4>
              -{" "}
              {props.coin?.community_data?.reddit_average_posts_48h
                ? props.coin?.community_data?.reddit_average_posts_48h.toLocaleString()
                : "No Information Available"}
            </h4>
            <h3>Subscribers :</h3>
            <h4>
              -{" "}
              {props.coin?.community_data?.reddit_subscribers
                ? props.coin?.community_data?.reddit_subscribers.toLocaleString()
                : "No Information Available"}
            </h4>
          </div>
        </div>
        <div className="twitter">
          <div className="twitter_logo">
            <i className="fa-brands fa-twitter fa-5x"></i>
            <h1>Twitter</h1>
          </div>
          <div className="reddit_users_info">
            <h3>Twitter Followers:</h3>
            <h4>
              -{" "}
              {props.coin?.community_data?.twitter_followers
                ? props.coin?.community_data?.twitter_followers.toLocaleString()
                : "No Information Available"}
            </h4>
          </div>
        </div>
        <div className="telegram">
          <div className="telegram_logo">
            <i className="fa-brands fa-telegram fa-5x"></i>
            <h1>Telegram</h1>
          </div>
          <div className="reddit_users_info">
            <h3>Telegram Followers:</h3>
            <h4>
              -{" "}
              {props.coin?.community_data?.telegram_channel_user_count
                ? props.coin?.community_data?.telegram_channel_user_count.toLocaleString()
                : "No Information Available"}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Social;
