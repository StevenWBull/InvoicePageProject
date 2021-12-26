import React, { Component } from "react";
import './MessageModal.css';

export default class MessageModal extends Component {
    render() {
        const { cancelInvoiceDeletion, onClickDeleteInvoice } = this.props;
        return (
            <div className="modal-overlay" id="modal-overlay">
                <div className="modal" id="modal">
                    <h1>Confirm Deletion</h1>
                    <h4>Are you sure you want to delete this invoice?</h4>
                    <div className="btn-cont">
                        <button className="btn btn-cancel" onClick={cancelInvoiceDeletion()}>Cancel</button>
                        <button className="btn btn-discard" onClick={onClickDeleteInvoice}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}