import React from 'react';
import logo from '../../assets/images/logostajnia.png';
import './MainPage.css';

const MainPage = (props) => {
    return(
        <div className="MainPage">
            <img src={logo} alt="logo"/>
            <h1>Witaj na stronie stajni Kasztanka!</h1>
            <p>
                Poznaj naszą szeroką ofertę - w zakładkach na górze strony możesz zobaczyć listę mieszkających u nas koni oraz harmonogram odbywających się jazd. 
            </p>
            <p>
                Jeśli jesteś właścicielem rezydującego u nas konia - zaloguj się, by zyskać dostęp do dodatkowych opcji! Będziesz mógł zakwaterować kolejnego konia, zapisać się na zajęcia a także zgłosić kontuzję swojego zwierzęcia, chociaż mamy nadzieję że to nie będzie konieczne! Ze swojej strony dołożymy wszelkich starań, aby twój czterokopytny przyjaciel czuł się u nas jak najlepiej.
            </p>
        </div> 
    );
}

export default MainPage;