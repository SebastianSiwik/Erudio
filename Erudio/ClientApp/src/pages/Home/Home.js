import authService from '../../components/api-authorization/AuthorizeService';
import React, { useEffect, useState } from 'react';
import HeaderText from '../../components/HeaderText/HeaderText';
import TranslationRequestForm from '../../components/TranslationRequestForm/TranslationRequestForm';
import BackgroundImage from '../../components/BackgroundImage/BackgroundImage';
import '../../App.css';
import './Home.css';

export const Home = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const _subscription = authService.subscribe(() => populateState());
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
        <div className='row-container'>
            <div className='left-side'>
                <HeaderText />
                <TranslationRequestForm isAuthenticated={isAuthenticated} userId={userId} />
            </div>
            <BackgroundImage />
        </div>
    );
}
