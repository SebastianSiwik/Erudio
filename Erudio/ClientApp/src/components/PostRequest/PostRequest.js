import React, { useState, useEffect } from 'react';
import API from '../../Api';
import { Redirect, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import User from '../User/User';
import LanguageFromTo from '../LanguageFromTo/LanguageFromTo';
import Bookmark from '../Bookmark/Bookmark';
import Report from '../Report/Report';
import send from '../../assets/send.svg';
import sendDisabled from '../../assets/send_disabled.svg';
import './PostRequest.css';

const PostRequest = ({ requestId, setPopup, isAuthenticated, userId }) => {
    dayjs.extend(relativeTime);
    dayjs.extend(utc);

    const imageMetadata = 'data:image/png;base64,';

    const [shouldRedirect, setRedirect] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [translation, setTranslation] = useState('');
    const [request, setRequest] = useState({});

    useEffect(() => {
        const getRequest = async () => {
            const result = await API.get(`request/${requestId}`);
            setRequest(result.data);
        }
        getRequest();
    }, [requestId]);

    const handleChange = (event) => {
        if (event.target.value.trim() !== '') {
            setSendButtonDisabled(false);
            setTranslation(event.target.value.trim());
        }
        else if (event.target.value.trim() === '') {
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
                'requestId': parseInt(requestId),
                'authorId': userId,
                'text': translation
            };
            await API.post('translation', object);
        }
    }

    const formRedirect = () => {
        if (shouldRedirect) {
            return <Redirect to='/authorizeFeed/' />
        }
    }

    return (
        <div className='post-request'>
            <div className='row'>
                <Link className='link' to={`/profile/${request.authorId}`}>
                    <User userId={request.authorId} />
                </Link>
                <LanguageFromTo from={request.fromLanguageCode} to={request.toLanguageCode} />
            </div>
            <div className='date'>{dayjs(request.date, { 'utc': true }).fromNow()}</div>
            <div className='post-request-row'>
                <div>
                    <div className='requested-text-detailed'>{request.text}</div>
                    <div className='context'>{request.context === '' ? '' : 'Context: ' + request.context}</div>
                    <img className='context-image' alt=''
                        src={request.contextImage ? imageMetadata + request.contextImage : null} />
                </div>
                <div className='post-request-buttons'>
                    <Bookmark requestId={requestId} userId={userId} />
                    <Report setPopup={setPopup} />
                </div>
            </div>
            <form>
                <textarea
                    className='text-box post-textarea'
                    placeholder='Translate...'
                    onChange={event => handleChange(event)} />
                <button className='send-button' disabled={sendButtonDisabled} onClick={handleClick}>
                    <div>Send</div>
                    <img alt='send' src={sendButtonDisabled ? sendDisabled : send} />
                </button>
                {formRedirect()}
            </form>
        </div>
    );
}
export default PostRequest;