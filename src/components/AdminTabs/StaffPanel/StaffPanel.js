import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';
import Section from '../../../components/Forms/Section/Section';
import AddWorker from '../../../containers/AddDataForms/AddWorker/AddWorker';
import AddFarrier from '../../../containers/AddDataForms/AddFarrier/AddFarrier'
import AddInstructor from '../../../containers/AddDataForms/AddInstructor/AddInstructor';
import AddVet from '../../../containers/AddDataForms/AddVet/AddVet';
import Person from '../../Person/Person';

class StaffPanel extends Component{

    componentDidMount(){
        if(this.props.isAdmin){
            this.props.onFetchFarriers();
            this.props.onFetchInstructors();
            this.props.onFetchVets();
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

            let vetsList = this.props.vets.map(vet => (
                <Person title={vet.imie + " " + vet.nazwisko} key={vet.id_weterynarz}>
                    <p><b>Cenna wizyty: </b>{vet.cena_wizyty}</p>
                    <p><b>Telefon: </b>{vet.telefon}</p>
                </Person>
            ) );

            let farriersList = this.props.farriers.map(far => (
                <Person title={far.imie + " " + far.nazwisko} key={far.id_kowal}>
                    <p><b>Cenna usługi: </b>{far.cena_uslugi}zł.</p>
                    <p><b>Wizyty: </b>co {far.co_ile_tygodni} tyg.</p>
                </Person>
            ) );

            let instructorsList = this.props.instructors.map(ins => (
                <Person title={ins.imie + " " + ins.nazwisko} key={ins.id_instruktor}></Person>
            ) );

        return(
            <div>
                    <Section title="Stajenni:">
                        {workersList}
                    </Section>
                    <Section title="Dodaj stajennego:">
                        <AddWorker/>
                    </Section>
                    <Section title="Weterynarze:">
                        {vetsList}
                    </Section>
                    <Section title="Dodaj weterynarza:">
                        <AddVet/> 
                    </Section>
                    <Section title="Instruktorzy:">
                        {instructorsList}
                    </Section>
                    <Section title="Dodaj instruktora:">
                        <AddInstructor/>
                    </Section>
                    <Section title="Kowale:">
                        {farriersList}
                    </Section>
                    <Section title="Dodaj kowala:">
                        <AddFarrier/>
                    </Section>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
        idUser: state.idUser,
        vets: state.vets,
        instructors: state.instructors,
        workers: state.workers,
        farriers: state.farriers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchWorkers: () => dispatch(actions.fetchWorkers()),
        onFetchVets: () => dispatch(actions.fetchVets()),
        onFetchInstructors: () => dispatch(actions.fetchInstructors()),
        onFetchFarriers: () => dispatch(actions.fetchFarriers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffPanel);