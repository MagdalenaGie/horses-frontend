import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';
import Section from '../../../components/Forms/Section/Section';
import AddLesson from '../../../containers/AddDataForms/AddLesson/AddLesson';
import Person from '../../Person/Person';
import ChangeLesson from '../../../containers/ManageDataForms/ChangeLesson/ChangeLesson';
import DeleteLesson from '../../../containers/ManageDataForms/DeleteLesson/DeleteLesson';

class ManageLessons extends Component{

    componentDidMount(){
        if(this.props.isAdmin){
            this.props.onFetchInstructors();
        }
    }
 
    render(){
            let instructorsList = this.props.instructors.map(ins => (
                <Person title={ins.imie + " " + ins.nazwisko} key={ins.id_instruktor}></Person>
            ) );

        return(
            <div>
                <Section title="Instruktorzy:">
                        {instructorsList}
                </Section>
                <Section title="Dodaj lekcję: ">
                    <AddLesson/>
                </Section>
                <Section title="Zmień termin lekcji">
                    <ChangeLesson/>
                </Section>
                <Section title="Odwołaj lekcję">
                    <DeleteLesson/>
                </Section>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        isAdmin: state.isAdmin,
        instructors: state.instructors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchInstructors: () => dispatch(actions.fetchInstructors()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLessons);