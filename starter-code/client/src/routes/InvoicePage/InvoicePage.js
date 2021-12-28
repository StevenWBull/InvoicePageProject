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
            formData: {},
            itemArr: []
        };
    }

    checkURLParams = () => {
        const url = window.location.href;
        const param = 'invoice';
        const regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)')
        const results = regex.exec(url);
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
            }).catch(() => {
                this.setState({ 
                    initialDataLoaded: true
                });
            })
    }

    filterInvoices = (invoiceArr) => {
        if (!this.state.filterInvoicesBy)
            return invoiceArr;

        return invoiceArr.filter(ele => ele.status === this.state.filterInvoicesBy);
    }

    renderInvoices = () => {
        const invoices = this.filterInvoices(this.state.invoice);

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
                paymentDue={invoice.paymentDue}
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

        // create new map of invoice.items array to avoid state mutation
        const newItemArr = invoice.items.map(item => item)
        
        // Add invoice id to url
        const invoiceParam = window.location.pathname + `?invoice=${lvid}`  
        window.history.pushState({ path: invoiceParam }, '', invoiceParam);
        this.setState({ 
            singleInvoice: invoice, 
            singleInvoiceView: true,
            itemArr: !this.state.itemArr.length ? newItemArr : this.state.itemArr
        })
    }

    deactivateInvoice = () => {
        const lvid = this.state.singleInvoice.lvid;
        return InvoiceApiService.deactivateInvoice(lvid)
            .then(() => {
                this.removeUrlParams();
                const newInvoiceArray = this.state.invoice.filter(ele => ele.lvid !== lvid);

                this.setState({ 
                    singleInvoice: {}, 
                    singleInvoiceView: false, 
                    invoice: newInvoiceArray,
                    invoiceCount: newInvoiceArray.length,
                    itemArr: []
                });
            })
    }

    goBack = () => {
        // Remove any invoice id from url
        this.removeUrlParams();
        this.setState({ 
            singleInvoice: {}, 
            singleInvoiceView: false,
            itemArr: []
        })
    }

    showInvoiceForm = () => {
        return this.setState({ showInvoiceForm: true });
    }

    discardInvoiceForm = () => {
        const itemArr = Object.keys(this.state.singleInvoice).length 
            ? this.state.singleInvoice.items.map(item=>item) 
            : [];
        return this.setState({ 
            showInvoiceForm: false,
            formData: {},
            invalidForm: false,
            itemArr: itemArr
        });
    }

    saveInvoiceForm = (newInvoiceArr, singleEdit=false) => {
        return this.setState({ 
            showInvoiceForm: false,
            formData: {},
            invalidForm: false,
            invoice: newInvoiceArr,
            singleInvoice: singleEdit ? newInvoiceArr.find(obj => obj.lvid === this.state.singleInvoice.lvid) : {},
            invoiceCount: newInvoiceArr.length
        });
    }

    onFilterSelect = (e) => {
        const filterBy = e.target.value;
        this.setState({ filterInvoicesBy: filterBy })
    }

    checkIfFormValid = (dataObj) => {
        const currFormValuesArr = Object.values(dataObj);
        // Check that there are no empty values in object or in item array, make sure item array has atleast one item
        if (!currFormValuesArr.every(item => item) || (!dataObj.items.every(item => Object.values(item).every(value => value)) || dataObj.items.length === 0))
            return this.setState({
                formData: dataObj,
                invalidForm: true
            })
        else
            return true;
    }

    onSaveFormSubmit = (e) => {
        e.preventDefault();
        const saveType = e.nativeEvent.submitter.id; // Possible values are 'save' || 'save-draft' || 'save-edit'
        const inputs = e.target.elements;
        const dataObj = { items: [] };
        const itemIdentifier = ['itemName', 'quantity', 'price', 'quantity']

        for (let i = 0; i < inputs.length; i++) {
            const itemName = inputs[i].name
            if (itemIdentifier.includes(itemName)) {
                const liid = inputs[i].id;
                const currEleIdx = dataObj.items.findIndex(ele => ele.liid === Number(liid))

                if (currEleIdx >= 0)
                    dataObj.items[currEleIdx][itemName] = inputs[i].value;
                else {
                    dataObj.items[dataObj.items.length] = { liid: Number(liid) }
                    dataObj.items[dataObj.items.length-1][itemName] = inputs[i].value;
                }
            }
            else {
                if (inputs[i].name)
                    dataObj[inputs[i].name] = inputs[i].value
            }
        }
        const formIsValid = saveType === 'save' || saveType === 'save-edit' ? this.checkIfFormValid(dataObj) : true;
        dataObj['saveType'] = saveType;

        if (formIsValid && saveType !== 'save-edit')
            return InvoiceApiService.insertNewInvoice(dataObj).then((newInvoiceArr) => {
                return this.saveInvoiceForm(newInvoiceArr);
            })

        if (formIsValid && saveType === 'save-edit') {
            dataObj['lsid'] = this.state.singleInvoice.lsid;
            dataObj['lcid'] = this.state.singleInvoice.lcid;
            dataObj['lvid'] = this.state.singleInvoice.lvid;

            return InvoiceApiService.updateInvoice(dataObj).then((newInvoiceArr) => {
                return this.saveInvoiceForm(newInvoiceArr, true);
            }) 
        }
    }

    handleAddItem = () => {
        const newArr = this.state.itemArr;
        newArr.push({ 'name': '', 'quantity': 1, 'price': 0.00, 'total': 0.00 })

        this.setState({ 
            itemArr: newArr
        });
    }

    updateInvoiceStatus = () => {
        const { lvid, status } = this.state.singleInvoice;
        InvoiceApiService.updateInvoiceStatus(lvid, status)
            .then(newInvoiceArr => 
                this.setState({
                    invoice: newInvoiceArr,
                    singleInvoice: newInvoiceArr.find(obj => obj.lvid === lvid),
                    invoiceCount: newInvoiceArr.length
                })
            )
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
                        onSaveFormSubmit={() => this.onSaveFormSubmit}
                        onClickDeactivateInvoice={() => this.deactivateInvoice()}
                        goBack={() => this.goBack}
                        singleInvoiceObj={this.state.singleInvoice}
                        invalidForm={this.state.invalidForm}
                        itemArr={this.state.itemArr}
                        handleAddItem={() => this.handleAddItem}
                        updateInvoiceStatus={() => this.updateInvoiceStatus} /> 
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
                        invalidForm={this.state.invalidForm}
                        itemArr={this.state.itemArr}
                        handleAddItem={() => this.handleAddItem} /> }
            </>
        );
    }
}