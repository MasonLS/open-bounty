module.exports = {
    DATABASE_URI: 'postgres://localhost:5432/openbounty',
    APP_URL: 'http://localhost:1337',
    SESSION_SECRET: 'Open Bounty is my real dad',
    TWITTER: {
        consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
        consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
        callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
    },
    FACEBOOK: {
        clientID: 'INSERT_FACEBOOK_CLIENTID_HERE',
        clientSecret: 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
        callbackURL: 'INSERT_FACEBOOK_CALLBACK_HERE'
    },
    GOOGLE: {
        clientID: 'INSERT_GOOGLE_CLIENTID_HERE',
        clientSecret: 'INSERT_GOOGLE_CLIENT_SECRET_HERE',
        callbackURL: 'INSERT_GOOGLE_CALLBACK_HERE'
    },
    PAYPAL: {
        mode: 'sandbox',
        client_id: 'AaPlZFuzR4BGmblo0jNvfcOY3SL0z9cJkMd9HV4ma1crNlEUm3f3caeyy6QRTrIHnUBDdl_8TVb5tHSi',
        client_secret: 'EHv0MsNUj3BeSex4a2v5jdiRxmdNtCmSVHoJifonW7SxmxrMN9bHWDXUOYJzBoEnHq-z1zhV5rfi76NQ'
    },
    LOGGING: true,
    NATIVE: true
};
