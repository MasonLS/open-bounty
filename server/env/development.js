module.exports = {
  DATABASE_URI: 'postgres://localhost:5432/openbounty',
  SESSION_SECRET: 'Open Bounty is my real dad',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  GITHUB: {
    clientID: 'b5f7e38d527e445b6f18',
    clientSecret: 'e7605a57d91648256a8bda7b69bad665235a1010',
    callbackURL: 'http://127.0.0.1:1337/auth/github/callback'
  },
  GOOGLE: {
    clientID: 'INSERT_GOOGLE_CLIENTID_HERE',
    clientSecret: 'INSERT_GOOGLE_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_GOOGLE_CALLBACK_HERE'
  },
  LOGGING: true,
  NATIVE: true
}
