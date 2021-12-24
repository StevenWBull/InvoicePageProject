import React from 'react';
import ReactDOM from 'react-dom';
import InvoicePage from './InvoicePage';
import { BrowserRouter } from 'react-router-dom';

test('Renders InvoicePage with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><InvoicePage /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});