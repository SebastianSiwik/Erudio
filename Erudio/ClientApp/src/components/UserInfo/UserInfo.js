import React, { useState, useEffect } from 'react';
import API from '../../Api';
import dayjs from 'dayjs';
import User from '../User/User';
import './UserInfo.css';

const UserInfo = ({ user }) => {
    const [nativeLanguages, setNativeLanguages] = useState([]);
    const [languagesOfInterest, setLanguagesOfInterest] = useState([]);

    useEffect(() => {
        const getLanguages = async () => {
            const native = await API.get(`nativeLanguage/user/${user?.userId}`);
            const interest = await API.get(`languageOfInterest/user/${user?.userId}`);

            setNativeLanguages(native.data);
            setLanguagesOfInterest(interest.data);
        }
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
export default UserInfo;