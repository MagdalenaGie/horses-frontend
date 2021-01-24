import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';
import Horse from '../../components/Horse/Horse';
import Section from '../../components/Forms/Section/Section';
import AddHorse from '../../containers/AddDataForms/AddHorse/AddHorse';
import ReportInjury from '../../containers/AddDataForms/ReportInjury/ReportInjuty';
import HorsePanel from '../../containers/Panels/HorsePanel/HorsePanel';
import {Route} from 'react-router-dom';
import ChangePassword from '../../containers/ManageDataForms/ChangePassword/ChangePassword';

class MyAccount extends Component{

    componentDidMount(){
        this.props.onFetchUsrHorses(this.props.idUser);
    }
 
    onClickHorse = (id) => {
        this.props.history.push('/horses/' + id);
    }

    render(){
        let horsesList = this.props.horses.map(horse => (
            <Horse 
                clicked={() => this.onClickHorse(horse.id_kon)} 
                imie={horse.imie} 
                rasa={horse.rasa} 
                ur={horse.data_ur} 
                w_imie={horse.w_imie} 
                nazwisko={horse.w_nazw} 
                key={horse.id_kon} />
        ) );
        
        return(
            <div>
                <Section title={"Twoje konie:"}>
                    {horsesList}
                </Section>
                <Section title="Zgłoś Kontuzję konia:">
                    <ReportInjury/>
                </Section>
                <Section title="Zakwateruj konia:">
                    <AddHorse/>
                </Section>
                <Section title="Zmień hasło do konta:">
                    <ChangePassword/>
                </Section>
                <Route path={this.props.match.url + ":id"} exact component={HorsePanel}/>
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
        horses: state.usrHorses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsrHorses: (idUsr) => dispatch(actions.fetchUsrHorses(idUsr)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);