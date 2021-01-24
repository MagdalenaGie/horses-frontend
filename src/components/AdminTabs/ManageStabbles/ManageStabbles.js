import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';
import Section from '../../../components/Forms/Section/Section';
import Person from '../../Person/Person';
import ChangeWorker from '../../../containers/ManageDataForms/ChangeWorker/ChangeWorker';

class Managestabbles extends Component{

    componentDidMount(){
        if(this.props.isAdmin){
            this.props.onFetchWorkers();
        }
    }
 
    render(){
        let workersList = this.props.workers.map(worker => (
            <Person 
                key={worker.id_stajenny} 
                title={worker.imie + " " + worker.nazwisko}>

            </Person>
        ) );

        let stabblesList = this.props.stabbles.map(stab => (
            <Person 
                key={stab.id_stajnia} 
                title={stab.opis}>
                    <p><b>Ilość boksów:</b> {stab.ilosc_boksow}</p>
                    <p><b>Stajenny:</b> {stab.imie+ ' ' + stab.nazwisko}</p>
            </Person>
        ));

        return(
            <div>
                <Section title="Stajnie znajdujące się na terenie ośrodka: ">
                    {stabblesList}
                </Section>
                <Section title="Stajenni:">
                        {workersList}
                </Section>
                <Section title="Zmień stajennego pracującego w danej stajni: ">
                    <ChangeWorker/>
                </Section>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
        workers: state.workers,
        stabbles: state.stabbles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWorkers: () => dispatch(actions.fetchWorkers()),
        onFetchStabbles: () => dispatch(actions.fetchStabbles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Managestabbles);