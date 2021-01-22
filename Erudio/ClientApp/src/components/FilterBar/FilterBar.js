import React from 'react';
import FilterChoice from '../FilterChoice/FilterChoice';
import './FilterBar.css';

export const FilterBar = ({ filterState, setHidden, setChosenRequest }) => {
    const choices = [
        { caption: 'All', from: '', to: '' },
        { caption: 'Polish to English (UK)', from: 'Polish', to: 'English-UK' },
        { caption: 'English (UK) to Polish', from: 'English-UK', to: 'Polish' },
        { caption: 'Polish to English (US)', from: 'Polish', to: 'English-US' },
        { caption: 'English (US) to Polish', from: 'English-US', to: 'Polish' },
        { caption: 'English (UK) to English (US)', from: 'English-UK', to: 'English-US' },
        { caption: 'English (US) to English (UK)', from: 'English-US', to: 'English-UK' }
    ];

    const [filter, setFilter] = filterState;

    const handleClick = (choice) => {
        setFilter(choice);
        setHidden(true);
        setChosenRequest({});
    }

    return (
        <div className='filter-bar'>
            <ul className='filter-bar-list'>
                {choices.map(choice => (
                    <FilterChoice key={choice.caption}
                        choice={choice}
                        active={choice.caption === filter.caption}
                        onClick={() => handleClick(choice)} />
                ))}
            </ul>
        </div>
    );
}
export default FilterBar;
