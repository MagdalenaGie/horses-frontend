import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';

class AddFarrier extends Component {

    state = {
        newFarrier: {
            imie: '',
            nazwisko: '',
            cena_uslugi: '',
            co_ile_tygodni: ''
        }
    }

    onChangeName = (event) => {
        let farrier = this.state.newFarrier;
        farrier.imie = event.target.value;
        this.setState({
            newFarrier: farrier});
    }

    onChangeSurname = (event) => {
        let farrier = this.state.newFarrier;
        farrier.nazwisko = event.target.value;
        this.setState({
            newFarrier: farrier});
    }

    onChangePrice = (event) => {
        let farrier = this.state.newFarrier;
        farrier.cena_uslugi = event.target.value;
        this.setState({
            newFarrier: farrier});
    }

    onChangeWeeks = (event) => {
        let farrier = this.state.newFarrier;
        farrier.co_ile_tygodni = event.target.value;
        this.setState({
            newFarrier: farrier});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.newFarrier);
        let farrier = this.state.newFarrier;
        this.props.onPostFarrier(farrier);
    }

    render(){
        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Dodaj kowala:</h3>
                    <input type="text" name="name" onChange={this.onChangeName} required/><br/>Imię<br/><br/>
                    <input type="text" name="surname" onChange={this.onChangeSurname} required/><br/>Nazwisko<br/><br/>
                    <input type="text" name="price" onChange={this.onChangePrice} required/><br/>Cena usługi: <br/><br/>
                    <input type="text" name="weeks" onChange={this.onChangeWeeks} required/><br/>Częstotliwość wizyt (w tygodniach): <br/><br/>
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
        onPostFarrier: (newFarrier) => dispatch(actions.postFarrier(newFarrier)),
        onFetchFarriers: () => dispatch(actions.fetchFarriers())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFarrier);