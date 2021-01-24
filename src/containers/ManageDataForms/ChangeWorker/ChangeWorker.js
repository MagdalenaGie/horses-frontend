import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';
import axios from '../../../axiosInstance';


class ChangeWorker extends Component {

    state = {
        updateStabble: {
            id_stajnia: '',
            id_stajenny: ''
        }
    }

    componentDidMount () {
        this.props.onFetchWorkers(),
        this.props.onFetchStabbles()
    }

    onChangeStajnia = (event) => {
        let update = this.state.updateStabble;
        update.id_stajnia = event.target.value;
        this.setState({
            updateStabble: update});
    }

    onChangeStajenny = (event) => {
        let update = this.state.updateStabble;
        update.id_stajenny = event.target.value;
        this.setState({
            updateStabble: update});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.updateStabble);
        axios.put('/stajnia', this.state.updateStabble)
        .then(response => {
            console.log(response)
            if(response.data.results){
                alert("Stajenny został zmieniony!");
            }else{
                alert("Niestety, coś poszło nie tak!")
            }
            this.props.onFetchStabbles();
        })
        .catch(error => {
            alert("Niestety, nie udało się zmienić stajennego! Sprawdź poprawność danych lub spróbuj ponownie później")
            console.log(error);
        })
    } 

    render(){
        let optStajenny = this.props.workers.map( staj => (
            <option key ={staj.id_stajenny} value={staj.id_stajenny}>{staj.imie + ' ' + staj.nazwisko}</option>
        ));
        let selectWorker = (
            <div>
                Wybierz stajennego:<br/>
                <select id="stajennyId" name="stajenny" onChange={this.onChangeStajenny} defaultValue="default" required> 
                    {optStajenny}
                    <option value="default" key="aaa123stajenny" disabled hidden> Wybierz stajennego </option>
                </select><br/><br/>
            </div> 
        );
        
        let optStabbles = this.props.stabbles.map( stab => (
            <option key ={stab.id_stajnia} value={stab.id_stajnia}>{stab.opis}</option>
        ));
        let selectStabble = (
            <div>
                Wybierz stajennego:<br/>
                <select id="stabbleId" name="stajnia" onChange={this.onChangeStajnia} defaultValue="default" required> 
                    {optStabbles}
                    <option value="default" key="aaa123stajnia" disabled hidden> Wybierz stajnię </option>
                </select><br/><br/>
            </div> 
        );

        return(
            <InputFrame>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Zmień stajennego, obsługującego daną stajnię:</h3>
                    {selectWorker}<br/>
                    {selectStabble}<br/>
                    <input type="submit" value="Zatwierdź zmianę"/>
                </form>
            </InputFrame>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
        workers: state.workers,
        stabbles: state.stabbles,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWorkers: () => dispatch(actions.fetchWorkers()),
        onFetchStabbles: () => dispatch(actions.fetchStabbles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeWorker);