import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InvoicePage from '../../routes/InvoicePage/InvoicePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

function App() {
  return (
    <>
      <main id='middle'>
        <Routes>
          <Route exact path={'/'} element={<InvoicePage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;