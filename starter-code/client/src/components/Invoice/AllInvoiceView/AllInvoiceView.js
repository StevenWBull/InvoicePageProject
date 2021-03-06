import React, { Component } from 'react';
import InvoiceForm from '../InvoiceForm/InvoiceForm';
import { ReactComponent as IconPlus } from '../../../assets/icon-plus.svg';
import './AllInvoiceView.css'

export default class AllInvoiceView extends Component {
    render() {
        const { showCreateInvoiceForm, onFilterSelect, onClickCreateInvoiceForm, onCLickDiscardInvoiceForm, onSaveFormSubmit, renderInvoices, invoiceCount, formData, invalidForm, itemArr, handleAddItem } = this.props;
        return (
            <>
                { showCreateInvoiceForm && <InvoiceForm formType="save" onCLickDiscardInvoiceForm={onCLickDiscardInvoiceForm} onSaveFormSubmit={onSaveFormSubmit} formData={formData} invalidForm={invalidForm} itemArr={itemArr} handleAddItem={handleAddItem}  /> }
                <section className="invoice-page-cont">
                    <div className="invoice-title-cont">
                        <div>
                            <div>
                                <h1>Invoices</h1>
                                <span>There are currently {invoiceCount} invoices</span>
                            </div>
                        </div>
                        <div className="invoice-filter-btn-cont">
                            <div className="filter-cont">
                                <select className="filter-dd" value="default" onChange={onFilterSelect()}>
                                    <option value="default" disabled>Filter by Status </option>
                                    <option value="">No Filter</option>
                                    <option value="paid">Paid</option>
                                    <option value="pending">Pending</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                            <div>
                                <button id="new-invoice-btn" className="btn btn-primary" onClick={onClickCreateInvoiceForm()}><div className="icon-plus-cont"><IconPlus /></div><h4>New Invoice</h4></button>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-cont">
                        {renderInvoices}
                    </div>
                </section>
            </>
        )
    }
}