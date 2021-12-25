import React, { Component } from 'react';
import { ReactComponent as ArrowRight } from '../../../assets/icon-arrow-right.svg';
import './InvoiceItem.css';

export default class InvoiceItem extends Component {
    render() {
        return (
            <div className="invoice-item-cont">
                <h2>#RT3080</h2>
                <h3>Due 19 Aug 2021</h3>
                <h3>Alex Grim</h3>
                <h1>$1,800.90</h1>
                <div className="pending-cont">
                    &#9679; Pending
                </div>
                <ArrowRight />
            </div>
        );
    }
}