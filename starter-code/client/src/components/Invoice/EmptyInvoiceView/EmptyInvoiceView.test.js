import React from 'react';
import ReactDOM from 'react-dom';
import EmptyInvoiceView from './EmptyInvoiceView';
import { BrowserRouter } from 'react-router-dom';

test('Renders EmptyInvoiceView with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><EmptyInvoiceView /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});