import API from '../Api';
import authService from './api-authorization/AuthorizeService';
import { Redirect, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import '../App.css';
import './Post.css';
import { LanguageFromTo } from './Feed';
import { User } from './Feed';
import { ReportPopup } from './ReportPopup'
import like from '../images/like.svg';
import likeEmpty from '../images/like_empty.svg';
import send from '../images/send.svg';
import sendDisabled from '../images/send_disabled.svg';
import report from '../images/report.svg';
import star from '../images/star.svg';
import starEmpty from '../images/star_empty.svg';

const Like = () => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    }

    return (
        <img alt='like' src={liked ? like : likeEmpty} onClick={handleClick} />
    );
}

const Report = ({ setPopup }) => {
    return (
        <img alt='report' src={report} onClick={() => setPopup(true)} />
    );
}

const Bookmark = () => {
    const [bookmarked, setBookmark] = useState(false);

    const handleClick = () => {
        setBookmark(!bookmarked);
    }

    return (
        <img alt='bookmark' src={bookmarked ? star : starEmpty} onClick={handleClick} />
    );
}

const Translation = (props) => {
    dayjs.extend(relativeTime);
    dayjs.extend(utc);

    return (
        <div className='translation'>
            <div>
                <Link className='link' to={`/profile/${props.authorId}`}>
                    <User userId={props.authorId} />
                </Link>
                <div className='date'>{dayjs(props.date, { 'utc': true }).fromNow()}</div>
                <div className='translated-text'>{props.text}</div>
                <div className='context'>{props.explanation}</div>
                <img className='context-image' alt='' src={props.explanationImage} />
            </div>
            <div className='translation-buttons'>
                <Report setPopup={props.setPopup} />
                <Like />
            </div>
        </div>
    );
}

const TranslationList = ({ requestId, setPopup }) => {

    const [translations, setTranslations] = useState([]);

    useEffect(() => {
        let isActive = true;
        const getTranslations = async () => {
            if (isActive) {
                const response = await API.get(`translation/request/${requestId}`);
                setTranslations(response.data);
            }
        }
        getTranslations();
        return () => {
            isActive = false
        };
    }, [requestId]);

    return (
        <div className='translations'>
            <h1>Translations</h1>
            <div>
                {translations.length !== 0 ?
                    translations.map(translation => (
                        <Translation {...translation} key={translation.translationId} setPopup={setPopup} />
                    ))
                    :
                    <div className='information-message'>There are no translations for this request yet. Be the first one to help!</div>
                }
            </div>
        </div>
    );
}

const Request = ({ requestId, setPopup, isAuthenticated, userId }) => {
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
                    <Bookmark />
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
            <Request requestId={requestId} setPopup={setPopup} isAuthenticated={isAuthenticated} userId={userId} />
            <TranslationList requestId={requestId} setPopup={setPopup} />

            {popupShown ?
                <ReportPopup handleClick={setPopup} />
                : null
            }
        </div>
    );
}