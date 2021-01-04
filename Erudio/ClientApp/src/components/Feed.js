import API from '../Api';
import React, { Component, useState, useEffect } from 'react';
import dayjs from 'dayjs'
import '../App.css';
import './Feed.css';
import avatar from '../images/avatar.png';
import flagPoland from '../images/flag_poland.png';
import flagUK from '../images/flag_uk.png';
import flagUS from '../images/flag_us.png';
import flagUnknown from '../images/flag_unknown.png';
import arrow from '../images/arrow_right.svg';
import send from '../images/send.svg';
import sendDisabled from '../images/send_disabled.svg';

const FilterChoice = ({ choice, active, onClick }) => {
    return (
        <li onClick={onClick} className={active ? 'selected-language-option' : ''}>
            {choice.caption}
        </li>
    );
}

const FilterBar = ({ filterState, setHidden, setChosenRequest }) => {
    const choices = [
        { caption: 'All', from: '', to: '' },
        { caption: 'Polish to English (UK)', from: 'Polish', to: 'English-UK' },
        { caption: 'English (UK) to Polish', from: 'English-UK', to: 'Polish' },
        { caption: 'Polish to English (US)', from: 'Polish', to: 'English-US' },
        { caption: 'English (US) to Polish', from: 'English-US', to: 'Polish' },
        { caption: 'English (UK) to English (US)', from: 'English-UK', to: 'English-US' },
        { caption: 'English (US) to English (UK)', from: 'English-US', to: 'English-UK' }
    ];

    const [filter, setFilter] = filterState;

    const handleClick = (choice) => {
        setFilter(choice);
        setHidden(true);
        setChosenRequest({});
    }

    return (
        <div className='filter-bar'>
            <ul className='filter-bar-list'>
                {choices.map(choice => (
                    <FilterChoice key={choice.caption}
                        choice={choice}
                        active={choice.caption === filter.caption}
                        onClick={() => handleClick(choice)} />
                ))}
            </ul>
        </div>
    );
}

export const User = ({ userId, className }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        API.get(`user/${userId}`).then(res => {
            setUser(res.data);
        });
    }, [userId]);


    const getAvatar = () => {
        return user.profilePicture !== null ?
            user.profilePicture :
            avatar;
    }

    return (
        <div className={`user ${className}`}>
            <img className='avatar' src={getAvatar()} /> {user.userName}
        </div>
    );
}

export class LanguageFromTo extends Component {

    getFlag(language) {
        switch (language) {
            case 'English-UK':
                return flagUK;
            case 'English-US':
                return flagUS;
            case 'Polish':
                return flagPoland;
            default:
                return flagUnknown;
        }
    }

    render() {

        return (
            <div className='languages'>
                <img src={this.getFlag(this.props.from)} />
                <img src={arrow} />
                <img src={this.getFlag(this.props.to)} />
            </div>
        );
    }
}

const RequestMasterDetail = ({ filter, detailHiddenState, chosenRequestState }) => {
    const [chosenRequest, setChosenRequest] = chosenRequestState;
    const [detailHidden, setHidden] = detailHiddenState;
    const [requests, setRequests] = useState([]);

    let isActive = true;

    useEffect(() => {
        API.get('request').then(res => {
            if (isActive) {
                setRequests(res.data.sort(sortByDate));
            }
        });
        return () => {
            isActive = false;
        }
    }, [requests]);

    const sortByDate = (a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    }

    const handleClick = (request) => {
        setChosenRequest(request);
        setHidden(false);
    };

    if (Object.keys(chosenRequest).length === 0 &&
        chosenRequest.constructor === Object) {
        setHidden(true);
    }

    return (
        <div className='page'>
            <RequestList requests={requests} selectedRequestId={chosenRequest.requestId} onClick={handleClick} filter={filter} />
            <DetailedRequest hidden={detailHidden} request={chosenRequest} />
        </div>
    );
}

const RequestList = (props) => {
    let filteredRequests;
    if (props.filter.caption !== 'All') {
        filteredRequests = props.requests.filter(request =>
            request.fromLanguageCode === props.filter.from
            && request.toLanguageCode === props.filter.to);
    } else {
        filteredRequests = props.requests;
    }

    return (
        <div className='request-list'>
            {filteredRequests.map(request => (
                <Request request={request}
                    key={request.requestId}
                    onClick={props.onClick}
                    highlighted={props.selectedRequestId === request.requestId} />
            ))}
        </div>
    );
}

export const Request = ({ request, highlighted, onClick }) => {
    const handleClick = onClick;

    return (
        <div className={`request ${highlighted ? 'request-clicked' : ''}`}
            onClick={() => handleClick(request)}>

            <LanguageFromTo from={request.fromLanguageCode} to={request.toLanguageCode} />
            <div className='user'>
                <User userId={request.authorId} />
            </div>
            <div className='requested-text'>
                {request.text}
            </div>
        </div>
    );

}

export const DetailedRequest = ({ hidden, request }) => {

    const relativeTime = require('dayjs/plugin/relativeTime');
    dayjs.extend(relativeTime);

    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [translation, setTranslation] = useState('');

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

    const handleClick = () => {
        if (sendButtonDisabled === false) {
            const object = { 'translation': translation };
            return <form onSubmit={alert(JSON.stringify(object))} />;
        }
    }

    if (hidden) {
        return <div></div>;
    }

    return (
        <div className='detailed-request'>
            <div className='row'>
                <User userId={request.authorId} />
                <LanguageFromTo from={request.fromLanguageCode} to={request.toLanguageCode} />
            </div>
            <div className='date'>{dayjs(request.date).fromNow()}</div>
            <div className='requested-text-detailed'>{request.text}</div>
            <div className='context'>
                {request.context === '' || request.context === null ? '' : 'Context: ' + request.context}
            </div>
            <img className='context-image' src={request.contextImage} />
            <div className='translation'>
                <span className='translation-textbox'
                    role='textbox'
                    placeholder='Translate...'
                    onKeyUp={event => handleKeyUp(event)}
                    contentEditable />
                <img className='send' src={sendButtonDisabled ? sendDisabled : send} onClick={handleClick} />
            </div>
        </div>
    );
}

export const Feed = () => {
    const initialFilterState = { caption: 'All', from: '', to: '' };
    const filterState = useState(initialFilterState);
    const detailHiddenState = useState(true);
    const chosenRequestState = React.useState({});

    return (
        <div>
            <FilterBar
                filterState={filterState}
                setHidden={detailHiddenState[1]}
                setChosenRequest={chosenRequestState[1]} />
            <RequestMasterDetail
                filter={filterState[0]}
                detailHiddenState={detailHiddenState}
                chosenRequestState={chosenRequestState} />
        </div>
    );
}