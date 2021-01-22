import React from 'react';
import './Section.css';
import lwing from '../../../assets/images/leftwing.png';
import rwing from '../../../assets/images/rightwing.png';

const Section = (props) => (
    <div className="Section">
        <div className="SectionTitle">
            <img src={lwing} alt="left"/>
            <h2>{props.title}</h2>
            <img src={rwing} alt="right"/>
        </div>
        
        <div className="SectionContent">
            {props.children}
        </div>
    </div>
);

export default Section;

