import React, { Component } from 'react';
import { ReactComponent as ArrowRight } from '../../../assets/icon-arrow-right.svg';
import './InvoiceItem.css';

export default class InvoiceItem extends Component {
    render() {
        const { id, status, total, clientName, onClickShowSingleInvoice } = this.props;
        const formattedTotal = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return (
            <div className="invoice-item-cont" onClick={onClickShowSingleInvoice()}>
                <h2>#{id}</h2>
                <h3>Due 19 Aug 2021</h3>
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