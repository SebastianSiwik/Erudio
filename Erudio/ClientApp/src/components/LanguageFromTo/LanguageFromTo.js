import React from 'react';
import flagPoland from '../../assets/flag_poland.png';
import flagUK from '../../assets/flag_uk.png';
import flagUS from '../../assets/flag_us.png';
import flagUnknown from '../../assets/flag_unknown.png';
import arrow from '../../assets/arrow_right.svg';
import './LanguageFromTo.css';

export const LanguageFromTo = ({ from, to }) => {

    const getFlag = (language) => {
        switch (language) {
            case 'English-UK':
                return flagUK;
            case 'English-US':
                return flagUS;
            case 'Polish':
                return flagPoland;
            default:
                return flagUnknown;
        }
    }

    return (
        <div className='languages'>
            <img alt={from} src={getFlag(from)} />
            <img alt='arrow' src={arrow} />
            <img alt={to} src={getFlag(to)} />
        </div>
    );
}
export default LanguageFromTo;