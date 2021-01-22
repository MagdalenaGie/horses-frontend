import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';

class AddVet extends Component {

    state = {
        newVet: {
            imie: '',
            nazwisko: '',
            cena_wizyty: '',
            telefon: ''
        }
    }

    onChangeName = (event) => {
        let vet = this.state.newVet;
        vet.imie = event.target.value;
        this.setState({
            newVet: vet});
    }

    onChangeSurname = (event) => {
        let vet = this.state.newVet;
        vet.nazwisko = event.target.value;
        this.setState({
            newVet: vet});
    }

    onChangePrice = (event) => {
        let vet = this.state.newVet;
        vet.cena_wizyty = event.target.value;
        this.setState({
            newVet: vet});
    }

    onChangePhone = (event) => {
        let vet = this.state.newVet;
        vet.telefon = event.target.value;
        this.setState({
            newVet: vet});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let vet = this.state.newVet;
        console.log(vet);
        this.props.onPostVet(vet);
    }

    render(){
        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Dodaj weterynarza:</h3>
                    <input type="text" name="name" onChange={this.onChangeName}/><br/>Imię<br/><br/>
                    <input type="text" name="surname" onChange={this.onChangeSurname}/><br/>Nazwisko<br/><br/>
                    <input type="text" name="price" onChange={this.onChangePrice}/><br/>Cena wizyty: <br/><br/>
                    <input type="text" name="weeks" onChange={this.onChangePhone}/><br/>Telefon kontaktowy: <br/><br/>
                    <input type="submit" value="Wyślij"/>
                </form>
            </InputFrame>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        logged: state.isAuth,
        idUser: state.idUser,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostVet: (newInst) => dispatch(actions.postVet(newInst)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVet);