import React from 'react';
import './Toolbar.css';
import logo from '../../../assets/images/logostajnia.png';
import NavBar from '../NavBar/NavBar';

const Toolbar = () => {
    return (<header className="Toolbar">
        <nav>
            <NavBar/>
        </nav>
        <div className="Logo">
            <img src={logo} alt="MyStabble"/>
        </div>
    </header>);
}

export default Toolbar;