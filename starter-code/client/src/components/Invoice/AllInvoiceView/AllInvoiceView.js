import React, { Component } from 'react';
import EmptyInvoiceView from '../EmptyInvoiceView/EmptyInvoiceView';
import InvoiceForm from '../InvoiceForm/InvoiceForm';
import { ReactComponent as ArrowDown } from '../../../assets/icon-arrow-down.svg';
import './AllInvoiceView.css'

export default class AllInvoiceView extends Component {
    render() {
        const { showCreateInvoiceForm } = this.props;
        return (
            <>
                { showCreateInvoiceForm && <InvoiceForm /> }
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
                                <span>Filter by status</span><ArrowDown />
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
            </>
        )
    }
}