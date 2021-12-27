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
            initialDataLoaded: false,
            invoice: [],
            invoiceCount: 0,
            singleInvoiceView: false,
            singleInvoice: {},
            showInvoiceForm: false,
            filterInvoicesBy: '',
            invalidForm: false,
            formData: {}
        };
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

    removeUrlParams = () => {
        const removeParam = window.location.pathname
        return window.history.pushState({ path: removeParam }, '', removeParam);
    }

    componentWillMount = () => {
        this.getInvoices();
    }

    getInvoices = () => {
        return InvoiceApiService.getInvoiceArray()
            .then(data => {
                this.setState({ 
                    invoice: data, 
                    invoiceCount: data.length,
                    initialDataLoaded: true
                });
                this.checkURLParams();
                return data;
            })
    }

    filterInvoices = (invoiceArr) => {
        if (!this.state.filterInvoicesBy)
            return invoiceArr;

        return invoiceArr.filter(ele => ele.status === this.state.filterInvoicesBy);
    }

    renderInvoices = () => {
        const invoices = this.filterInvoices(this.state.invoice);
        console.log(invoices)

        // Render a loader here
        if (!this.state.initialDataLoaded) 
            return null;

        if (!invoices.length)
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
        const invoice = this.state.invoice.find(obj => obj.lvid === lvid);
        if (!invoice) {
            // Remove any invoice id from url and render all invoices
            this.removeUrlParams();
            return this.renderInvoices();
        }
        // Add invoice id to url
        const invoiceParam = window.location.pathname + `?invoice=${lvid}`  
        window.history.pushState({ path: invoiceParam }, '', invoiceParam);
        this.setState({ singleInvoice: invoice, singleInvoiceView: true })
    }

    deactivateInvoice = () => {
        const lvid = this.state.singleInvoice.lvid;
        return InvoiceApiService.deactivateInvoice(lvid)
            .then(() => {
                this.removeUrlParams();
                const newInvoiceArray = this.state.invoice.filter(ele => ele.lvid != lvid);

                this.setState({ 
                    singleInvoice: {}, 
                    singleInvoiceView: false, 
                    invoice: newInvoiceArray,
                    invoiceCount: newInvoiceArray.length
                });
            })
    }

    goBack = () => {
        // Remove any invoice id from url
        this.removeUrlParams();
        this.setState({ singleInvoice: {}, singleInvoiceView: false })
    }

    showInvoiceForm = () => {
        return this.setState({ showInvoiceForm: true });
    }

    discardInvoiceForm = () => {
        return this.setState({ showInvoiceForm: false });
    }

    saveInvoiceForm = () => {
        return this.setState({ showInvoiceForm: false });
    }

    onFilterSelect = (e) => {
        const filterBy = e.target.value;
        this.setState({ filterInvoicesBy: filterBy })
    }

    checkIfFormValid = (dataObj) => {
        const currFormValuesArr = Object.values(dataObj);

        // Check that there are no empty values in object or in item array, make sure item array has atleast one item
        if (currFormValuesArr.some(item => !item) || (dataObj.items.some(item => !item) && dataObj.items.length > 0))
            return this.setState({
                formData: dataObj,
                invalidForm: true
            })
        else
            return true;
    }

    onSaveFormSubmit = (e) => {
        e.preventDefault();
        const saveType = e.nativeEvent.submitter.id; // Possible values are 'save' || 'save-draft'
        const inputs = e.target.elements;
        const dataObj = { items: [] };
        const itemIdentifier = ['itemName', 'quantity', 'price', 'quantity']

        for (let i = 0; i < inputs.length; i++) {
            const itemNameCheck = inputs[i].name.slice(0, -1);
            if (itemIdentifier.includes(itemNameCheck)) {
                const itemIdx = inputs[i].name.slice(-1);
                const currEleIdx = dataObj.items.findIndex(ele => ele.liid === Number(itemIdx))

                if (currEleIdx >= 0)
                    dataObj.items[currEleIdx][itemNameCheck] = inputs[i].value;
                else {
                    dataObj.items[dataObj.items.length] = { liid: Number(itemIdx) }
                    dataObj.items[dataObj.items.length-1][itemNameCheck] = inputs[i].value;
                }
            }
            else {
                dataObj[inputs[i].name] = inputs[i].value
            }
        }
        const formIsValid = saveType === 'save' ? this.checkIfFormValid(dataObj) : true;
        dataObj['saveType'] = saveType

        if (formIsValid)
            return InvoiceApiService.insertNewInvoice(dataObj).then(() => {
                return this.saveInvoiceForm();
            })
    }

    render() {
        return (
            <>
                <SideNav />
                { this.state.singleInvoiceView 
                    ? <SingleInvoiceView 
                        key={1}
                        showEditInvoiceForm={this.state.showInvoiceForm}
                        onCLickDiscardInvoiceForm={() => this.discardInvoiceForm} 
                        onClickEditInvoiceForm={() => this.showInvoiceForm}
                        onCLickSaveInvoiceForm={() => this.saveInvoiceForm}
                        onClickDeactivateInvoice={() => this.deactivateInvoice()}
                        goBack={() => this.goBack}
                        singleInvoiceObj={this.state.singleInvoice} /> 
                    : <AllInvoiceView 
                        key={1}
                        onFilterSelect={() => this.onFilterSelect}
                        showCreateInvoiceForm={this.state.showInvoiceForm} 
                        onClickCreateInvoiceForm={() => this.showInvoiceForm} 
                        onCLickDiscardInvoiceForm={() => this.discardInvoiceForm} 
                        onSaveFormSubmit={() => this.onSaveFormSubmit}
                        renderInvoices={this.renderInvoices()}
                        invoiceCount={this.state.invoiceCount}
                        formData={this.state.formData}
                        invalidForm={this.state.invalidForm} /> }
            </>
        );
    }
}