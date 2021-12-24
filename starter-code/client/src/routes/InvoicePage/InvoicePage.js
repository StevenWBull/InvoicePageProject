import React, { Component } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AllInvoiceView from '../../components/Invoice/AllInvoiceView/AllInvoiceView';
import SingleInvoiceView from '../../components/Invoice/SingleInvoiceView/SingleInvoiceView';
import './InvoicePage.css';

export default class InvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singleInvoiceView: false,
            showCreateInvoiceForm: false,
            showEditInvoiceForm: false
        };
    }

    render() {
        return (
            <>
                <SideNav />
                { this.state.singleInvoiceView 
                    ? <SingleInvoiceView showEditInvoiceForm={this.state.showEditInvoiceForm} /> 
                    : <AllInvoiceView showCreateInvoiceForm={this.state.showCreateInvoiceForm} /> }
            </>
        );
    }
}