import React, { useState, useEffect } from 'react';
import API from '../../Api';
import authService from '../api-authorization/AuthorizeService';
import { Redirect, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import LanguageFromTo from '../LanguageFromTo/LanguageFromTo';
import User from '../User/User';
import send from '../../assets/send.svg';
import sendDisabled from '../../assets/send_disabled.svg';
import './DetailedRequest.css';

export const DetailedRequest = ({ hidden, request }) => {
    dayjs.extend(relativeTime);

    const imageMetadata = 'data:image/png;base64,';

    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [shouldRedirect, setRedirect] = useState(false);

    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [translation, setTranslation] = useState('');

    useEffect(() => {

        const _subscription = authService.subscribe(() => this.populateState());
        populateState();

        return () => {
            authService.unsubscribe(_subscription);
        }
    }, [userId]);

    const populateState = async () => {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        setAuthenticated(isAuthenticated);
        setUserId(user && user.sub);
    }

    const handleKeyUp = (event) => {
        if (event.target.textContent.trim() !== '') {
            setSendButtonDisabled(false);
            setTranslation(event.target.textContent.trim());
        }
        else if (event.target.textContent.trim() === '') {
            setSendButtonDisabled(true);
            setTranslation('');
        }
    }

    const handleClick = async () => {
        if (sendButtonDisabled === false) {
            if (!isAuthenticated) {
                setRedirect(true);
            }

            const object = {
                'requestId': request.requestId,
                'authorId': userId,
                'text': translation
            };
            await API.post('translation', object);
            setRedirect(true);
        }
    }

    const formRedirect = () => {
        if (shouldRedirect) {
            return <div>
                {isAuthenticated ? <Redirect to={`/post/${request.requestId}`} /> : <Redirect to='/authorizeFeed' />}
            </div>
        }
    }

    if (hidden) {
        return <div></div>;
    }

    return (
        <div className='detailed-request'>
            <div className='row'>
                <Link className='link' to={`/profile/${request.authorId}`}>
                    <User userId={request.authorId} />
                </Link>
                <LanguageFromTo from={request.fromLanguageCode} to={request.toLanguageCode} />
            </div>
            <Link to={`/post/${request.requestId}`}>
                <div className='date'>{dayjs(request.date, { 'utc': true }).fromNow()}</div>
            </Link>
            <div className='requested-text-detailed'>{request.text}</div>
            <div className='context'>
                {request.context === '' || request.context === null ? '' : 'Context: ' + request.context}
            </div>
            <img alt='' className='context-image'
                src={request.contextImage ? imageMetadata + request.contextImage : null} />
            <div className='translation'>
                <span className='translation-textbox'
                    role='textbox'
                    placeholder='Translate...'
                    onKeyUp={event => handleKeyUp(event)}
                    contentEditable />
                <img alt='send' className='send' src={sendButtonDisabled ? sendDisabled : send} onClick={handleClick} />
            </div>
            {formRedirect()}
        </div>
    );
}
export default DetailedRequest;