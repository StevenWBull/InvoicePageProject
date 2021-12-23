import React, { Component } from 'react';
import EmptyInvoiceView from '../EmptyInvoiceView/EmptyInvoiceView';
import './AllInvoiceView.css'

export default class AllInvoiceView extends Component {
    render() {
        return (
            <section className="invoice-page-cont">
                <div className="invoice-title-cont">
                    <div>
                        <div>
                            <h1>Invoices</h1>
                            <span>There are currently 7 invoices</span>
                        </div>
                    </div>
                    <div className="invoice-filter-btn-cont">
                        <div className="filter-cont">
                            Filter by status <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
                        </div>
                        <div>
                            <button>New Invoice</button>
                        </div>
                    </div>
                </div>
                <div className="invoice-cont">
                    <EmptyInvoiceView />
                </div>
            </section>
        )
    }
}