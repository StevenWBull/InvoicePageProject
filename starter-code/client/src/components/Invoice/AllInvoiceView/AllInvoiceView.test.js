import React from 'react';
import ReactDOM from 'react-dom';
import AllInvoiceView from './AllInvoiceView';
import { BrowserRouter } from 'react-router-dom';

test('Renders AllInvoiceView with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><AllInvoiceView /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});