import React, { Component } from 'react';
import Horse from '../../../components/Horse/Horse';
import axios from '../../../axiosInstance';
import './HorsesList.css';
import { Route } from 'react-router-dom';
import HorsePanel from '../../../containers/Panels/HorsePanel/HorsePanel';
import Spinner from '../../../components/Forms/Spinner/Spinner';

class HorsesList extends Component {

    state = {
        horses: []
    }

    componentDidMount() {
        this.loadElements();
    }

    loadElements = () => {
        axios.get('/konie')
            .then(res => {
                this.setState({ horses: res.data });
            })
    }

    onClickHorse = (id) => {
        this.props.history.push('/horses/' + id);
    }

    render() {
        let elementsToDisplay = < Spinner / >
            if (this.state.horses.length > 0) {
                elementsToDisplay = this.state.horses.map(horse => ( 
                    <Horse clicked = {() => this.onClickHorse(horse.id_kon) }
                        imie = { horse.imie }
                        rasa = { horse.rasa }
                        ur = { horse.data_ur }
                        w_imie = { horse.w_imie }
                        nazwisko = { horse.nazwisko }
                        key = { horse.id_kon }
                    />
                ));
            }

        return ( 
            <div className = "HorsesList" > 
            { elementsToDisplay } 
            <Route path = { this.props.match.url + ":id" }exact component = { HorsePanel }/> 
            </div>
        );
    }
}

export default HorsesList;