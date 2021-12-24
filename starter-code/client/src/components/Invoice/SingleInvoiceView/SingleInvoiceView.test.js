import React from 'react';
import ReactDOM from 'react-dom';
import SingleInvoiceView from './SingleInvoiceView';
import { BrowserRouter } from 'react-router-dom';

test('Renders SingleInvoiceView with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><SingleInvoiceView /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});