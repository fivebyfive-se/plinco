const lti = require('ltijs').Provider;
const Database = require('ltijs-sequelize');

const db = new Database(
    process.env.LTI_DB_NAME,
    process.env.LTI_DB_USER,
    process.env.LTI_DB_PASSWORD, {
        host: '...',
        dialect: 'postgresql',
        logging: false
    }
)

lti.setup(process.env.LTI_KEY || 'LTIKEY', // Key used to sign cookies and tokens
    { // Database configuration
        plugin: db
    },
    { // Options
        appRoute: '/', loginRoute: '/login', // Optionally, specify some of the reserved routes
        cookies: {
            secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
            sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
        },
        devMode: true // Set DevMode to false if running in a production environment with https
    }
)

// Set lti launch callback
lti.onConnect((token, req, res) => {
    console.log(token)
    return res.send('It\'s alive!')
})

module.exports = async () => {
    // Start service:
    await lti.deploy({ serverless: true });

    // Register platform:
    await lti.registerPlatform({
        url: 'https://blackboard.oru.se/',
        name: 'Blackboard Learn',
        clientId: 'TOOLCLIENTID',
        authenticationEndpoint: 'https://platform.url/auth',
        accesstokenEndpoint: 'https://platform.url/token',
        authConfig: {
            method: 'JWK_SET',
            key: 'https://platform.url/keyset'
        }
    });

    // Return express-ref:
    return lti.app;
};
