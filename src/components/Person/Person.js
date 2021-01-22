import React from 'react';
import horseimg from '../../assets/images/lil-horse.png';
import './Person.css';

const Person = (props) => {
    return(
        <div className="Person">
            <div className="PersonTop">
                <img className="Horseimg" src={horseimg} alt="Horse"/>
                <h3>{props.title}</h3>
            </div>
            <div className="PersonBottom">
                {props.children}
            </div>
        </div>
    )
}
 export default Person;