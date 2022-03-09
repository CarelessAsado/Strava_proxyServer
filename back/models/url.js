module.exports.currentUrl = process.env.NODE_ENV
  ? "https://laughing-lalande-26ad5a.netlify.app/"
  : "http://localhost:3000";
module.exports.getNewTokensUrl = `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=`;
