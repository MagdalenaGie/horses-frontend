import React from 'react';
import NavItem from './NavItem/NavItem';
import {connect} from 'react-redux';
import './NavBar.css';

const NavBar = (props) => {
    let logged = <NavItem link="/login">Zaloguj się</NavItem>;
    let logout = null;
    if(props.isAuth){
        logged = <NavItem link="/myaccount">Moje konto</NavItem>;
        logout = <NavItem link="/logout">Wyloguj</NavItem>
    }
    return (
        <ul className="NavBar">
            <NavItem link="/" exact>Home</NavItem>
            <NavItem link="/horses">Nasze Konie</NavItem>
            <NavItem link="/lessons">Lekcje jazdy</NavItem>
            {logged}
            {logout}
        </ul> 
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth
    }
}


export default connect(mapStateToProps)(NavBar);