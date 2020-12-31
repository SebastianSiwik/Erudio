import React, { Component, useState } from 'react';
import '../App.css';
import './Post.css';
import { postMockRequest, postMockTranslations } from './Mock.js'
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
        <img src={liked ? like : likeEmpty} onClick={handleClick} />
    );
}

const Report = ({ setPopup }) => {
    return (
        <img src={report} onClick={() => setPopup(true)} />
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
                <Report setPopup={props.setPopup} />
                <Like />
            </div>
        </div>
    );
}

const TranslationList = ({ translations, setPopup }) => {
    return (
        <div className='translations'>
            <h1>Translations</h1>
            <div>
                {translations.map(translation => (
                    <Translation {...translation} key={translation.id} setPopup={setPopup} />
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
                    <User {...postMockRequest.user} />
                    <LanguageFromTo from={postMockRequest.fromLanguage} to={postMockRequest.toLanguage} />
                </div>
                <div className='date'>{postMockRequest.date.toLocaleDateString()}</div>
                <div className='post-request-row'>
                    <div>
                        <div className='requested-text-detailed'>{postMockRequest.text}</div>
                        <div className='context'>{postMockRequest.context === '' ? '' : 'Context: ' + postMockRequest.context}</div>
                        <img className='context-image' src={postMockRequest.contextImage} />
                    </div>
                    <div className='post-request-buttons'>
                        <Bookmark />
                        <Report setPopup={this.props.setPopup} />
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

    const [popupShown, setPopup] = useState(false);

    return (
        <div className='post'>
            <Request setPopup={setPopup} />
            <TranslationList translations={postMockTranslations} setPopup={setPopup} />

            {popupShown ?
                <ReportPopup handleClick={setPopup} />
                : null
            }
        </div>
    );
}