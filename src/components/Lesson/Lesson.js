import React from 'react';
import beg from '../../assets/images/beginner.png';
import mid from '../../assets/images/mid.png';
import adv from '../../assets/images/advanced.png';
import drsg from '../../assets/images/dressage.png';
import jump from '../../assets/images/jumping.png';
import './Lesson.css';

//TODO: dodac klasę od poziomu zaawansowania

const Lesson = (props) => {
    const typ = props.typ;
    let lessonType = '';
    let classType = '';
    let title = ''
    switch(typ){
        case('poczatkujacy'):
            lessonType = beg;
            classType = 'beg';
            title = 'Lekcja jazdy w grupie';
            break;
        case('sredniozaawansowani'):
            lessonType = mid;
            classType = 'mid';
            title = 'Lekcja jazdy w grupie';
            break;
        case('zaawansowani'):
            lessonType = adv;
            classType = 'adv';
            title = 'Lekcja jazdy w grupie';
            break;
        case('trening sportowy - skoki'):
            lessonType = jump;
            classType = 'jump';
            title = 'Trening skoków';
            break;
        case('trening indywidualny'):
            lessonType = drsg;
            classType = 'drsg';
            title = 'Indywidualny trening';
            break;
        default:
            lessonType = beg;
            classType = 'beg';
            title = 'Lekcja jazdy w grupie';
    }

    return(
        <div className={"Lesson " + classType} onClick={props.clicked}>
            <div className="LessonTop">
                <img className="Horseimg" src={lessonType} alt="Horse"/>
                <h3>{title}</h3>
            </div>
            <div className="LessonBottom">
                <p><b>Instruktor:</b> {props.instruktor}</p>
                <p><b>Termin:</b> {props.dzien} {props.godzina}</p>
                <p><b>Poziom:</b> {props.typ}</p>
                <p><b>Cena:</b> {props.cena} zł</p>
            </div>
            
        </div>
    )
}
 export default Lesson;