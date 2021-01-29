import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
//import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';

class AddWorker extends Component {

    state = {
        newWorker: {
            imie: '',
            nazwisko: ''
        }
    }

    onChangeName = (event) => {
        let worker = this.state.newWorker;
        worker.imie = event.target.value;
        this.setState({
            newWorker: worker});
    }

    onChangeSurname = (event) => {
        let worker = this.state.newWorker;
        worker.nazwisko = event.target.value;
        this.setState({
            newWorker: worker});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let worker = this.state.newWorker;
        this.props.onPostWorker(worker);
        //this.props.onFetchWorkers();
    }

    render(){
        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Dodaj stajennego:</h3>
                    <input type="text" name="name" onChange={this.onChangeName} required/><br/>Imię<br/><br/>
                    <input type="text" name="surname" onChange={this.onChangeSurname} required/><br/>Nazwisko<br/><br/>
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
        onPostWorker: (newWorker) => dispatch(actions.postWorker(newWorker)),
        onFetchWorkers: () => dispatch(actions.fetchWorkers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorker);