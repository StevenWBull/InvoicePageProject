import React, { Component } from 'react';
import { ReactComponent as TrashCan } from '../../../assets/icon-delete.svg';
import { ReactComponent as IconPlus } from '../../../assets/icon-plus.svg';
import './InvoiceForm.css';

export default class InvoiceForm extends Component {
    render() {
        const { onCLickDiscardInvoiceForm, onCLickSaveInvoiceForm } = this.props;
        return (
            <section className="invoice-form-section">
                <div className="invoice-form-cont">
                    <h1>New Invoice</h1>
                    <form id="invoice-form">
                        <div className="bill-from">
                            <h4 className="blue-text">Bill From</h4>
                            <label htmlFor="streetAddress">Street Address</label>
                            <input className="streetAddress" name="streetAddress"></input>
                            <div className="three-input-flex">
                                <div className="column-flex">
                                    <label htmlFor="city">City</label>
                                    <input className="city" name="city"></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="postalCode">Post Code</label>
                                    <input className="postalCode" name="postalCode"></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="country">Country</label>
                                    <input className="country" name="country"></input>
                                </div>
                            </div>
                        </div>
                        <div className="bill-to">
                            <h4 className="blue-text">Bill To</h4>
                            <label htmlFor="clientName">Client's Name</label>
                            <input className="clientName" name="clientName"></input>
                            <label htmlFor="clientEmail">Client's Email</label>
                            <input className="clientEmail" name="clientEmail"></input>
                            <label htmlFor="clientStreetAddress">Street Address</label>
                            <input className="clientStreetAddress" name="clientStreetAddress"></input>
                            <div className="three-input-flex">
                                <div className="column-flex">
                                    <label htmlFor="clientCity">City</label>
                                    <input className="clientCity" name="clientCity"></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="clientPostalCode">Post Code</label>
                                    <input className="clientPostalCode" name="clientPostalCode"></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="clientCountry">Country</label>
                                    <input className="clientCountry" name="clientCountry"></input>
                                </div>
                            </div>
                        </div>
                        <div className="payment-details">
                            <div className="two-item-flex">
                                <div className="column-flex left">
                                    <label htmlFor="issueDate">Issue Date</label>
                                    <input className="issueDate" name="issueDate"></input>
                                </div>
                                <div className="column-flex right">
                                    <label htmlFor="paymentTerms">Payment Terms</label>
                                    <input className="paymentTerms" name="paymentTerms"></input>
                                </div>
                            </div>
                            <label htmlFor="projectDescription">Project Description</label>
                            <input className="projectDescription" name="projectDescription"></input>
                        </div>
                        <div className="payment-details">
                            <h3>Item List</h3>
                            <div className="five-item-flex">
                                <div className="column-flex-item title">
                                    <span className="itemName">Item Name</span>
                                    <span className="quantity">Qty.</span>
                                    <span className="price">Price</span>
                                    <span className="total">Total</span>
                                    <span className="trashcan"></span>
                                </div>
                                <div className="column-flex-item">
                                    <input className="itemName" name="itemName" value="Banner Design"></input>
                                    <input className="quantity" name="quantity" value="1"></input>
                                    <input className="price" name="price" value="156.00"></input>
                                    <span className="total">156.00</span>
                                    <span className="trashcan"><TrashCan /></span>
                                </div>
                                <div className="column-flex-item">
                                    <input className="itemName" name="itemName" value="Email Design"></input>
                                    <input className="quantity" name="quantity" value="2"></input>
                                    <input className="price" name="price" value="200.00"></input>
                                    <span className="total">400.00</span>
                                    <span className="trashcan"><TrashCan /></span>
                                </div>
                            </div>
                            <button className="btn btn-add-new-item"><IconPlus /><h4>Add New Item</h4></button>
                        </div>
                        <div className="button-cont">
                            <button className="btn btn-discard" onClick={onCLickDiscardInvoiceForm()}><h4>Discard</h4></button>
                            <div className="save-btn-cont">
                                <button className="btn btn-save-draft" onClick={onCLickSaveInvoiceForm()}>Save as Draft</button>
                                <button className="btn btn-primary btn-save" onClick={onCLickSaveInvoiceForm()}>Save & Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}