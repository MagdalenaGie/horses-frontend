import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import axios from '../../../axiosInstance';
import Spinner from '../../../components/Forms/Spinner/Spinner';
import * as actions from '../../../store/actions/actions';

class DeleteLesson extends Component {

    state = {
        //lessons: [],
        lessonToDelete: ''
    }

    componentDidMount () {
        //this.getLessons();
        this.props.onFetchLessons();
    }

    // getLessons = () => {
    //     axios.get('/lekcje')
    //     .then(res => {
    //         const lessons = res.data;
    //         this.setState({lessons: lessons});
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    //     })
    // }

    onChangeLekcja = (event) => {
        this.setState({
            lessonToDelete: event.target.value});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.lessonToDelete);
        axios.delete('/lekcje/' + this.state.lessonToDelete)
        .then(response => {
            alert("Lekcja została usunięta!")         
        })
        .catch(error => {
            alert("Niestety, nie udało się usunąć lekcji! Sprawdź poprawność danych lub spróbuj ponownie później")
            console.log(error);
        })
    } 

    render(){
        let selectLesson = <Spinner/>;
        let optLessons = [];
        // if(this.state.lessons.length > 0){
        //     optLessons = this.state.lessons.map( les => (
        //         <option key ={les.id_lekcja} value={les.id_lekcja}>{les.dzien + ' ' + les.godzina + ' ' + les.ins_imie + ' ' + les.ins_nazw}</option>
        //     ));
        //     selectLesson = (
        //         <div>
        //             Wybierz zajęcia, które chcesz odwołać:<br/>
        //             <select id="lekcjaId" name="lekcja" onChange={this.onChangeLekcja} defaultValue="default" required> 
        //                 {optLessons}
        //                 <option value="default" key="aaa123inst" disabled hidden> Wybierz lekcję </option>
        //             </select><br/><br/>
        //         </div>
        //     );
        // }

        optLessons = this.props.lessons.map( les => (
            <option key ={les.id_lekcja} value={les.id_lekcja}>{les.dzien + ' ' + les.godzina + ' ' + les.ins_imie + ' ' + les.ins_nazw}</option>
        ));
        selectLesson = (
            <div>
                Wybierz zajęcia, które chcesz odwołać:<br/>
                <select id="lekcjaId" name="lekcja" onChange={this.onChangeLekcja} defaultValue="default" required> 
                    {optLessons}
                    <option value="default" key="aaa123inst" disabled hidden> Wybierz lekcję </option>
                </select><br/><br/>
            </div>
        );

        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Odwołaj zajęcia</h3>
                    {selectLesson}<br/>
                    <input type="submit" value="Usuń lekcję"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteLesson);