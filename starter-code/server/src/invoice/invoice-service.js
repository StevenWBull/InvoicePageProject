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
                group by lv.leinvoiceid, lc.leclientid, ls.lskinid;
        */})
        return db.raw(getInvoiceQuery);
    }
}

module.exports = InvoiceService;
