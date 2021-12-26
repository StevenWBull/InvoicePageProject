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
            showInvoiceForm: false,
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
        // if (Object.keys(this.state.singleInvoice).length)
        //     return this.renderSingleInvoice(this.state.singleInvoice.lvid)

        if (invoices === [{}])
            return <EmptyInvoiceView />
    
        const invoicesArr = invoices.map((invoice, idx) => 
            <InvoiceItem 
                key={idx}
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

    renderSingleInvoice = (lvid, e={}) => {
        console.log('Ran')
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

    showInvoiceForm = () => {
        console.log('Toggle')
        return this.setState({ showInvoiceForm: true });
    }

    discardInvoiceForm = () => {
        return this.setState({ showInvoiceForm: false });
    }

    saveInvoiceForm = () => {
        return this.setState({ showInvoiceForm: false });
    }

    render() {
        return (
            <>
                <SideNav />
                { this.state.singleInvoiceView 
                    ? <SingleInvoiceView 
                        key={1}
                        showEditInvoiceForm={this.state.showInvoiceForm}
                        onClickEditInvoiceForm={() => this.showInvoiceForm}
                        onCLickSaveInvoiceForm={() => this.saveInvoiceForm}
                        goBack={() => this.goBack}
                        singleInvoiceObj={this.state.singleInvoice} /> 
                    : <AllInvoiceView 
                        key={1}
                        showCreateInvoiceForm={this.state.showInvoiceForm} 
                        onClickCreateInvoiceForm={() => this.showInvoiceForm} 
                        onCLickDiscardInvoiceForm={() => this.discardInvoiceForm} 
                        onCLickSaveInvoiceForm={() => this.saveInvoiceForm}
                        renderInvoices={this.renderInvoices()}
                        invoiceCount={this.state.invoiceCount} /> }
            </>
        );
    }
}