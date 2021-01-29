import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';

class AddInstructor extends Component {

    state = {
        newInst: {
            imie: '',
            nazwisko: ''
        }
    }

    onChangeName = (event) => {
        let inst = this.state.newInst;
        inst.imie = event.target.value;
        this.setState({
            newInst: inst});
    }

    onChangeSurname = (event) => {
        let inst = this.state.newInst;
        inst.nazwisko = event.target.value;
        this.setState({
            newInst: inst});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let inst = this.state.newInst;
        this.props.onPostInstructor(inst);
        //this.props.onFetchInstructors();
    }

    render(){
        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Dodaj instruktora:</h3>
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
        onPostInstructor: (newInst) => dispatch(actions.postInstructor(newInst)),
        onFetchInstructors: () => dispatch(actions.fetchInstructors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInstructor);