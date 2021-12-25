import React, { Component } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AllInvoiceView from '../../components/Invoice/AllInvoiceView/AllInvoiceView';
import SingleInvoiceView from '../../components/Invoice/SingleInvoiceView/SingleInvoiceView';
import InvoiceItem from '../../components/Invoice/InvoiceItem/InvoiceItem';
import InvoiceApiService from '../../services/invoiceApiService';
import './InvoicePage.css';
import EmptyInvoiceView from '../../components/Invoice/EmptyInvoiceView/EmptyInvoiceView';

export default class InvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: [],
            invoiceCount: 0,
            singleInvoiceView: false,
            showCreateInvoiceForm: false,
            showEditInvoiceForm: false
        };
    }

    componentDidMount() {
        this.getInvoices()
    }

    getInvoices = () => {
        return InvoiceApiService.getInvoiceArray()
            .then(data => {
                this.setState({ invoice: data });
                this.setState({ invoiceCount: data.length })
                return data;
            })
    }

    renderInvoices = () => {
        const invoices = this.state.invoice;
        if (invoices === [{}])
        return <EmptyInvoiceView />
    
        const invoicesArr = invoices.map((invoice, idx) => 
            <InvoiceItem />
        )
        console.log('invoicesArr => ', invoicesArr)
        return invoicesArr;
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
                    : <AllInvoiceView 
                        showCreateInvoiceForm={this.state.showCreateInvoiceForm} 
                        onClickCreateInvoiceForm={() => this.showCreateInvoiceForm} 
                        onCLickDiscardInvoiceForm={() => this.discardInvoiceForm} 
                        onCLickSaveInvoiceForm={() => this.saveInvoiceForm}
                        renderInvoices={this.renderInvoices()}
                        invoiceCount={this.state.invoiceCount} /> }
            </>
        );
    }
}