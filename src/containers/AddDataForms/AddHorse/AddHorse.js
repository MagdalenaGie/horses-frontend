import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import Spinner from '../../../components/Forms/Spinner/Spinner';
import * as actions from '../../../store/actions/actions';

class AddHorse extends Component {

    state = {
        stajnie: [],
        kowale: [],
        loadedK: false,
        loadedS: false,
        newHorse: {
            id_stajnia: '',
            id_wlasciciel:'',
            imie: '',
            rasa: '',
            data_ur: '',
            id_kowal: ''
        }
    }

    getFarriersHandler = () => {
        axios.get('/kowale')
        .then( res => {
            this.setState({kowale: res.data, loadedK: true});
        })
        .catch( err => {
            console.log(err.message)
        })
    }

    getStabblesHandler = () => {
        axios.get('/stajnie')
        .then( res => {
            this.setState({stajnie: res.data, loadedS: true});
        })
        .catch( err => {
            console.log(err.message)
        })
    }

    componentDidMount () {
        this.getStabblesHandler();
        this.getFarriersHandler();
    }

    onChangeName = (event) => {
        let horse = this.state.newHorse;
        horse.imie = event.target.value;
        this.setState({
            newHorse: horse});
    }

    onChangeRasa = (event) => {
        let horse = this.state.newHorse;
        horse.rasa = event.target.value;
        this.setState({
            newHorse: horse});
    }

    onChangeData = (event) => {
        let horse = this.state.newHorse;
        horse.data_ur = event.target.value;
        this.setState({
            newHorse: horse});
    }

    onChangeKowal = (event) => {
        let horse = this.state.newHorse;
        horse.id_kowal = event.target.value;
        this.setState({
            newHorse: horse});
    }

    onChangeStajnia = (event) => {
        let horse = this.state.newHorse;
        horse.id_stajnia = event.target.value;
        this.setState({
            newHorse: horse});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let horse = this.state.newHorse;
        horse.id_wlasciciel = this.props.idUser;
        console.log(horse);
        axios.post('/konie', horse)
        .then(response => {
            this.props.onFetchUsrHorses(this.props.idUser);
            alert("Twój koń został zakwaterowany! Zrobimy co w naszej mocy, by otoczyć ", horse.imie, " jak najlepszą opieką!");
        })
        .catch(error => {
            alert("Niestety, nie udało się dodać konia! Sprawdź poprawność danych - jeżeli wszystko wprowadziłeś poprawnie, to znaczy że w tej stajni nie ma już miejsc. Może zdecydujesz się na inną?")
            console.log(error);
        })
    } 

    render(){
        let select = <Spinner/>;
        let optKowale = [];
        let optStajnie = [];
        if(this.state.loadedK && this.state.loadedS){
            optKowale = this.state.kowale.map( k => (
                <option key ={k.id_kowal} value={k.id_kowal}>{k.imie + ' ' + k.nazwisko}</option>
            ));
            optStajnie = this.state.stajnie.map( s => (
                <option key ={s.id_stajnia} value={s.id_stajnia}>{s.opis}</option>
            ));
            select = (
                <div>
                    Wybierz kowala:<br/>
                    <select id="kowalId" name="kowal" onChange={this.onChangeKowal} defaultValue="default" required> 
                        {optKowale}
                        <option value="default" key="aaa123kowal" disabled hidden> Wybierz kowala </option>
                    </select><br/><br/>
                    Wybierz stajnię:<br/>
                    <select id="stajniaId" name="stajnia" onChange={this.onChangeStajnia} defaultValue="default" required>
                        {optStajnie}
                        <option value="default" key="aaa123stajnia" disabled hidden> Wybierz stajnie </option>
                    </select><br/>
                </div>
                
            );
        }

        let today = new Date().toISOString().slice(0, 10);

        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Zakwateruj konia:</h3>
                    <input type="text" name="name" onChange={this.onChangeName} required/><br/>Imię<br/><br/>
                    <input type="text" name="rasa" onChange={this.onChangeRasa} required/><br/>Rasa<br/><br/>
                    <input type="date" name="dataur" onChange={this.onChangeData}  max={today} required/><br/>Data urodzenia<br/><br/>
                    {select}<br/>
                    <input type="submit" value="Wyślij"/>
                </form>
            </InputFrame>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        logged: state.isAuth,
        idUser: state.idUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsrHorses: (idUsr) => dispatch(actions.fetchUsrHorses(idUsr)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHorse);