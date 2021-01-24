import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';
import axios from '../../../axiosInstance';
import Spinner from '../../../components/Forms/Spinner/Spinner';

class AddLesson extends Component {

    state = {
        newLesson: {
            id_instruktor: '',
            dzien: '',
            cena: '',
            godzina: '',
            opis: ''
        }
    }

    componentDidMount () {
        this.props.onFetchInstructors();
    }

    onChangeInstruktor = (event) => {
        let lesson = this.state.newLesson;
        lesson.id_instruktor = event.target.value;
        this.setState({
            newLesson: lesson});
    }

    onChangeDzien = (event) => {
        let lesson = this.state.newLesson;
        lesson.dzien = event.target.value;
        this.setState({
            newLesson: lesson});
    }

    onChangeTyp = (event) => {
        let lesson = this.state.newLesson;
        lesson.opis = event.target.value;
        this.setState({
            newLesson: lesson});
    }

    onChangeCena = (event) => {
        let lesson = this.state.newLesson;
        lesson.cena = event.target.value;
        this.setState({
            newLesson: lesson});
    }

    onChangeTime = (event) => {
        let lesson = this.state.newLesson;
        lesson.godzina = event.target.value;
        this.setState({
            newLesson: lesson});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.newLesson);
        axios.post('/lekcje', this.state.newLesson)
        .then(response => {
            alert("Lekcja została dodana, chętni już moga się na nią zapisywać!");
            this.props.onFetchLessons();
        })
        .catch(error => {
            alert("Niestety, nie udało się dodać lekcji! Sprawdź poprawność danych lub spróbuj ponownie później. Upewnij się również, czy w tym terminie nie odbywają się już inne zajęcia")
            console.log(error);
        })
    } 

    render(){
        let select = <Spinner/>;
        let optInst = [];
        if(this.props.instructors.length > 0){
            optInst = this.props.instructors.map( inst => (
                <option key ={inst.id_instruktor} value={inst.id_instruktor}>{inst.imie + ' ' + inst.nazwisko}</option>
            ));
            select = (
                <div>
                    Wybierz instruktora:<br/>
                    <select id="instId" name="inst" onChange={this.onChangeInstruktor} defaultValue="default" required> 
                        {optInst}
                        <option value="default" key="aaa123inst" disabled hidden> Wybierz instruktora </option>
                    </select><br/><br/>
                </div>
            );
        }

        let dni = ["Pn", "Wt", "Sr", "Cz", "Pt"]
        let optDni = dni.map( d => (
            <option key ={d} value={d}>{d}</option>
        ));
        let selectDay = (
            <div>
                Wybierz dzień:<br/>
                <select id="dzienId" name="dzien" onChange={this.onChangeDzien} defaultValue="default" required> 
                    {optDni}
                    <option value="default" key="aaa123dzien" disabled hidden> Wybierz dzien </option>
                </select><br/><br/>
            </div> 
        );

        let opisy = ["poczatkujacy", "sredniozaawansowani", "zaawansowani", "trening sportowy - skoki", "trening indywidualny"]
        let optOpis = opisy.map( opis => (
            <option key ={opis} value={opis}>{opis}</option>
        ));
        let selectType = (
            <div>
                Wybierz typ zajęć:<br/>
                <select id="typId" name="typ" onChange={this.onChangeTyp} defaultValue="default" required> 
                    {optOpis}
                    <option value="default" key="aaa123typ" disabled hidden> Wybierz typ </option>
                </select><br/><br/>
            </div>    
        );

        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Dodaj nową lekcję jazdy:</h3>
                    {select}<br/>
                    {selectDay}<br/>
                    {selectType}<br/>
                    <input type="number" name="cena" onChange={this.onChangeCena} required/><br/>Cena<br/><br/>
                    <input type="time" name="godzina" onChange={this.onChangeTime}  step="3600" min="8:00" max="19:00" required/><br/>Godnina rozpoczęcia lekcji<br/><br/>
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
        instructors: state.instructors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchInstructors: () => dispatch(actions.fetchInstructors()),
        onFetchLessons: () => dispatch(actions.fetchLessons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLesson);