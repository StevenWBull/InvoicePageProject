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
                <div className="box3"></div>
            </section>
        )
    }
}