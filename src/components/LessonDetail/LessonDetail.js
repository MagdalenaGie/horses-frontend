import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';
import Person from '../Person/Person';
import Section from '../Forms/Section/Section';
import AddParticipant from '../../containers/AddDataForms/AddParticipant/AddParticipant';

class LessonDetail extends Component {
    
    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.onFetchLessonDetails(id);
    }

    render(){ 
        let participants = [];
        participants = this.props.details.map( pair => (
            <Person key={pair.id_kon + pair.id_wlasciciel + pair.id_lekcja} title={pair.j_im + ' & ' + pair.k_im}>
                <p><b>Jeździec: </b>{pair.j_im + ' ' + pair.j_nzw}</p>
                <p><b>Koń: </b>{pair.k_im}</p>
            </Person>
        ));
        return(
        <div>
            <Section title="Uczestnicy:">
                {participants}
            </Section>
            <Section title={"Zapisz się: "}>
                <AddParticipant lekcjaId={this.props.match.params.id}/>
            </Section>
            
        </div>
    );
    }
    

}

const mapStateToProps = state => {
    return {
        details: state.lessonDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchLessonDetails: (idLesson) => dispatch(actions.fetchLessonDetails(idLesson))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonDetail);