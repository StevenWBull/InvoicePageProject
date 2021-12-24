const express = require('express');
const path = require('path');
const InvoiceService = require('./invoice-service');

const invoiceRouter = express.Router();
const jsonBodyParser = express.json();

invoiceRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db');
        InvoiceService.getAllInvoices(db)
            .then(invoices => {
                const invoiceArray = invoices.rows.map(invoice => invoice.json_build_object);
                res.status(200).json(invoiceArray);
            })
            .catch(next)
    })

module.exports = invoiceRouter;