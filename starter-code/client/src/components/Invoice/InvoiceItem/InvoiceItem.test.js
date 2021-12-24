import React from 'react';
import ReactDOM from 'react-dom';
import InvoiceItem from './InvoiceItem';
import { BrowserRouter } from 'react-router-dom';

test('Renders InvoiceItem with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><InvoiceItem /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});