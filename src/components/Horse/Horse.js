import React from 'react';
import horseimg from '../../assets/images/lil-horse.png';
import './Horse.css';

const Horse = (props) => {
    let decentlyFormatedDate = new Date(props.ur);
    let month = decentlyFormatedDate.getMonth()+1;
    let urDate = decentlyFormatedDate.getDate() + " - " + month + " - " + decentlyFormatedDate.getFullYear() + " r.";
    return(
        <div className="Tile" onClick={props.clicked}>
            <div className="TileTop">
                <img className="Horseimg" src={horseimg} alt="Horse"/>
                <h3>{props.imie}</h3>
            </div>
            <div className="TileBottom">
                <p><b>Właściciel:</b> {props.w_imie + " " + props.nazwisko} </p>
                <p><b>Rasa:</b> {props.rasa}</p>
                <p><b>Data urodzenia:</b> {urDate}</p>
            </div>
            
        </div>
    )
}
 export default Horse;