import React, { Component } from 'react';
import { ReactComponent as LeftArrow } from '../../../assets/icon-arrow-left.svg';
import InvoiceForm from '../InvoiceForm/InvoiceForm';
import MessageModal from '../../MessageModal/MessageModal';
import './SingleInvoiceView.css';

export default class SingleInvoiceView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showDeletePrompt: false,
            deleteInvoice: false,
        }
    }

    onClickDelete = () => {
        this.setState({ showDeletePrompt: true })
    }

    cancelInvoiceDeletion = () => {
        this.setState({ showDeletePrompt: false })
    }

    renderItems = (items) => {
        const loadItems = items.map((item, idx) => (
                <div className="item-cont" key={idx}>
                    <h3 className="name">{item.name}</h3>
                    <h3 className="quantity">{item.quantity}</h3>
                    <h3 className="price">$ {item.price ? item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00'}</h3>
                    <h3 className="total">$ {item.total ? item.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00'}</h3>
                </div>
        ))
        return loadItems;
    }

    render() {
        const { showEditInvoiceForm, onClickEditInvoiceForm, onCLickDiscardInvoiceForm, onSaveFormSubmit, onClickDeactivateInvoice, goBack, singleInvoiceObj, itemArr, handleAddItem, invalidForm, updateInvoiceStatus } = this.props;
        const { status, id, items, paymentDue, createdAt, description, clientName, clientEmail, senderAddress, clientAddress, total } = singleInvoiceObj;
        
        return (
            <>
                { this.state.showDeletePrompt && <MessageModal cancelInvoiceDeletion={() => this.cancelInvoiceDeletion} onClickDeactivateInvoice={() => onClickDeactivateInvoice()}  />}
                { showEditInvoiceForm && <InvoiceForm formType="edit" onCLickDiscardInvoiceForm={onCLickDiscardInvoiceForm} onSaveFormSubmit={onSaveFormSubmit} invoice={singleInvoiceObj} invalidForm={invalidForm} itemArr={itemArr} handleAddItem={handleAddItem} /> }
                <section className="single-invoice-page-cont">
                    <div className="box1">
                        <div className="go-back-cont" onClick={goBack()}>
                            <LeftArrow /> <h3>Go Back</h3>
                        </div>
                    </div>
                    <div className="box2">
                        <div className="box2-left-side">
                            <h3>Status</h3>
                            <div className="single-view-status-cont">
                                <h3>&#9679; {status}</h3>
                            </div>
                        </div>
                        <div className="box2-right-side" style={status === 'draft' ? {'width': '24%'} : {}}>
                            <button className='btn btn-edit single-invoice-btn' onClick={onClickEditInvoiceForm()}><h4>Edit</h4></button>
                            <button className='btn btn-discard single-invoice-btn' onClick={this.onClickDelete}><h4>Delete</h4></button>
                            {status !== 'draft' && <button className='btn btn-primary single-invoice-btn' onClick={updateInvoiceStatus()}><h4>Mark as {status === 'paid' ? 'Unpaid' : 'Paid'}</h4></button>}
                        </div>
                    </div>
                    <div className="box3">
                        <div className="box3-details-outer-box">
                            <div className="invoice-details-cont">
                                <div className="invoice-details-title">
                                    <div>
                                        <h2>#{id}</h2>
                                        <h3>{description}</h3>
                                    </div>
                                    <div className="title-flex">
                                        <span>{senderAddress.street}</span>
                                        <span>{senderAddress.city}</span>
                                        <span>{senderAddress.postCode}</span>
                                        <span>{senderAddress.country}</span>
                                    </div>
                                </div>
                                <div className="invoice-details">
                                    <div className="payment-cont">
                                        <div>
                                            <h3>Invoice Date</h3>
                                            <h2>{createdAt}</h2>
                                        </div>
                                        <div>
                                            <h3>Payment Due</h3>
                                            <h2>{paymentDue}</h2>
                                        </div>
                                    </div>
                                    <div className="billing-info-cont">
                                        <h3>Bill To</h3>
                                        <h2>{clientName}</h2>
                                        <span>{clientAddress.street}</span>
                                        <span>{clientAddress.city}</span>
                                        <span>{clientAddress.postCode}</span>
                                        <span>{clientAddress.country}</span>
                                    </div>
                                    <div className="sent-to-cont">
                                        <h3>Sent To</h3>
                                        <h2>{clientEmail ? clientEmail : 'No Email on File'}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="invoice-items-cont">
                                <div className="invoice-items">
                                    <div className="item-title-cont">
                                        <h3 className="name">Item Name</h3>
                                        <h3 className="quantity">QTY.</h3>
                                        <h3 className="price">Price</h3>
                                        <h3 className="total">Total</h3>
                                    </div>
                                    {this.renderItems(items)}
                                </div>
                                <div className="invoice-total">
                                    <h3>Amount Due</h3>
                                    <h1>$ {total ? total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.00'}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}