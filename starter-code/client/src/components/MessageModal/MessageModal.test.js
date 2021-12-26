import React from 'react';
import ReactDOM from 'react-dom';
import MessageModal from './MessageModal';
import { BrowserRouter } from 'react-router-dom';

test('Renders MessageModal with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><MessageModal /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});