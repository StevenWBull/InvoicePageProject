import React, { Component } from 'react';
import { ReactComponent as EmptyIllustration } from '../../../assets/illustration-empty.svg';
import './EmptyInvoiceView.css';

export default class EmptyInvoiceView extends Component {
    render() {
        return (
            <div className="empty-view">
            <EmptyIllustration />
            <h1>There is nothing here</h1>
            <span>Create an invoice by clicking the</span><br/>
            <span><strong>New Invoice</strong> button and get started</span>
        </div>
        );
    }
}