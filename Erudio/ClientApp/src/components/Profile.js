import React, { useState } from 'react';
import '../App.css';
import './Profile.css';
import { mockUser, feedMockRequests, joshuaMockRequests } from './Mock.js'
import { User, Request } from './Feed';

const UserInfo = (props) => {
    const getLanguageString = (language) => {
        switch (language) {
            case 'English-UK':
                return 'English (UK)';
            case 'English-US':
                return 'English (US)';
            case 'Polish':
                return 'Polish';
            default:
                return null;
        }
    }

    const joinLanguagesFromArray = (languageArray) => {
        return languageArray.map(language => getLanguageString(language)).join(', ');
    }

    const nativeLanguages = joinLanguagesFromArray(props.nativeLanguages);
    const languagesOfInterest = joinLanguagesFromArray(props.languagesOfInterest);

    return (
        <div className='profile-half'>
            <User className='profile-user' name={props.name} avatar={props.avatar} />
            <div className='user-info'>
                <span>
                    Translations: <b>{feedMockRequests.length}</b>
                </span>
                <span>
                Requests: <b>{joshuaMockRequests.length}</b>
                </span>
                <span>
                Native language(s): <b>{nativeLanguages}</b>
                </span>
                <span>
                Language(s) of interest: <b>{languagesOfInterest}</b>
                </span>
                <span>
                Account created on: <b>{props.registerDate.toLocaleDateString()}</b>
                </span>
            </div>
        </div>
    );
}

const RequestList = ({ requests }) => {
    return (
        <div className='activity-list'>
            {requests.map(request => (
                <Request {...request}
                    key={request.id} />
            ))}
        </div>
    );
}

const UserActivity = () => {
    const [filter, setFilter] = useState('Requested');

    const handleClick = (event) => {
        setFilter(event.target.textContent);
    }

    return (
        <div className='profile-half'>
            <ul className='activity-type'>
                <li className={filter === 'Requested' ? 'highlighted' : ''}
                    onClick={event => handleClick(event)}>Requested</li>
                <li className={filter === 'Answered' ? 'highlighted' : ''}
                    onClick={event => handleClick(event)}>Answered</li>
            </ul>
            <RequestList requests={filter === 'Answered' ? feedMockRequests : joshuaMockRequests} />
        </div>
    );
}

export const Profile = () => {
    return (
        <div className='profile'>
            <UserInfo {...mockUser} />
            <UserActivity />
        </div>
    );
}