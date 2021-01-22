import React from 'react';
import report from '../../assets/report.svg';

const Report = ({ setPopup }) => {
    return (
        <img alt='report' src={report} onClick={() => setPopup(true)} />
    );
}
export default Report;