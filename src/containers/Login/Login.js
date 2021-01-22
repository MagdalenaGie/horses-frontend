import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux'; 
import InputFrame from '../../components/Forms/InputFrame/InputFrame';
import * as actions from '../../store/actions/actions';
import MyAccount from '../../components/MyAccount/MyAccount';

class Login extends Component {
    state={
        login: '',
        password: ''
    }

    componentDidUpdate(){
        if(this.props.isAuth){
            this.props.history.push('/myaccount');
        }
    }

    onLoginChange = (event) => {
        this.setState({login: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onLoginTry = (event) => {
        event.preventDefault();
        this.props.onCheckPassword(this.state.login, this.state.password);
    }

    render() {
        return(
            <InputFrame>
                <form>
                    <h3>Zaloguj się:</h3>
                    <input type="text" name="login" onChange={this.onLoginChange}/><br/>Login<br/><br/>
                    <input type="password" name="haslo" onChange={this.onPasswordChange}/><br/>Haslo<br/><br/>
                    <input type="submit" value="Zaloguj" onClick={this.onLoginTry}/>
                </form>
                <Route path="/myaccount" component={MyAccount}/>
            </InputFrame>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        password: state.password,
        isAuth: state.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckPassword: (login, password) => dispatch(actions.checkPassword(login, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
