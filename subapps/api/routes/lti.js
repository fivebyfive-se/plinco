const lti = require('ltijs').Provider;

lti.setup(process.env.LTI_KEY || 'LTIKEY', // Key used to sign cookies and tokens
    { // Database configuration
        url: 'mongodb://localhost/database',
        connection: { user: 'user', pass: 'password' }
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
    await lti.deploy({ serverless: true });
    return lti.app;
};
