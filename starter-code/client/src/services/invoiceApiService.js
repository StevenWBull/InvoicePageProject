import config from '../config';

const InvoiceApiService = {
    getInvoiceArray() {
        return fetch(`${config.API_ENDPOINT}/invoice`, {})
            .then(res =>  
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .catch(error => {
                console.log(error)
            })
    },
    deactivateInvoice(lvid) {
        const payload = JSON.stringify({ lvid: lvid })
        return fetch(
            `${config.API_ENDPOINT}/invoice/deactivate`, 
            { 
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: payload 
            }
        )
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
            .catch(error => {
                console.log(error)
            })
    }
}

export default InvoiceApiService;