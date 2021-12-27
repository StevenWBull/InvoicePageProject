import React, { Component } from 'react';
import { ReactComponent as ArrowRight } from '../../../assets/icon-arrow-right.svg';
import './InvoiceItem.css';

export default class InvoiceItem extends Component {
    render() {
        const { lvid, id, paymentDue, status, total, clientName, onClickShowSingleInvoice } = this.props;
        const formattedTotal = total ? total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00';
        return (
            <div className="invoice-item-cont" key={lvid} onClick={(lvid, event) => onClickShowSingleInvoice()}>
                <h2>#{id}</h2>
                <h3>Due {paymentDue}</h3>
                <h3>{clientName}</h3>
                <h1>$ {formattedTotal}</h1>
                <div>
                    <div className="status-cont">
                        &#9679; {status}
                    </div>
                </div>
                <ArrowRight />
            </div>
        );
    }
}