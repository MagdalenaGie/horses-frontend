import React from 'react';
import './InputFrame.css';
import lhorse from '../../../assets/images/lil-horse.png';
import rhorse from '../../../assets/images/lil-horse-r.png';

const InputFrame = (props) => {
    return(
        <div className="InputFrame">
            <img src={rhorse} alt="horse-img-left"/>
            {props.children}
            <img src={lhorse} alt="horse-img-right"/>
        </div>
        
    );
}

export default InputFrame;