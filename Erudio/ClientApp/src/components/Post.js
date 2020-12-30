import React, { Component, useState } from 'react';
import '../App.css';
import './Post.css';
import { LanguageFromTo } from './Feed';
import { User } from './Feed';
import flagPoland from '../images/flag_poland.png';
import flagUK from '../images/flag_uk.png';
import flagUS from '../images/flag_us.png';
import flagUnknown from '../images/flag_unknown.png';
import avatar from '../images/avatar.png';
import contextImage from '../images/iciu.png';
import letDown from '../images/let_down.png';
import arrow from '../images/arrow_right.svg';
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
        <img src={liked ? like : likeEmpty} onClick={handleClick} />
    );
}

const Report = () => {
    return (
        <img src={report} />
    );
}

const Bookmark = () => {
    const [bookmarked, setBookmark] = useState(false);

    const handleClick = () => {
        setBookmark(!bookmarked);
    }

    return (
        <img src={bookmarked ? star : starEmpty} onClick={handleClick} />
    );
}

const Translation = (props) => {
    return (
        <div className='translation'>
            <div>
                <User {...props.user} />
                <div className='date'>{props.date.toLocaleDateString()}</div>
                <div className='translated-text'>{props.text}</div>
                <div className='context'>{props.explanation}</div>
                <img className='context-image' src={props.explanationImage} />
            </div>
            <div className='translation-buttons'>
                <Report />
                <Like />
            </div>
        </div>
    );
}

const TranslationList = ({ translations }) => {
    return (
        <div className='translations'>
            <h1>Translations</h1>
            <div>
                {translations.map(translation => (
                    <Translation {...translation} key={translation.id} />
                ))}
            </div>
        </div>
    );
}

class Request extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sendButtonDisabled: true,
            translation: ''
        }
    }

    handleChange(event) {
        if (event.target.value.trim() !== '') {
            this.setState({
                sendButtonDisabled: false,
                translation: event.target.value.trim()
            });
        }
        else if (event.target.value.trim() === '') {
            this.setState({
                sendButtonDisabled: true,
                translation: ''
            });
        }
    }

    mockRequest = {
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
        'date': new Date('January 03 2021 12:30'),
        'answers': []
    }

    handleClick() {
        if (this.state.sendButtonDisabled === false) {
            const translation = { 'translation': this.state.translation };
            return <form onSubmit={alert(JSON.stringify(translation))} />;
        }
    }

    render() {
        return (
            <div className='post-request'>
                <div className='row'>
                    <User {...this.mockRequest.user} />
                    <LanguageFromTo from={this.mockRequest.fromLanguage} to={this.mockRequest.toLanguage} />
                </div>
                <div className='date'>{this.mockRequest.date.toLocaleDateString()}</div>
                <div className='post-request-row'>
                    <div>
                        <div className='requested-text-detailed'>{this.mockRequest.text}</div>
                        <div className='context'>{this.mockRequest.context === '' ? '' : 'Context: ' + this.mockRequest.context}</div>
                        <img className='context-image' src={this.mockRequest.contextImage} />
                    </div>
                    <div className='post-request-buttons'>
                        <Bookmark />
                        <Report />
                    </div>
                </div>
                <textarea
                    className='text-box post-textarea'
                    placeholder='Translate...'
                    onChange={event => this.handleChange(event)} />
                <button className='send-button' disabled={this.state.sendButtonDisabled} onClick={() => this.handleClick()}>
                    <div>Send</div>
                    <img src={this.state.sendButtonDisabled ? sendDisabled : send} />
                </button>
            </div>
        );
    }
}

export const Post = () => {

    const mockTranslations = [
        {
            'id': 0,
            'requestId': 0,
            'user': {
                'name': 'Paweł',
                'avatar': avatar
            },
            'text': 'nigdy cie nie zawiode',
            'explanation': '',
            'explanationImage': null,
            'date': new Date('January 03 2021 13:30')
        },
        {
            'id': 1,
            'requestId': 0,
            'user': {
                'name': 'Maciek',
                'avatar': avatar
            },
            'text': 'Nigdy cię nie zawiodę.',
            'explanation': 'nigdy - never\ncię - you\nnie zawiodę - will not let down',
            'explanationImage': letDown,
            'date': new Date('January 03 2021 13:34')
        }
    ];

    return (
        <div className='post'>
            <Request />
            <TranslationList translations={mockTranslations} />
        </div>
    );
}