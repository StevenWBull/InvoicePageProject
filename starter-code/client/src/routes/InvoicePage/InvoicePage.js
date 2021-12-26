import React, { Component } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import AllInvoiceView from '../../components/Invoice/AllInvoiceView/AllInvoiceView';
import SingleInvoiceView from '../../components/Invoice/SingleInvoiceView/SingleInvoiceView';
import InvoiceItem from '../../components/Invoice/InvoiceItem/InvoiceItem';
import InvoiceApiService from '../../services/invoiceApiService';
import './InvoicePage.css';
import EmptyInvoiceView from '../../components/Invoice/EmptyInvoiceView/EmptyInvoiceView';
import { useParams } from 'react-router-dom';

export default class InvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: [],
            invoiceCount: 0,
            singleInvoiceView: false,
            singleInvoice: {},
            showCreateInvoiceForm: false,
            showEditInvoiceForm: false
        };
    }

    componentDidMount() {
        this.getInvoices();
    }

    checkURLParams = () => {
        const url = window.location.href;
        const param = 'invoice';
        let regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        const lvid = !results || !results[2] ? '' : decodeURIComponent(results[2].replace(/\+/g, ' '));
        
        if (lvid)
            this.renderSingleInvoice(Number(lvid));
    }

    getInvoices = () => {
        return InvoiceApiService.getInvoiceArray()
            .then(data => {
                this.setState({ invoice: data });
                this.setState({ invoiceCount: data.length })
                this.checkURLParams();
                return data;
            })
    }

    renderInvoices = () => {
        const invoices = this.state.invoice;
        if (invoices === [{}])
        return <EmptyInvoiceView />
    
        const invoicesArr = invoices.map((invoice, idx) => 
            <InvoiceItem 
                key={invoice.lvid}
                lvid={invoice.lvid}
                id={invoice.id}
                status={invoice.status}
                total={invoice.total}
                clientName={invoice.clientName}
                onClickShowSingleInvoice={event => this.renderSingleInvoice(invoice.lvid, event)}
            />
        )
        return invoicesArr;
    }

    renderSingleInvoice = (lvid, e) => {
        const invoice = this.state.invoice.find(obj => obj.lvid === lvid);
        if (!invoice) {
            // Remove any invoice id from url and render all invoices
            const removeParam = window.location.pathname
            window.history.pushState({ path: removeParam }, '', removeParam);
            return this.renderInvoices();
        }
        // Add invoice id to url
        const invoiceParam = window.location.pathname + `?invoice=${lvid}`  
        window.history.pushState({ path: invoiceParam }, '', invoiceParam);
        this.setState({ singleInvoice: invoice, singleInvoiceView: true })
    }

    goBack = () => {
        // Remove any invoice id from url
        const removeParam = window.location.pathname
        window.history.pushState({ path: removeParam }, '', removeParam);
        this.setState({ singleInvoice: {}, singleInvoiceView: false })
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
                        onCLickSaveInvoiceForm={() => this.saveInvoiceForm}
                        goBack={() => this.goBack}
                        singleInvoiceObj={this.state.singleInvoice} /> 
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