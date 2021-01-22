import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import User from '../User/User';
import Report from '../Report/Report';
import Like from '../Like/Like';
import './Translation.css';

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
                <Like translationId={props.translationId} userId={props.userId} />
            </div>
        </div>
    );
}
export default Translation;