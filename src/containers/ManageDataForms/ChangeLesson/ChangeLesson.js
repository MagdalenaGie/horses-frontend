import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';
import axios from '../../../axiosInstance';
import Spinner from '../../../components/Forms/Spinner/Spinner';

class ChangeLesson extends Component {

    state = {
        updateLesson: {
            dzien: '',
            godzina: '',
            id_lekcja: ''
        }
    }

    componentDidMount () {
       this.props.onFetchLessons();
    }

    onChangeLekcja = (event) => {
        let lesson = this.state.updateLesson;
        lesson.id_lekcja = event.target.value;
        this.setState({
            updateLesson: lesson});
    }

    onChangeDzien = (event) => {
        let lesson = this.state.updateLesson;
        lesson.dzien = event.target.value;
        this.setState({
            updateLesson: lesson});
    }

    onChangeTime = (event) => {
        let lesson = this.state.updateLesson;
        lesson.godzina = event.target.value;
        this.setState({
            updateLesson: lesson});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.updateLesson);
        let id = this.state.updateLesson.id_lekcja;
        axios.put('/lekcje/' + id, this.state.updateLesson)
        .then(response => {
            console.log(response)
            if(response.data.results){
                alert("Lekcja została zaktualizowana!");
            }else{
                alert("Niestety, coś poszło nie tak - prawdopodobnie w wybranym terminie już odbywają się jakieś zajęcia")
            }
            this.props.onFetchLessons();
            
        })
        .catch(error => {
            alert("Niestety, nie udało się zaktualizować lekcji! Sprawdź poprawność danych lub spróbuj ponownie później")
            console.log(error);
        })
    } 

    render(){
        let selectLesson = <Spinner/>;
        let optLessons = [];

        optLessons = this.props.lessons.map( les => (
            <option key ={les.id_lekcja} value={les.id_lekcja}>{les.dzien + ' ' + les.godzina + ' ' + les.ins_imie + ' ' + les.ins_nazw}</option>
        ));
        selectLesson = (
            <div>
                Wybierz lekcję:<br/>
                <select id="lekcjaId" name="lekcja" onChange={this.onChangeLekcja} defaultValue="default" required> 
                    {optLessons}
                    <option value="default" key="aaa123inst" disabled hidden> Wybierz lekcję </option>
                </select><br/><br/>
            </div>
        );

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

        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Zmień termin zajęć:</h3>
                    {selectLesson}<br/>
                    {selectDay}<br/>
                    <input type="time" name="godzina" onChange={this.onChangeTime}  step="3600" min="8:00" max="19:00" required/><br/>Godzina rozpoczęcia lekcji<br/><br/>
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
        lessons: state.lessons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchInstructors: () => dispatch(actions.fetchInstructors()),
        onFetchLessons: () => dispatch(actions.fetchLessons())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLesson);