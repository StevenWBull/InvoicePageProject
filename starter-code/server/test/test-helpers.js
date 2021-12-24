const testLskinInsert = {
    refname: 'Graphic Design Co.',
    street: '19 Union Terrace',
    city: 'London',
    postcode: 'E1 3EZ',
    country: 'United Kingdon'
}

const testLeclientInsert = {
    first_name: 'Jensen',
    last_name: 'Huang',
    email: 'jensenh@mail.com',
    street: '106 Kendell Street',
    city: 'Sharrington',
    postcode: 'NR24 5WQ',
    country: 'United Kingdom',
    frn_lskinid: 1
}

const testLeinvoiceInsert = {
    id: 'RT3080', 
    created_timestamp: '2021-08-18',
    payment_due: '2021-08-19',
    payment_terms: 1,
    description: 'Re-branding',
    status: 'paid',
    frn_leclientid: 1
}

const testLeitemInsert = {
    refname: 'Brand Guidelines',
    quantity: 1,
    price: 1800.90,
    frn_leinvoiceid: 1
}

const expectedInvoiceArray = [{
    "lvid": 1,
    "lcid": 1,
    "lsid": 1,
    "id": "RT3080",
    "createdAt": "2021-08-18",
    "paymentDue": "2021-08-19",
    "description": "Re-branding",
    "paymentTerms": 1,
    "clientName": "Jensen Huang",
    "clientEmail": "jensenh@mail.com",
    "status": "paid",
    "senderAddress": {
        "street": "19 Union Terrace",
        "city": "London",
        "postCode": "E1 3EZ",
        "country": "United Kingdon"
    },
    "clientAddress": {
        "street": "106 Kendell Street",
        "city": "Sharrington",
        "postCode": "NR24 5WQ",
        "country": "United Kingdon"
    },
    "items": [
        {
            "liid": 1,
            "name": "Brand Guidelines",
            "quantity": 1,
            "price": 1800.90,
            "total": 1800.90
        }
    ],
    "total": 1800.90
}]

module.exports = {
    testLskinInsert,
    testLeclientInsert,
    testLeinvoiceInsert,
    testLeitemInsert,
    expectedInvoiceArray
}