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

const LanguageChoice = ({ choice, active, onClick }) => {
    return (
        <li onClick={onClick} className={active ? 'selected-language-option' : ''}>
            {choice}
        </li>
    );
}

const LanguageChoiceBar = () => {
    const [chosen, setChosen] = useState();
    const choices = [
        'All',
        'Polish to English (UK)',
        'English (UK) to Polish',
        'Polish to English (US)',
        'English (US) to Polish'
    ];

    return (
        <div className='language-bar'>
            <ul className='language-bar-list'>
                {choices.map(choice => (
                    <LanguageChoice key={choice}
                                    choice={choice}
                                    active={choice === chosen}
                                    onClick={() => setChosen(choice)} />
                ))}
            </ul>
        </div>
    );
}

const User = (props) => {
    return (
        <div className='user'>
            <img className='avatar' src={props.avatar} /> {props.name}
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

export class Request extends Component {
    render() {
        return (
            <div className='request'>
                <LanguageFromTo from={this.props.fromLanugage} to={this.props.toLanguage}/>
                <div className='user'>
                    <User {...this.props.user}/>
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
            sendButtonDisabled: true
        }
    }

    handleSendButtonColor(event) {
        if (this.state.sendButtonDisabled && event.target.textContent.trim() !== '') {
            this.setState({
                sendButtonDisabled: false
            });
        }
        else if (!this.state.sendButtonDisabled && event.target.textContent.trim() === '') {
            this.setState({
                sendButtonDisabled: true
            });
        }
    }

    render() {
        return (
            <div className='detailed-request'>
                <div className='row'>
                    <User {...this.props.user}/>
                    <LanguageFromTo from={this.props.fromLanugage} to={this.props.toLanguage}/>
                </div>
                <div className='date'>{this.props.date.toLocaleDateString()}</div>
                <div className='requested-text-detailed'>{this.props.text}</div>
                <div className='context'>Context: {this.props.context}</div>
                <img className='context-image' src={this.props.contextImage}/>
                <div className='translation'>
                    <span className='translation-textbox'
                          role='textbox'
                          placeholder='Translate...'
                          onKeyUp={event => this.handleSendButtonColor(event)}
                          contentEditable/>
                    <img className='send' src={this.state.sendButtonDisabled ? sendDisabled : send}/>
                </div>
            </div>
        );
    }
}

export class Feed extends Component {

    getMockRequest() {
        const request = {
            'user': {
                'name': 'Mark',
                'avatar': avatar
            },
            'fromLanugage': 'English-UK',
            'toLanguage': 'Polish',
            'text': 'I will never let you down.',
            'context': 'Dunno, like they can count on you and stuff',
            'contextImage': contextImage,
            'date': new Date('January 03 2021 12:30')
        };

        return request;
    }

    render() {
        const mockRequest = this.getMockRequest();

        return (
            <div>
                <LanguageChoiceBar />
                <div className='page'>
                    <Request {...mockRequest} />
                    <DetailedRequest {...mockRequest} />
                </div>
            </div>
        );
    }
}