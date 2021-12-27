const multiline = require('multiline');

const InvoiceService = {
    getAllInvoices(db) {
        const getInvoiceQuery = multiline.stripIndent(() => {/* 
                select json_build_object(
                    'lvid', lv.leinvoiceid,
                    'lcid', lc.leclientid,
                    'lsid', ls.lskinid,
                    'id', lv.id,
                    'createdAt', to_char(lv.created_timestamp::timestamp, 'DD Mon YYYY'),
                    'paymentDue', to_char(lv.payment_due::timestamp, 'DD Mon YYYY'),
                    'description', lv.description,
                    'paymentTerms', lv.payment_terms,
                    'clientName', TRIM(CONCAT(lc.first_name, ' ', lc.last_name)),
                    'clientEmail', lc.email,
                    'status', lv.status,
                    'senderAddress', 
                        json_build_object(
                            'street', ls.street,
                            'city', ls.city,
                            'postCode', ls.postcode,
                            'country', ls.country 
                        ),
                    'clientAddress', 
                        json_build_object(
                            'street', lc.street,
                            'city', lc.city,
                            'postCode', lc.postcode,
                            'country', lc.country 
                        ),
                    'items', 
                        json_agg(json_build_object('liid', li.leitemid, 'name', li.refname, 'quantity', li.quantity, 'price', round(cast(li.price as numeric), 2), 'total', round(cast(li.price * quantity as numeric), 2))),
                    'total', SUM(round(cast(li.price * quantity as numeric), 2))
                ) 
                from leinvoice lv
                inner join leclient lc on lc.leclientid = lv.frn_leclientid 
                inner join lskin ls on ls.lskinid = lc.frn_lskinid
                left join leitem li on li.frn_leinvoiceid  = lv.leinvoiceid
                where lv.deleted_timestamp is null
                group by lv.leinvoiceid, lc.leclientid, ls.lskinid;
        */})
        return db.raw(getInvoiceQuery);
    },
    deactivateInvoice(db, lvid) {
        return db 
            .from('leinvoice')
            .where({ 'leinvoiceid': lvid })
            .update({ 'deleted_timestamp': 'NOW()' })
    },
    deactivateItems(db, lvid) {
        return db 
            .from('leitem')
            .where({ 'frn_leinvoiceid': lvid })
            .update({ 'deleted_timestamp': 'NOW()' })
    },
    createInvoiceId(db, charLength, numLength) {
        if (typeof charLength !== 'number' || typeof numLength !== 'number')
            throw Error('Two numbers must be given to .createInvoiceId() method')

        const totalLength = charLength + numLength;
        const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let newId = '';
        for (let i = 0; i < totalLength; i++) {
            if (i < charLength)
                newId += upperAlphabet.charAt(Math.floor(Math.random() * upperAlphabet.length))
            else
                newId += Math.floor(Math.random() * 10);
        }
        
        return db
            .select('*')
            .from('leinvoice')
            .where({ 'id': newId })
            .then((data) => {
                if (!data.length) {
                    return newId;
                }
                else
                    return this.createInvoiceId(db, charLength, numLength)
            })
    },
    checkIfLskinExits(db, lskinObj) {
        return db
            .select('lskinid')
            .from('lskin')
            .where(lskinObj)
            .then((data) => data.length ? data[0].lskinid : 0)
    },
    insertNewLskin(db, lskinObj) {
        return db
            .insert(lskinObj, 'lskinid')
            .returning('*')
            .into('lskin')
            .then((data) => data[0].lskinid)
    },
    insertNewClient(db, clientObj) {
        return db
            .insert(clientObj, 'leclientid')
            .returning('*')
            .into('leclient')
            .then((data) => data[0].leclientid)
    },
    insertNewInvoice(db, invoiceObj) {
        return db
            .insert(invoiceObj, 'leinvoiceid')
            .returning('*')
            .into('leinvoice')
            .then((data) => data[0].leinvoiceid)
    },
    insertNewItems(db, itemObj) {
        return db
            .insert(itemObj)
            .into('leitem')
    }
}

module.exports = InvoiceService;
