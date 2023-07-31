const express = require("express");
const compression = require("compression")
const routes = require("./routes");
const { errorHandler, unhandledRoute } = require('./midllewares')

const app = express();

/* Compression middleware
* compress the HTTP response data sent back to clients
*/
app.use(compression())

app.on('unhandledRejection', (reason) => {
    console.error(reason);
    process.exit(1)
})


//body parser (JSON)
app.use(express.json())

//routes
routes(app)

//not found route
app.use(unhandledRoute)

//ErrorHandler (createError() handler)
app.use(errorHandler);

module.exports = app;