import React, { Component } from 'react';
import { ReactComponent as TrashCan } from '../../../assets/icon-delete.svg';
import { ReactComponent as IconPlus } from '../../../assets/icon-plus.svg';
import './InvoiceForm.css';

export default class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewItem: false
        }
    }
    renderItems = (itemArr=[]) => {
        let items = (
            <div className="column-flex-item">
                <input className="itemName" name="itemName1" defaultValue=""></input>
                <input className="quantity" name="quantity1" defaultValue=""></input>
                <input className="price" data-itemNum="1" name="price1" defaultValue=""></input>
                <span className="total">0.00</span>
                <span className="trashcan"><TrashCan /></span>
            </div>
        );

        if (itemArr.length)
            items = itemArr.map((item, idx) => (
                <div className="column-flex-item" key={idx}>
                    <input className="itemName" name={'itemName' + idx} value="Email Design" defaultValue={item.name}></input>
                    <input className="quantity" name={'quantity' + idx} value="2" defaultValue={item.quantity}></input>
                    <input className="price" name={'price' + idx} value="200.00" defaultValue={item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}></input>
                    <span className="total">{item.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
                    <span className="trashcan"><TrashCan /></span>
                </div>
            ))
        
        return items;
    }

    handleAddItem = () => {
        console.log('updating')
        this.setState({ addNewItem: true });
    }

    addItem = () => {
        const item = (
            <div className="column-flex-item">
                <input className="itemName" name="itemName" defaultValue=""></input>
                <input className="quantity" name="quantity" defaultValue=""></input>
                <input className="price" name="price" defaultValue=""></input>
                <span className="total">0.00</span>
                <span className="trashcan"><TrashCan /></span>
            </div>
        );

        return item;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target.elements;
        console.log(e.target.elements)
        const dataObj = { items: []};
        const itemIdentifier = ['itemName', 'quantity', 'price', 'quantity']
        for (let i = 0; i < inputs.length; i++) {
            if (itemIdentifier.includes(inputs[i].name))
                console.log(inputs[i])
            else
                dataObj[inputs[i].name] = inputs[i].value
        }
        console.log(dataObj)
    }

    render() {
        const { formType, onCLickSaveInvoiceForm } = this.props;
        return (
            <section className="invoice-form-section">
                <div className="invoice-form-cont">
                    <h1>{formType === "save" ? 'New Invoice' : 'Edit Invoice'}</h1>
                    <form onSubmit={(e) => this.onSubmit(e)} action="" id="invoice-form">
                        <div className="bill-from">
                            <h4 className="blue-text">Bill From</h4>
                            <label htmlFor="streetAddress">Street Address</label>
                            <input className="streetAddress" name="streetAddress" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.street : ''}></input>
                            <div className="three-input-flex">
                                <div className="column-flex">
                                    <label htmlFor="city">City</label>
                                    <input className="city" name="city" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.city : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="postalCode">Post Code</label>
                                    <input className="postalCode" name="postalCode" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.postCode : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="country">Country</label>
                                    <input className="country" name="country" defaultValue={formType === 'edit' ? this.props.invoice.senderAddress.country : ''}></input>
                                </div>
                            </div>
                        </div>
                        <div className="bill-to">
                            <h4 className="blue-text">Bill To</h4>
                            <label htmlFor="clientName">Client's Name</label>
                            <input className="clientName" name="clientName" defaultValue={formType === 'edit' ? this.props.invoice.clientName : ''}></input>
                            <label htmlFor="clientEmail">Client's Email</label>
                            <input className="clientEmail" name="clientEmail" defaultValue={formType === 'edit' ? this.props.invoice.clientEmail : ''}></input>
                            <label htmlFor="clientStreetAddress">Street Address</label>
                            <input className="clientStreetAddress" name="clientStreetAddress" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.street : ''}></input>
                            <div className="three-input-flex">
                                <div className="column-flex">
                                    <label htmlFor="clientCity">City</label>
                                    <input className="clientCity" name="clientCity" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.city : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="clientPostalCode">Post Code</label>
                                    <input className="clientPostalCode" name="clientPostalCode" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.postCode : ''}></input>
                                </div>
                                <div className="column-flex">
                                    <label htmlFor="clientCountry">Country</label>
                                    <input className="clientCountry" name="clientCountry" defaultValue={formType === 'edit' ? this.props.invoice.clientAddress.country : ''}></input>
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
                            <input className="projectDescription" name="projectDescription" defaultValue={formType === 'edit' ? this.props.invoice.description : ''}></input>
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
                                {formType === 'save' ? this.renderItems() : this.renderItems(this.props.invoice.items)}
                                {this.state.addNewItem ? this.addItem : ''}
                            </div>
                            <button type="button" className="btn btn-add-new-item" onClick={() => this.handleAddItem()}><IconPlus /><h4>Add New Item</h4></button>
                        </div>
                        <div className="button-cont" style={formType === 'save' ? {} : {'justifyContent': 'flex-end'}}>
                            {formType === 'save' && <button type="button" className="btn btn-discard" onClick={this.props.onCLickDiscardInvoiceForm()}><h4>Discard</h4></button>}
                            <div className="save-btn-cont">
                                {formType === 'save' && <button type="button" className="btn btn-save-draft" onClick={onCLickSaveInvoiceForm()}>Save as Draft</button>}
                                <button type="submit" className="btn btn-primary btn-save">Save & Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}