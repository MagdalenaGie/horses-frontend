import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import Spinner from '../../../components/Forms/Spinner/Spinner';
import * as actions from '../../../store/actions/actions';

class ReportInjury extends Component {

    state = {
        weterynarze: [],
        urazy: [],
        loadedU: false,
        loadedW: false,
        injury: {
            id_kon: '',
            id_weterynarz: '',
            id_kontuzja: '',
            data_urazu: ''
        }
    }

    getVetsHandler = () => {
        axios.get('/weterynarze')
        .then( res => {
            this.setState({weterynarze: res.data, loadedW: true});
        })
        .catch( err => {
            console.log(err.message)
        })
    }

    getInjuriesHandler = () => {
        axios.get('/urazy')
        .then( res => {
            this.setState({urazy: res.data, loadedU: true});
        })
        .catch( err => {
            console.log(err.message)
        })
    }

    componentDidMount () {
        this.getInjuriesHandler();
        this.getVetsHandler();
        this.props.onFetchUsrHorses(this.props.idUser);
    }

    onChangeKon = (event) => {
        let injury = this.state.injury;
        injury.id_kon = event.target.value;
        this.setState({
            injury: injury});
    }

    onChangeData = (event) => {
        let injury = this.state.injury;
        injury.data_urazu = event.target.value;
        this.setState({
            injury: injury});
    }

    onChangeVet = (event) => {
        let injury = this.state.injury;
        injury.id_weterynarz = event.target.value;
        this.setState({
            injury: injury});
    }

    onChangeInjury = (event) => {
        let injury = this.state.injury;
        injury.id_kontuzja = event.target.value;
        this.setState({
            injury: injury});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let newInjury = this.state.injury;
        console.log(newInjury);
        axios.post('/kontuzje', newInjury)
        .then(response => {
            console.log(response.data);
            alert("Kontuzja została zgłoszona, mamy nadzieję że twój koń szybko wróci do zdrowia!");
        })
        .catch(error => {
            console.log(error.message);
            alert("Niestety nie udało się zgłosić kontuzji tego konia, sprawdź poprawność danych i spróbuj ponownie później!");
        })
    } 

    render(){
        let select = <Spinner/>;
        let optVets = [];
        let optInj = [];
        let optHor = [];
        if(this.state.loadedW && this.state.loadedU){
            optVets = this.state.weterynarze.map( w => (
                <option key ={w.id_weterynarz} value={w.id_weterynarz}>{w.imie + ' ' + w.nazwisko} / cena:{w.cena_wizyty} zł</option>
            ));
            optInj = this.state.urazy.map( u => (
                <option key ={u.id_kontuzja} value={u.id_kontuzja}>{u.opis}</option>
            ));
            optHor = this.props.horses.map(horse => (
                <option key={horse.id_kon} value={horse.id_kon}>{horse.imie}</option>
            ));
            select = (
                <div>
                    Wybierz konia, który doznał kontuzji:<br/>
                    <select id="konid" name="kon" onChange={this.onChangeKon} defaultValue="default" required>
                        {optHor}
                        <option value="default" key="aaa123kon" disabled hidden> Wybierz konia </option>
                    </select><br/><br/>
                    Wybierz weterynarza, który będzie prowadził leczenie twojego konia:<br/>
                    <select id="wetid" name="weterynarz" onChange={this.onChangeVet} defaultValue="default" required>
                        {optVets}
                        <option value="default" key="aaa123wet" disabled hidden> Wybierz weterynarza </option>
                    </select><br/><br/>
                    Wybierz rodzaj kontuzji:<br/>
                    <select id="kontuzjaid" name="kontuzja" onChange={this.onChangeInjury} defaultValue="default" required>
                        {optInj}
                        <option value="default" key="aaa123kontuzja" disabled hidden> Wybierz typ kontuzji </option>
                    </select><br/>
                </div>
                
            );
        }

        let today = new Date().toISOString().slice(0, 10);

        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Zgłoś kontuzję konia:</h3>
                    <input type="date" min="2020-01-01" max={today} name="dataur" onChange={this.onChangeData} required/><br/>Data kotuzji<br/><br/>
                    {select}<br/>
                    <input type="submit" value="Wyślij"/>
                </form>
            </InputFrame>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        horses: state.usrHorses,
        logged: state.isAuth,
        idUser: state.idUser
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        onFetchUsrHorses: (idUsr) => dispatch(actions.fetchUsrHorses(idUsr)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportInjury);