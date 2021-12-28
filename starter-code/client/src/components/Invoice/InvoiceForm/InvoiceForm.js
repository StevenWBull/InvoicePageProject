import React, { Component } from 'react';
import { ReactComponent as TrashCan } from '../../../assets/icon-delete.svg';
import { ReactComponent as IconPlus } from '../../../assets/icon-plus.svg';
import './InvoiceForm.css';

export default class InvoiceForm extends Component {
    renderItems = (itemArr) => {
        let items = (
            <div className="column-flex-item">
                <input className="itemName" id="-1" name="itemName" defaultValue=""></input>
                <input className="quantity" id="-1" name="quantity" defaultValue="" type="number"></input>
                <input className="price" id="-1" name="price" defaultValue="0.00" type="number"></input>
                <span className="total" defaultValue="0.00"></span>
                <span className="trashcan"><TrashCan /></span>
            </div>
        );

        if (itemArr.length) {
            let negativeCount = -1
            items = itemArr.map((item) => {
                const liid = 'liid' in item ? item.liid : negativeCount;
                negativeCount--;
                return (
                    <div className="column-flex-item" key={liid}>
                        <input className="itemName" id={liid} name={'itemName'} defaultValue={item.name || item.itemName}></input>
                        <input className="quantity" id={liid} name={'quantity'} defaultValue={item.quantity} type="number"></input>
                        <input className="price" id={liid} name={'price'} defaultValue={Number(item.price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} type="number"></input>
                        <span className="total">{item.total ? Number(item.total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00'}</span>
                        <span className="trashcan"><TrashCan /></span>
                    </div>
                )
            })
        }
        

        return items;
    }

    render() {
        const { formType, onCLickDiscardInvoiceForm, onSaveFormSubmit, invalidForm, formData, handleAddItem, itemArr } = this.props;
        return (
            <section className="invoice-form-section">
                <div className="invoice-form-cont">
                    <h1>{formType === "save" ? 'New Invoice' : `Edit #${this.props.invoice.id}` }</h1>
                    <form onSubmit={onSaveFormSubmit()} action="" id="invoice-form">
                        <div className="bill-from">
                            <h4 className="blue-text">Bill From</h4>
                            <label htmlFor="streetAddress">Street Address</label>
                            <input className="streetAddress" name="streetAddress" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.street : Object.keys(formData).length ? formData.streetAddress : ''}></input>
                            <div className="three-input-flex">
                                <div className="column-flex">
                                    <label htmlFor="city">City</label>
                                    <input className="city" name="city" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.city : Object.keys(formData).length ? formData.city : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="postalCode">Post Code</label>
                                    <input className="postalCode" name="postCode" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.postCode : Object.keys(formData).length ? formData.postCode : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="country">Country</label>
                                    <input className="country" name="country" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.country : Object.keys(formData).length ? formData.country : ''}></input>
                                </div>
                            </div>
                        </div>
                        <div className="bill-to">
                            <h4 className="blue-text">Bill To</h4>
                            <label htmlFor="clientName">Client's Name</label>
                            <input className="clientName" name="clientName" defaultValue={formType === 'edit' ? this.props.invoice.clientName : Object.keys(formData).length ? formData.clientName : ''}></input>
                            <label htmlFor="clientEmail">Client's Email</label>
                            <input className="clientEmail" name="clientEmail" defaultValue={formType === 'edit' ? this.props.invoice.clientEmail : Object.keys(formData).length ? formData.clientEmail : ''}></input>
                            <label htmlFor="clientStreetAddress">Street Address</label>
                            <input className="clientStreetAddress" name="clientStreetAddress" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.street : Object.keys(formData).length ? formData.clientStreetAddress : ''}></input>
                            <div className="three-input-flex">
                                <div className="column-flex">
                                    <label htmlFor="clientCity">City</label>
                                    <input className="clientCity" name="clientCity" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.city : Object.keys(formData).length ? formData.clientCity : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="clientPostalCode">Post Code</label>
                                    <input className="clientPostalCode" name="clientPostalCode" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.postCode : Object.keys(formData).length ? formData.clientPostalCode : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="clientCountry">Country</label>
                                    <input className="clientCountry" name="clientCountry" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.country : Object.keys(formData).length ? formData.clientCountry : ''}></input>
                                </div>
                            </div>
                        </div>
                        <div className="payment-details">
                            <div className="two-item-flex">
                                <div className="column-flex left">
                                    <label htmlFor="issueDate">Issue Date</label>
                                    <input className="issueDate" name="issueDate" placeholder="ie. 12 Aug 2021" defaultValue={formType === 'edit' ? this.props.invoice.createdAt : Object.keys(formData).length ? formData.issueDate : ''}></input>
                                </div>
                                <div className="column-flex right">
                                    <label htmlFor="paymentTerms">Payment Terms</label>
                                    <input className="paymentTerms" name="paymentTerms" defaultValue={formType === 'edit' ? this.props.invoice.paymentTerms : Object.keys(formData).length ? formData.paymentTerms : ''} type="number" min="0" max="365"></input>
                                </div>
                            </div>
                            <label htmlFor="projectDescription">Project Description</label>
                            <input className="projectDescription" name="projectDescription" defaultValue={formType === 'edit' ? this.props.invoice.description : Object.keys(formData).length ? formData.projectDescription : ''}></input>
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
                                {formType === 'save' ? Object.keys(formData).length ? this.renderItems(formData.items) :  this.renderItems(itemArr) : this.renderItems(itemArr)}
                            </div>
                            <button type="button" className="btn btn-add-new-item" onClick={handleAddItem()}><IconPlus /><h4>Add New Item</h4></button>
                        </div>
                        {invalidForm && <h3 style={{'color': 'red', 'textAlign': 'center'}}>* Please be sure to fill out all fields and add atleast one item before saving!</h3>}
                        <div className="button-cont" style={formType === 'save' ? {} : {'justifyContent': 'flex-end'}}>
                            {formType === 'save' && <button type="button" className="btn btn-discard" onClick={onCLickDiscardInvoiceForm()}><h4>Discard</h4></button>}
                            <div className="save-btn-cont">
                                {formType === 'save' ? <button type="submit" id="save-draft" className="btn btn-save-draft">Save as Draft</button> : <button type="button" className="btn btn-save-draft" onClick={onCLickDiscardInvoiceForm()}>Cancel</button>}
                                <button type="submit" id={formType === 'save' ? 'save' : 'save-edit' } className="btn btn-primary btn-save"> {formType === 'save' ? 'Save & Send' : 'Save Changes'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}