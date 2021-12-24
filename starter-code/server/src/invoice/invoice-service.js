const InvoiceService = {
    getAllInvoices(db) {
        return db
            .select('*')
            .from('leinvoice as lv')
            .innerJoin(
                'leclient as lc',
                'lv.frn_leclientid',
                'leclientid'
            )
            .innerJoin(
                'lskin as ls',
                'lc.frn_lskinid',
                'lskinid'
            )
    }
}

/* 
  {
    "id": "TY9141",
    "createdAt": "2021-10-01",
    "paymentDue": "2021-10-31",
    "description": "Landing Page Design",
    "paymentTerms": 30,
    "clientName": "Thomas Wayne",
    "clientEmail": "thomas@dc.com",
    "status": "pending",
    "senderAddress": {
      "street": "19 Union Terrace",
      "city": "London",
      "postCode": "E1 3EZ",
      "country": "United Kingdom"
    },
    "clientAddress": {
      "street": "3964  Queens Lane",
      "city": "Gotham",
      "postCode": "60457",
      "country": "United States of America"
    },
    "items": [
      {
        "name": "Web Design",
        "quantity": 1,
        "price": 6155.91,
        "total": 6155.91
      }
    ],
    "total": 6155.91
  }
*/

/* 
select json_build_object(
	'lvid', lv.leinvoiceid,
	'lcid', lc.leclientid,
	'lsid', ls.lskinid,
	'id', lv.id,
	'createdAt', to_char(lv.created_timestamp::timestamp, 'YYYY-MM-DD'),
	'paymentDue', to_char(lv.payment_due::timestamp, 'YYYY-MM-DD'),
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
*/