const authRoute = require('./authRoute');
const bookRoute = require('./bookRoute');

module.exports = (app) => {
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/book', bookRoute);
}
