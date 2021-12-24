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

    showCreateInvoiceForm = () => {
        return this.setState({ showCreateInvoiceForm: true });
    }

    discardInvoiceForm = () => {
        return this.setState({ showCreateInvoiceForm: false });
    }

    saveInvoiceForm = () => {
        return this.setState({ showCreateInvoiceForm: false });
    }

    render() {
        return (
            <>
                <SideNav />
                { this.state.singleInvoiceView 
                    ? <SingleInvoiceView 
                        showEditInvoiceForm={this.state.showEditInvoiceForm}
                        onCLickSaveInvoiceForm={() => this.saveInvoiceForm} /> 
                    : <AllInvoiceView showCreateInvoiceForm={this.state.showCreateInvoiceForm} onClickCreateInvoiceForm={() => this.showCreateInvoiceForm} onCLickDiscardInvoiceForm={() => this.discardInvoiceForm} onCLickSaveInvoiceForm={() => this.saveInvoiceForm} /> }
            </>
        );
    }
}