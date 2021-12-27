const express = require('express');
const xss = require('xss');
const bodyParser = require('body-parser')
const InvoiceService = require('./invoice-service');

const invoiceRouter = express.Router();
const jsonBodyParser = bodyParser.json();

// Get all invoices
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

// Deactivate invoice record
invoiceRouter
    .route('/deactivate')
    .patch(jsonBodyParser, (req, res, next) => {
        const db = req.app.get('db');
        const { lvid } = req.body;

        InvoiceService.deactivateInvoice(db, lvid)
            .then(() => InvoiceService.deactivateInvoice(db, lvid))
            .then(() => res.status(201).end())
            .catch(next)
    })

module.exports = invoiceRouter;