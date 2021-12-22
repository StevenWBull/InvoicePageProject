import React, { Component } from 'react'
import './NotFoundPage.css';
import cryingBemo from '../../assets/adventure-time-cry.gif';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className='NotFoundPage'>
        <img src={cryingBemo} alt="Crying Bemo, Page Not Found!" />
        <h1>404 - Page not found</h1>
        <p>Try going back to your previous page.</p>
      </div>
    )
  }
}