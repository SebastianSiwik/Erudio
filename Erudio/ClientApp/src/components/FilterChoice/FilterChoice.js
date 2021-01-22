import React from 'react';
import './FilterChoice.css';

export const FilterChoice = ({ choice, active, onClick }) => {
    return (
        <li onClick={onClick} className={active ? 'selected-language-option' : ''}>
            {choice.caption}
        </li>
    );
}
export default FilterChoice;