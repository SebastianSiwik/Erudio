import React, { useState, useEffect } from 'react';
import API from '../../Api';
import avatar from '../../assets/avatar.png';
import './User.css';

export const User = ({ userId, className }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async (id) => {
            if (id) {
                const response = await API.get(`user/${id}`);
                setUser(response.data);
            }
        }
        getUser(userId);
    }, [userId]);


    const getAvatar = () => {
        return user.profilePicture !== null ?
            user.profilePicture :
            avatar;
    }

    return (
        <div className={`user ${className}`}>
            <img alt='avatar' className='avatar' src={getAvatar()} /> {user.userName}
        </div>
    );
}
export default User;