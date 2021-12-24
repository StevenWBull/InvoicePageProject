import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceForm from './InvoiceForm';
import { BrowserRouter } from 'react-router-dom';

test('Renders InvoiceForm with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><InvoiceForm /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});