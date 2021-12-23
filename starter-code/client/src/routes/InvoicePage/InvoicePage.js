import React, { Component } from 'react';
import SideNav from '../../components/SideNav/SideNav';
import { ReactComponent as EmptyIllustration } from '../../assets/illustration-empty.svg';
import { ReactComponent as arrowDown } from '../../assets/icon-arrow-down.svg';
import './InvoicePage.css';

export default class InvoicePage extends Component {
    render() {
        const emptyView = (
            <div className="empty-view">
                <EmptyIllustration />
                <h1>There is nothing here</h1>
                <span>Create an invoice by clicking the</span><br/>
                <span><strong>New Invoice</strong> button and get started</span>
            </div>
        )

        return (
            <>
                <SideNav />
                <section className="invoice-page-cont">
                    <div className="invoice-title-cont">
                        <div>
                            <div>
                                <h1>Invoices</h1>
                                <span>There are currently 7 invoices</span>
                            </div>
                        </div>
                        <div className="invoice-filter-btn-cont">
                            <div className="filter-cont">
                                Filter by status <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
                            </div>
                            <div>
                                <button>New Invoice</button>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-cont">
                        {emptyView}
                    </div>
                </section>
            </>
        );
    }
}