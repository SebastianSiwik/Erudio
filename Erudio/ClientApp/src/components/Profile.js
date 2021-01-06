import API from '../Api';
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import '../App.css';
import './Profile.css';
import { User, Request } from './Feed';

const UserInfo = ({ user }) => {
    const [nativeLanguages, setNativeLanguages] = useState([]);
    const [languagesOfInterest, setLanguagesOfInterest] = useState([]);

    const getLanguages = async () => {
        const native = await API.get(`nativeLanguage/user/${user?.userId}`);
        const interest = await API.get(`languageOfInterest/user/${user?.userId}`);

        setNativeLanguages(native.data);
        setLanguagesOfInterest(interest.data);
    }

    useEffect(() => {
        getLanguages();
    }, [user]);

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
        return languageArray.map(language => getLanguageString(language.languageCode)).join(', ');
    }

    const nativeLanguagesList = joinLanguagesFromArray(nativeLanguages);
    const languagesOfInterestList = joinLanguagesFromArray(languagesOfInterest);

    return (
        <div className='profile-half'>
            <User className='profile-user' userId={user.userId} />
            <div className='user-info'>
                <span>
                    Translations: <b>{user.postedRequests?.length}</b>
                </span>
                <span>
                    Requests: <b>{user.translatedRequests?.length}</b>
                </span>
                <span>
                    Native language(s): <b>{nativeLanguagesList}</b>
                </span>
                <span>
                    Language(s) of interest: <b>{languagesOfInterestList}</b>
                </span>
                <span>
                    Account created on: <b>{dayjs(user.registrationDate).format('DD/MM/YYYY')}</b>
                </span>
            </div>
        </div>
    );
}

const RequestList = ({ requests }) => {

    const history = useHistory();

    const handleClick = (request) => {
        const path = `/post/${request.requestId}`;
        history.replace(path);
    }

    return (
        <div className='activity-list'>
            {requests?.map(request => (
                <Request request={request}
                    onClick={handleClick}
                    key={request.requestId} />
            ))}
        </div>
    );
}

const UserActivity = ({ user }) => {
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
            {<RequestList requests={filter === 'Requested' ? user.postedRequests : user.translatedRequests} />}
        </div>
    );
}

export const Profile = ({ match }) => {
    const userId = match.params.userId;

    const [user, setUser] = useState({});

    const getUserData = async () => {
        const response = await API.get(`user/${userId.toString()}`);
        setUser(response.data);
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className='profile'>
            <UserInfo user={user} />
            <UserActivity user={user} />
        </div>
    );
}