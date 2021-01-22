import React, { useState, useEffect } from 'react';
import API from '../../Api';
import UserInfo from '../../components/UserInfo/UserInfo';
import UserActivity from '../../components/UserActivity/UserActivity';
import '../../App.css';
import './Profile.css';

export const Profile = ({ match }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userId = match.params.userId;

        const getUserData = async () => {
            const response = await API.get(`user/${userId.toString()}`);
            setUser(response.data);
        }
        getUserData();
    }, [match.params.userId]);

    return (
        <div className='profile'>
            <UserInfo user={user} />
            <UserActivity user={user} />
        </div>
    );
}