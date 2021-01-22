import React, { useState, useEffect } from 'react';
import API from '../../Api';
import ProfileRequestList from '../ProfileRequestList/ProfileRequestList';
import './UserActivity.css';

const UserActivity = ({ user }) => {
    const [filter, setFilter] = useState('Requested');
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        let isActive = true;
        const getBookmarks = async () => {
            const response = await API.get(`requestBookmark/user/${user.userId}`);
            if (isActive) {
                setBookmarks(response.data);
            }
        }
        getBookmarks();
        return () => {
            isActive = false;
        }
    });

    const handleClick = (event) => {
        setFilter(event.target.textContent);
    }

    const getRequestList = (filter) => {
        switch (filter) {
            case 'Requested':
                return user.postedRequests;
            case 'Answered':
                return user.translatedRequests;
            case 'Bookmarked':
                return bookmarks;
            default:
                return [];
        }
    }

    return (
        <div className='profile-half'>
            <ul className='activity-type'>
                <li className={filter === 'Requested' ? 'highlighted' : ''}
                    onClick={event => handleClick(event)}>Requested</li>
                <li className={filter === 'Answered' ? 'highlighted' : ''}
                    onClick={event => handleClick(event)}>Answered</li>
                <li className={filter === 'Bookmarked' ? 'highlighted' : ''}
                    onClick={event => handleClick(event)}>Bookmarked</li>
            </ul>
            <ProfileRequestList requests={getRequestList(filter)} />
        </div>
    );
}
export default UserActivity;