import React, { Component } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AllInvoiceView from '../../components/Invoice/AllInvoiceView/AllInvoiceView';
import SingleInvoiceView from '../../components/Invoice/SingleInvoiceView/SingleInvoiceView';
import './InvoicePage.css';

export default class InvoicePage extends Component {
    render() {
        return (
            <>
                <SideNav />
                {/* <AllInvoiceView /> */}
                <SingleInvoiceView />
            </>
        );
    }
}