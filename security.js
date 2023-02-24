
const rateLimit = require('express-rate-limit')
const config = require('./config')

const limiter = rateLimit({
    windowMs: config.rateLimiterTimeout * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {error: "Too many requests, wait a while and try again"}
})

module.exports = {
    limiter
}