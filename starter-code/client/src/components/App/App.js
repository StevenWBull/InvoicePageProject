import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideNav from '../SideNav/SideNav';
import InvoicePage from '../../routes/InvoicePage/InvoicePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  return (
    <>
      <SideNav />
      <main id='middle'>
        <Routes>
          <Route exact path={'/'} component={InvoicePage} />
          <Route path={'*'} component={NotFoundPage} />
        </Routes>
      </main>
    </>
  );
}

export default App;