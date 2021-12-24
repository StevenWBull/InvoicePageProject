import React from 'react';
import ReactDOM from 'react-dom';
import SideNav from './SideNav';
import { BrowserRouter } from 'react-router-dom';

test('Renders SideNav with Routing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BrowserRouter><SideNav /></BrowserRouter>, div);

  ReactDOM.unmountComponentAtNode(div);
});