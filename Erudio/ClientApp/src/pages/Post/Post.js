import React, { useState, useEffect } from 'react';
import authService from '../../components/api-authorization/AuthorizeService';
import PostRequest from '../../components/PostRequest/PostRequest';
import TranslationList from '../../components/TranslationList/TranslationList';
import ReportPopup from '../../components/ReportPopup/ReportPopup';
import '../../App.css';
import './Post.css';

export const Post = ({ match }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    const [popupShown, setPopup] = useState(false);
    const requestId = match.params.requestId;

    useEffect(() => {
        const _subscription = authService.subscribe(() => this.populateState());
        populateState();

        return () => {
            authService.unsubscribe(_subscription);
        }
    });

    const populateState = async () => {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        setAuthenticated(isAuthenticated);
        setUserId(user && user.sub);
    }

    return (
        <div className='post'>
            <PostRequest requestId={requestId} setPopup={setPopup} isAuthenticated={isAuthenticated} userId={userId} />
            <TranslationList requestId={requestId} setPopup={setPopup} userId={userId} />

            {popupShown ?
                <ReportPopup handleClick={setPopup} />
                : null
            }
        </div>
    );
}