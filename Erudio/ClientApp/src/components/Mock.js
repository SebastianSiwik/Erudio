import avatar from '../images/avatar.png';
import contextImage from '../images/iciu.png';
import letDown from '../images/let_down.png';

export const feedMockRequests = [
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
        'date': new Date('January 03 2021 12:30'),
        'answers': []
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
        'date': new Date('January 04 2021 12:30'),
        'answers': []
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
        'date': new Date('January 05 2021 12:30'),
        'answers': []
    }
];

export const postMockRequest = {
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

export const postMockTranslations = [
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