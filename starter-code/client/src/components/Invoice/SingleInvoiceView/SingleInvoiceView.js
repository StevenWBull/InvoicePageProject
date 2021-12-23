import React, { Component } from 'react';
import { ReactComponent as LeftArrow } from '../../../assets/icon-arrow-left.svg';
import './SingleInvoiceView.css';

export default class SingleInvoiceView extends Component {
    render() {
        return (
            <section className="single-invoice-page-cont">
                <div className="box1">
                    <div className="go-back-cont">
                    <LeftArrow /> <h3>Go Back</h3>
                    </div>
                </div>
                <div className="box2">
                    <div className="box2-left-side">
                        <h3>Status</h3>
                        <h3>&#9679;  Pending</h3>
                    </div>
                    <div className="box2-right-side">
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>Mark as Paid</button>
                    </div>
                </div>
                <div className="box3">
                    <div className="box3-details-outer-box">
                        <div className="invoice-details-cont">
                            <div className="invoice-details-title">
                                <div>
                                    <h2>#XM9141</h2>
                                    <h3>Graphic Design</h3>
                                </div>
                                <div className="title-flex">
                                    <span>19 Union Terrace</span>
                                    <span>London</span>
                                    <span>E1 3EZ</span>
                                    <span>United Kingdom</span>
                                </div>
                            </div>
                            <div className="invoice-details">
                                <div className="payment-cont">
                                    <div>
                                        <h3>Invoice Date</h3>
                                        <h2>21 Aug 2021</h2>
                                    </div>
                                    <div>
                                        <h3>Payment Due</h3>
                                        <h2>21 Aug 2021</h2>
                                    </div>
                                </div>
                                <div className="billing-info-cont">
                                    <h3>Bill To</h3>
                                    <h2>Alex Grim</h2>
                                    <span>84 Church Way</span>
                                    <span>Bradford</span>
                                    <span>BD1 9PB</span>
                                    <span>United Kingdom</span>
                                </div>
                                <div className="sent-to-cont">
                                    <h3>Sent To</h3>
                                    <h2>alexgrim@mail.com</h2>
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
                                <div className="item-cont">
                                    <h3 className="name">Banner Design</h3>
                                    <h3 className="quantity">1</h3>
                                    <h3 className="price">$ 156.00</h3>
                                    <h3 className="total">$ 156.00</h3>
                                </div>
                                <div className="item-cont">
                                    <h3 className="name">Email Design</h3>
                                    <h3 className="quantity">2</h3>
                                    <h3 className="price">$ 200.00</h3>
                                    <h3 className="total">$ 400.00</h3>
                                </div>
                            </div>
                            <div className="invoice-total">
                                <h3>Amount Due</h3>
                                <h1>$ 556.00</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}