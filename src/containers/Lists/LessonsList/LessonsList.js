import React, {Component} from 'react';
import Lesson from '../../../components/Lesson/Lesson';
import axios from '../../../axiosInstance';
import './LessonsList';
import Section from '../../../components/Forms/Section/Section';
import Person from '../../../components/Person/Person';
import {Route} from 'react-router-dom';
import LessonDetail from '../../../components/LessonDetail/LessonDetail';

//TODO: posegregować na dni, najlepiej każda kolumna inny dzień

class LessonsList extends Component {
    state = {
        lessons: {
            Pn: [],
            Wt: [],
            Sr: [],
            Cz: [],
            Pt: []
        },
        instructors: []
    }

    componentDidMount(){
        this.loadInstructors();
        this.loadElementsWeekly();
    }

    loadInstructors = () => {
        axios.get('/instruktorzy')
            .then(res => {
                const inst = res.data;
                this.setState({instructors: inst});
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    loadElementsWeekly = () => {
        axios.get('/lekcje')
        .then(res => {
            const lessons = {
                    Pn: [],
                    Wt: [],
                    Sr: [],
                    Cz: [],
                    Pt: []
            }
            for(let iter=0; iter< res.data.length; iter++){
                let category = res.data[iter].dzien;
                lessons[category].push({
                    ...res.data[iter]
                });
            }
            this.setState({lessons});
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    onClickedLessonRedirect = (id) => {
        console.log('clicked' + id);
        this.props.history.push('/lessons/' + id);
    }

    render() {
        let weekPlan = {
            Pn: [],
            Wt: [],
            Sr: [],
            Cz: [],
            Pt: []
        }

        weekPlan.Pn = this.state.lessons.Pn.map(lesson => (
            <Lesson clicked={() => this.onClickedLessonRedirect(lesson.id_lekcja)} key={lesson.id_lekcja} instruktor={lesson.ins_imie + ' ' + lesson.ins_nazw} typ={lesson.opis} dzien={lesson.dzien} godzina={lesson.godzina} cena={lesson.cena}/>
        ) );

        weekPlan.Wt = this.state.lessons.Wt.map(lesson => (
            <Lesson clicked={() => this.onClickedLessonRedirect(lesson.id_lekcja)} key={lesson.id_lekcja} instruktor={lesson.ins_imie + ' ' + lesson.ins_nazw} typ={lesson.opis} dzien={lesson.dzien} godzina={lesson.godzina} cena={lesson.cena}/>
        ) );

        weekPlan.Sr = this.state.lessons.Sr.map(lesson => (
            <Lesson clicked={() => this.onClickedLessonRedirect(lesson.id_lekcja)} key={lesson.id_lekcja} instruktor={lesson.ins_imie + ' ' + lesson.ins_nazw} typ={lesson.opis} dzien={lesson.dzien} godzina={lesson.godzina} cena={lesson.cena}/>
        ) );

        weekPlan.Cz = this.state.lessons.Cz.map(lesson => (
            <Lesson clicked={() => this.onClickedLessonRedirect(lesson.id_lekcja)} key={lesson.id_lekcja} instruktor={lesson.ins_imie + ' ' + lesson.ins_nazw} typ={lesson.opis} dzien={lesson.dzien} godzina={lesson.godzina} cena={lesson.cena}/>
        ) );

        weekPlan.Pt = this.state.lessons.Pt.map(lesson => (
            <Lesson clicked={() => this.onClickedLessonRedirect(lesson.id_lekcja)} key={lesson.id_lekcja} instruktor={lesson.ins_imie + ' ' + lesson.ins_nazw} typ={lesson.opis} dzien={lesson.dzien} godzina={lesson.godzina} cena={lesson.cena}/>
        ) );

        let instruktorzy = [];
        instruktorzy = this.state.instructors.map(inst => (
           <Person key={inst.id_instruktor} title={inst.imie + ' ' + inst.nazwisko}></Person>
        ));

        return(
            <div className="LessonsList">
                <Section title="Instruktorzy">
                    {instruktorzy}
                </Section>
                <Section title="Poniedziałek">
                    {weekPlan.Pn}
                </Section>
                <Section title="Wtorek">
                     {weekPlan.Wt}
                </Section>
                <Section title="Środa">
                    {weekPlan.Sr}
                </Section>
                <Section title="Czwartek">
                    {weekPlan.Cz}
                </Section>
                <Section title="Piątek">
                    {weekPlan.Pt}
                </Section>
                <Route path={this.props.match.url + ":id"} exact component={LessonDetail}/>
            </div>
        );
    }
}

export default LessonsList;