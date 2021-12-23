import React, { Component } from 'react';
import './SideNav.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as SunIcon } from '../../assets/icon-sun.svg';
import avatar from '../../assets/image-avatar.jpg';

export default class SideNav extends Component {
    render() {
        return (
            <section className="sidenav-section">
                <div className="top-sidenav-container">
                    <div className="icon-cont">
                        <Logo />
                    </div>
                    <div className="different-color-cont"></div>
                </div>
                <div className="bottom-sidenav-container">
                    <div className="dark-light-toggle-container">
                        <SunIcon />
                    </div>
                    <div className="avatar-container">
                        <img src={avatar} alt="avatar-picture"/>
                    </div>
                </div>
            </section>
        );
    }
}