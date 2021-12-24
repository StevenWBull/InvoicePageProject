require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');

const invoiceRouter = require('./invoice/invoice-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

/* const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 1, // limit each IP to 1 requests per windowMs
}) */

// app.use(limiter);
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/invoice", invoiceRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(errorHandler);

module.exports = app;