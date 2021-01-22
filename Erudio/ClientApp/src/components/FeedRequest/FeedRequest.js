import React from 'react';
import LanguageFromTo from '../LanguageFromTo/LanguageFromTo';
import User from '../User/User';
import './FeedRequest.css';

export const FeedRequest = ({ request, highlighted, onClick }) => {
    const handleClick = onClick;

    return (
        <div className={`request ${highlighted ? 'request-clicked' : ''}`}
            onClick={() => handleClick(request)}>

            <LanguageFromTo from={request.fromLanguageCode} to={request.toLanguageCode} />
            <User userId={request.authorId} />
            <div className='requested-text'>
                {request.text}
            </div>
        </div>
    );
}
export default FeedRequest;