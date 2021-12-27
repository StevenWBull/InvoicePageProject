const express = require('express');
const xss = require('xss');
const bodyParser = require('body-parser')
const InvoiceService = require('./invoice-service');

const invoiceRouter = express.Router();
const jsonBodyParser = bodyParser.json();

const serializeInvoiceData = invoice => {
    const itemArr = invoice.items.map(item => {
        console.log(item)
        return {
            name: xss(item.itemName.trim()),
            quantity: xss(item.quantity.trim()),
            price: Number(xss(item.price.trim())).toFixed(2),
            total: Number(xss(item.quantity.trim())) * Number(xss(item.price.trim()))
        };
    });
    return {
        items: itemArr, 
        streetAddress: xss(invoice.streetAddress.trim()), 
        city: xss(invoice.city.trim()), 
        postCode: xss(invoice.postCode.trim()), 
        country: xss(invoice.country.trim()), 
        clientStreetAddress: xss(invoice.clientStreetAddress.trim()), 
        clientPostalCode: xss(invoice.clientPostalCode.trim()), 
        clientCity: xss(invoice.clientCity.trim()),
        clientCountry: xss(invoice.clientCountry.trim()),
        clientEmail: xss(invoice.clientEmail.trim()), 
        clientName: xss(invoice.clientName.trim()), 
        paymentTerms: xss(invoice.paymentTerms.trim()), 
        projectDescription: xss(invoice.projectDescription.trim()), 
        saveType: invoice.saveType, 
        issueDate: xss(invoice.issueDate.trim())
    };
}

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
            .catch(next);
    });

// Deactivate invoice record
invoiceRouter
    .route('/deactivate')
    .patch(jsonBodyParser, (req, res, next) => {
        const db = req.app.get('db');
        const { lvid } = req.body;

        InvoiceService.deactivateInvoice(db, lvid)
            .then(() => InvoiceService.deactivateInvoice(db, lvid))
            .then(() => res.status(201).end())
            .catch(next);
    });

// Deactivate invoice record
invoiceRouter
    .route('/newInvoice')
    .post(jsonBodyParser, async(req, res, next) => {
        const db = req.app.get('db');
        const { invoiceData } = req.body;
        const sanitizedInvoiceData = serializeInvoiceData(invoiceData);
        const { items, streetAddress, city, postCode, country, clientCountry, clientStreetAddress, clientPostalCode, clientCity, clientEmail, clientName, paymentTerms, projectDescription, saveType, issueDate} = sanitizedInvoiceData;

        // Create new Inoivce Id that doesn't already exist with str length of 2 and int length of 4
        const newId = await InvoiceService.createInvoiceId(db, 2, 4);

        const lskinObj = {
            'refname': '',
            'street': streetAddress,
            'city': city,
            'postcode': postCode,
            'country': country
        };

        let lskinPrimaryId = await InvoiceService.checkIfLskinExits(db, lskinObj);
        
        if (!lskinPrimaryId)
            lskinPrimaryId = await InvoiceService.insertNewLskin(db, lskinObj);
        
        const clientNameArr = clientName.split(' ');
        const clientFirstName = clientNameArr[0] || '';
        const clientLastName = clientNameArr[1] || '';
        const clientObj = {
            'first_name': clientFirstName,
            'last_name': clientLastName,
            'email': clientEmail,
            'street': clientStreetAddress,
            'city': clientCity,
            'postcode': clientPostalCode,
            'country': clientCountry,
            'frn_lskinid': lskinPrimaryId
        };

        let leclientPrimaryId = await InvoiceService.insertNewClient(db, clientObj);

        const invoiceObj = {
            'id': newId,
            'created_timestamp': issueDate ? db.raw(`TO_TIMESTAMP('${issueDate}', 'DD Mon YYYY')`) : db.raw('NOW()'),
            'payment_due': issueDate ? db.raw(`TO_TIMESTAMP('${issueDate}', 'DD Mon YYYY') + interval '${paymentTerms} day'`) : db.raw(`NOW() + interval '${Number(paymentTerms)} day'`),
            'description': projectDescription,
            'payment_terms': Number(paymentTerms),
            'status': saveType === 'save' ? 'pending' : 'draft',
            'frn_leclientid': leclientPrimaryId
        };

        let invoicePrimaryKey = await InvoiceService.insertNewInvoice(db, invoiceObj);
        
        for (let idx in items) {
            const { name, quantity, price } = items[idx];
            console.log(typeof price)
            const itemObj = {
                'refname': name,
                'quantity': Number(quantity),
                'price': price,
                'frn_leinvoiceid': invoicePrimaryKey
            };

            await InvoiceService.insertNewItems(db, itemObj);
        }

        InvoiceService.getAllInvoices(db)
            .then(invoices => {
                const invoiceArray = invoices.rows.map(invoice => invoice.json_build_object);
                res.status(201).json(invoiceArray);
            })
            .catch(next);
    })

module.exports = invoiceRouter;