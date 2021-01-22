import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {Route} from 'react-router-dom';
import rhorse from '../../../assets/images/lil-horse-r.png';
import axios from '../../../axiosInstance';
import Spinner from '../../../components/Forms/Spinner/Spinner';
import Lesson from '../../../components/Lesson/Lesson';
import Section from '../../../components/Forms/Section/Section';
import MyAccount from '../../../components/MyAccount/MyAccount';
import './HorsePanel.css';


class HorsePanel extends Component {

    state = {
        horseId: '',
        horseData: '',
        horseLessons: [],
        horseInjuries: [], 
        loadedData: false,
        loadedLessons: false,
        loadedInjuries: false
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({horseId: id})
        this.loadHorseInfo( id );
    }

    loadHorseDetails = (id) => {
        axios.get('konie/'+id)
        .then(res => {
            this.setState({horseData: res.data[0], loadedData: true});
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    loadHorseLessons = (id) => {
        axios.get('lekcjekonia/'+id)
        .then(res => {
            this.setState({horseLessons: res.data, loadedLessons: true});
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    loadHorseInjuries = (id) => {
        axios.get('kontuzje/'+id)
        .then(res => {
            this.setState({horseInjuries: res.data, loadedInjuries: true});
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    loadHorseInfo = (id) => {
        this.setState({isLogged: false});

        this.loadHorseDetails(id)
        this.loadHorseLessons(id)
        this.loadHorseInjuries(id)

        console.log(this.state)
    }

    onClickedLessonRedirect = (id) => {
        console.log('clicked' + id);
        this.props.history.push('/lessons/' + id);
    }

    onClickHorseDelete = (id) => {
        axios.delete('konie/'+id)
        .then(res => {
            console.log(res);
            alert("Wykwaterowałeś swojego konia. Mamy nadzieję, że niedługo do nas wrócicie!");
            this.props.history.push('/myaccount');
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    onDeletePairHandler = (id_lekcja) => {
        const req = {
            id_wlasciciel: this.props.idUser,
            id_kon: this.state.horseData.id_kon,
            id_lekcja: id_lekcja
        }
        console.log(req);
        axios.delete('pary/'+ req.id_kon+"/"+req.id_wlasciciel+"/"+req.id_lekcja)
        .then(res => {
            console.log(res);
            this.loadHorseLessons(this.state.horseId);
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    onDeleteInjuryHandler = (id_kontuzja) => {
        axios.delete('kontuzje/'+ this.state.horseData.id_kon+"/"+id_kontuzja)
        .then(res => {
            console.log(res);
            this.loadHorseInjuries(this.state.horseId);
        })
        .catch(err => {
            console.log(err.message)
        })
        const id = this.props.match.params.id;
        this.loadHorseInfo( id );
    }


    render(){
        let info = <Spinner/>
        if(this.state.loadedData){
            let btn = null
            console.log(this.props.idUser, this.state.horseData.id_wlasciciel);
            if(this.props.idUser === this.state.horseData.id_wlasciciel){
                btn=<button className="stdBtn" onClick={() => this.onClickHorseDelete(this.state.horseData.id_kon)}>Wykwateruj konia</button>
            }
            let decentlyFormatedDate = new Date(this.state.horseData.data_ur);
            let month = decentlyFormatedDate.getMonth()+1;
            let urDate = decentlyFormatedDate.getDate() + " - " + month + " - " + decentlyFormatedDate.getFullYear() + " r.";
            info = (
                <div>
                    <p><b>Imie:</b> {this.state.horseData.imie}</p>
                    <p><b>Rasa:</b> {this.state.horseData.rasa}</p>
                    <p><b>Data urodzenia:</b> {urDate}</p>
                    {btn}
                </div>
            );
        }

        let injuries = <Spinner/>
        if(this.state.loadedInjuries){
            if(this.state.horseInjuries.length > 0){
                let injuriesToDisplay = []
                injuriesToDisplay = this.state.horseInjuries.map(injury =>{
                    let decentlyFormatedDate = new Date(injury.data_urazu);
                    let month = decentlyFormatedDate.getMonth() + 1;
                    let injuryDate = decentlyFormatedDate.getDate() + " - " + month + " - " + decentlyFormatedDate.getFullYear() + " r.";
                    let btn = null;
                    if(this.props.idUser === this.state.horseData.id_wlasciciel){
                        btn=<button className="stdBtn" onClick={() => this.onDeleteInjuryHandler(injury.id_kontuzja)}>Zgłoś kontuzję jako wyleczoną</button>;
                    }
                    return (
                        <div className="Kontuzja">
                            <p><b>Rodzaj urazu:</b> {injury.opis_urazu}</p>
                            <p><b>Weterynarz prowadzący:</b> {injury.w_imie + ' ' + injury.w_nazw}</p>
                            <p><b>Data urazu:</b> {injuryDate}</p>
                            {btn}
                        </div>
                    );
                })
                injuries = injuriesToDisplay;   
            }
            else{
                injuries = <p>{this.state.horseData.imie} nie ma obecnie żadnych kontuzji!</p>
            }
        }
        
        let lessons = <Spinner/>
        if(this.state.loadedLessons){
            if(this.state.horseLessons.length > 0){
                let lessonsToDisplay = []
                lessonsToDisplay = this.state.horseLessons.map(lesson =>{
                    let btn = null;
                    if(this.props.idUser === this.state.horseData.id_wlasciciel){
                        btn=<button className="stdBtn" onClick={() => this.onDeletePairHandler(lesson.id_lekcja)}>Zrezygnuj z tej lekcji</button>;
                    }
                    
                    return (
                        <div className="LessonGroup">
                            <Lesson 
                            clicked={() => this.onClickedLessonRedirect(lesson.id_lekcja)} 
                            key={lesson.id_lekcja} 
                            instruktor={lesson.imie + ' ' + lesson.nazwisko} 
                            typ={lesson.opis} dzien={lesson.dzien} 
                            godzina={lesson.godzina} 
                            cena={lesson.cena}/>
                            {btn}
                        </div>
                        
                    );
                })
                lessons = (
                    <Section title="Lekcje, w których ten koń bierze udział: ">
                        {lessonsToDisplay}
                    </Section>
                );
            }
            else{
                lessons = null;
            }
        }

        return(
            <div>
                <div className="HorsePanel">
                    <img src={rhorse} alt="horse-img-left"/>
                    <div>
                        <div className="PanelTile">
                            <div className="PanelTileTop">
                                <h3>{this.state.horseData.imie}</h3>
                            </div>
                            <div className="PanelTileBottom">
                                {info}
                            </div>
                        </div>
                        <div className="PanelTile">
                            <div className="PanelTileTop">
                                <h3>KONTUZJE</h3>
                            </div>
                            <div className="PanelTileBottom">
                                {injuries}
                            </div>
                        </div>
                    </div>
                </div>
                
                {lessons}
                <Route path="/myaccount" exact component={MyAccount}/>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        idUser: state.idUser
    }
}

export default connect(mapStateToProps)(HorsePanel);
