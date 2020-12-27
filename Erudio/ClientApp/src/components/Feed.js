import React, { Component, useState } from 'react';
import '../App.css';
import './Feed.css';
import flagPoland from '../images/flag_poland.png';
import flagUK from '../images/flag_uk.png';
import flagUS from '../images/flag_us.png';
import flagUnknown from '../images/flag_unknown.png';
import avatar from '../images/avatar.png';
import contextImage from '../images/iciu.png';
import arrow from '../images/arrow_right.svg';
import send from '../images/send.svg';
import sendDisabled from '../images/send-disabled.svg';

const FilterChoice = ({ choice, active, onClick }) => {
    return (
        <li onClick={onClick} className={active ? 'selected-language-option' : ''}>
            {choice.caption}
        </li>
    );
}

const FilterBar = ({ filterState, setHidden, setRequestId }) => {
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
        setRequestId(-1);
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

const User = ({ avatar, name }) => {
    return (
        <div className='user'>
            <img className='avatar' src={avatar} /> {name}
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

const RequestMasterDetail = ({ filter, detailHiddenState, requestIdState }) => {
    const [requestId, setRequestId] = requestIdState;
    const [detailHidden, setHidden] = detailHiddenState;

    const handleClick = (requestId) => {
        setRequestId(requestId);
    };


    const mockRequests = [
        {
            'id': 0,
            'user': {
                'name': 'Mark',
                'avatar': avatar
            },
            'fromLanguage': 'English-UK',
            'toLanguage': 'Polish',
            'text': 'I will never let you down.',
            'context': 'Dunno, like they can count on you and stuff',
            'contextImage': contextImage,
            'date': new Date('January 03 2021 12:30')
        },
        {
            'id': 1,
            'user': {
                'name': 'Jake',
                'avatar': avatar
            },
            'fromLanguage': 'English-UK',
            'toLanguage': 'English-US',
            'text': 'Biscuit',
            'context': '',
            'contextImage': null,
            'date': new Date('January 04 2021 12:30')
        },
        {
            'id': 2,
            'user': {
                'name': 'Bruno',
                'avatar': avatar
            },
            'fromLanguage': 'Polish',
            'toLanguage': 'English-US',
            'text': 'Sprężarka',
            'context': 'no w aucie no',
            'contextImage': null,
            'date': new Date('January 05 2021 12:30')
        }
    ];

    const filterResult = mockRequests.filter(request => {
        return request.id === requestId;
    });
    const selectedRequest = filterResult[0];

    setHidden(filterResult.length === 0);

    return (
        <div className='page'>
            <RequestList requests={mockRequests} selectedRequestId={requestId} onClick={handleClick} filter={filter} />
            <DetailedRequest hidden={detailHidden} {...selectedRequest} />
        </div>
    );
}

const RequestList = (props) => {
    let filteredRequests;
    if (props.filter.caption !== 'All') {
        filteredRequests = props.requests.filter(request =>
            request.fromLanguage === props.filter.from
            && request.toLanguage === props.filter.to);
    } else {
        filteredRequests = props.requests;
    }

    return (
        <div className='request-list'>
            {filteredRequests.map(request => (
                <Request {...request}
                    key={request.id}
                    onClick={props.onClick}
                    highlighted={props.selectedRequestId === request.id} />
            ))}
        </div>
    );
}

export class Request extends Component {
    render() {
        const handleClick = this.props.onClick;

        return (
            <div className={`request ${this.props.highlighted ? 'request-clicked' : ''}`}
                onClick={() => handleClick(this.props.id)}>

                <LanguageFromTo from={this.props.fromLanguage} to={this.props.toLanguage} />
                <div className='user'>
                    <User {...this.props.user} />
                </div>
                <div className='requested-text'>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export class DetailedRequest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sendButtonDisabled: true,
            translation: ''
        }
    }

    handleKeyUp(event) {
        if (event.target.textContent.trim() !== '') {
            this.setState({
                sendButtonDisabled: false,
                translation: event.target.textContent.trim()
            });
        }
        else if (event.target.textContent.trim() === '') {
            this.setState({
                sendButtonDisabled: true,
                translation: ''
            });
        }
    }

    handleClick() {
        if (this.state.sendButtonDisabled === false) {
            const translation = { 'translation': this.state.translation };
            return <form onSubmit={alert(JSON.stringify(translation))} />;
        }
    }

    render() {
        if (this.props.hidden) {
            return <div></div>;
        }

        return (
            <div className='detailed-request'>
                <div className='row'>
                    <User {...this.props.user} />
                    <LanguageFromTo from={this.props.fromLanguage} to={this.props.toLanguage} />
                </div>
                <div className='date'>{this.props.date.toLocaleDateString()}</div>
                <div className='requested-text-detailed'>{this.props.text}</div>
                <div className='context'>{this.props.context === '' ? '' : 'Context: ' + this.props.context}</div>
                <img className='context-image' src={this.props.contextImage} />
                <div className='translation'>
                    <span className='translation-textbox'
                        role='textbox'
                        placeholder='Translate...'
                        onKeyUp={event => this.handleKeyUp(event)}
                        contentEditable />
                    <img className='send' src={this.state.sendButtonDisabled ? sendDisabled : send} onClick={() => this.handleClick()} />
                </div>
            </div>
        );
    }
}

export const Feed = () => {
    const initialFilterState = { caption: 'All', from: '', to: '' };
    const filterState = useState(initialFilterState);
    const detailHiddenState = useState(true);
    const requestIdState = React.useState(-1);

    return (
        <div>
            <FilterBar
                filterState={filterState}
                setHidden={detailHiddenState[1]}
                setRequestId={requestIdState[1]} />
            <RequestMasterDetail
                filter={filterState[0]}
                detailHiddenState={detailHiddenState}
                requestIdState={requestIdState} />
        </div>
    );
}