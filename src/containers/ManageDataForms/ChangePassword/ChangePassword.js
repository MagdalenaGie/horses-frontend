import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import axios from '../../../axiosInstance';


class ChangeWorker extends Component {

    state = {
        newPass: '',
        newPassRep: '',
        current: ''
    }

    onChangeCurrent = (event) => {
        this.setState({
            current: event.target.value});
    }

    onChangePass = (event) => {
        this.setState({
            newPass: event.target.value});
    }

    onChangeRep = (event) => {
        this.setState({
            newPassRep: event.target.value});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.current !== this.props.password){
            alert("Niestety, błędnie wpisałeś obecne hasło - spróbuj ponownie!")
        }else if(this.state.newPass === this.props.current){
            alert("Nowe hasło nie może być takie samo jak obecne - proszę, wymyśl inne!")
        }else if(this.state.newPass !== this.state.newPassRep){
            alert("Pola z nowym hasłem nie zawierają takiej samej wartości - sprawdź czy się nie pomyliłeś")
        }else{
            console.log(this.state);
            axios.put('/haslo/'+this.props.idUser, this.state)
            .then(response => {
                console.log(response)
                if(response.data.results){
                    alert("Twoje hasło zostało zmienione!!");
                }else{
                    alert("Niestety, coś poszło nie tak!")
                }
            })
            .catch(error => {
                alert("Niestety, nie udało się zmienić hasła! Sprawdź poprawność danych lub spróbuj ponownie później")
                console.log(error);
            })
            }
        
    } 

    render(){
        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Zmień hasło do swojego konta:</h3>
                    <input type="text" name="curpass" onChange={this.onChangeCurrent} required/><br/>Obecne hasło<br/><br/>
                    <input type="text" name="pass1" onChange={this.onChangePass} required/><br/>Nowe hasło<br/><br/>
                    <input type="text" name="pass2" onChange={this.onChangeRep} required/><br/>Powtórz nowe hasło<br/><br/>
                    <input type="submit" value="Zatwierdź zmianę"/>
                </form>
            </InputFrame>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        idUser: state.idUser,
        password: state.password,
        isAuth: state.isAuth
    }
}

export default connect(mapStateToProps)(ChangeWorker);