import React, {Component} from 'react';
import InputFrame from '../../../components/Forms/InputFrame/InputFrame';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/actions';

class AddParticipant extends Component {

    state = {
        choosenHorse: '',
        loadedHorses: false
    }

    componentDidMount(){
        this.props.onFetchUsrHorses(this.props.idUser);
    }
 
    onChangeKon = (event) => {
        this.setState({
            choosenHorse: event.target.value});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let para = {
            id_wlasciciel: this.props.idUser,
            id_kon: this.state.choosenHorse,
            id_lekcja: this.props.lekcjaId
        }
        console.log(para);
        this.props.onPostPair(para);
    }

    render(){
        let content = null;
        let horses = this.props.horses;
        let options = [];
        if(horses.length>0){
            options = this.props.horses.map(horse => (
            <option key={horse.id_kon} value={horse.id_kon}>{horse.imie}</option>
        ));
        }

        if(this.props.isAuth){
            content = (
                <form onSubmit={this.onSubmitHandler}>
                    <h3>Wybierz konia, na którym chcesz wziąć udział w zajęciach:</h3><br/>
                    <select placeholder="Wybierz konia" onChange={this.onChangeKon} defaultValue="default">
                        {options}
                        <option value="default" key="aaa123" disabled hidden> Wybierz konia </option>
                    </select>
                    <br/><br/>
                    <input type="submit" value="Wyślij" />
                </form>
            )
        }else{
            content = <h3>Zaloguj się, by zapisać się na zajęcia!</h3>;
        }

        return(
            <InputFrame>
                {content}
            </InputFrame>
        );
    }
    
}

const mapStateToProps = state => {
    return {
        horses: state.usrHorses,
        isAuth: state.isAuth,
        idUser: state.idUser
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        onFetchUsrHorses: (idUsr) => dispatch(actions.fetchUsrHorses(idUsr)),
        onFetchLessonDetails: (idLesson) => dispatch(actions.fetchLessonDetails(idLesson)),
        onPostPair: (pairData) => dispatch(actions.postPair(pairData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddParticipant);