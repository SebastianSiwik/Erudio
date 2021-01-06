import API from '../Api';
import authService from './api-authorization/AuthorizeService';
import { Redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import Collapse from '@material-ui/core/Collapse';
import bubbles from '../images/bubbles.png';
import swap from '../images/swap.svg';
import image from '../images/image.svg';
import '../App.css';
import './Home.css';

const BackgroundImage = () => {
    return <img className='background right-side' alt='Background' src={bubbles} />;
}

const HeaderText = () => {
    return (
        <div>
            <h1>Have words translated <strong>right</strong></h1>
            <p className='text-right'>Benefit and contribute</p>
            <p>Obtain highly accurate translations and contribute to help others!</p>
        </div>
    );
}

const TranslationRequestForm = (props) => {
    const [shouldRedirect, setRedirect] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [fromTo, setFromTo] = useState({ 'from': 'Polish', 'to': 'English-UK' });
    const [fileInputShown, setFileInputShown] = useState(false);
    const [encodedFile, setEncodedFile] = useState('');
    const fileInput = React.createRef();

    useEffect(() => {
        let isActive = true;

        const getLanguages = async () => {
            const response = await API.get('languages');
            if (isActive) {
                setLanguages(response.data);
            }
        }
        getLanguages();

        return () => {
            isActive = false;
        }
    }, [languages]);

    const encodeContextImageAsURL = () => {
        if (fileInput.current.files.length) {
            var file = fileInput.current.files[0];
            var reader = new FileReader();
            reader.onloadend = () => {
                let encoded = reader.result.replace(/^.*,/, '');
                setEncodedFile(encoded);
            }
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (values) => {
        if (!props.isAuthenticated) {
            setRedirect(true);
        }
        else {
            values.authorId = props.userId;
            values.fromLanguageCode = fromTo.from;
            values.toLanguageCode = fromTo.to;

            const object = { ...values };
            object.contextImage = encodedFile;

            try {
                await API.post('request', object);
            } catch (error) {
                console.log(error.response);
            }

            setRedirect(true);
        }
    }

    const handleClick = () => {
        const newFromTo = { 'from': fromTo.to, 'to': fromTo.from };
        setFromTo(newFromTo);
    }
    const handleChangeFrom = (event) => {
        const choices = fromTo;
        choices.from = event.target.value;
        if (choices.from === choices.to) {
            const found = languages.find(language =>
                language.languageCode !== choices.from);
            choices.to = found.languageCode;
        }
        setFromTo(choices);
    }

    const handleChangeTo = (event) => {
        const choices = fromTo;
        choices.to = event.target.value;
        if (choices.from === choices.to) {
            const found = languages.find(language =>
                language.languageCode !== choices.to);
            choices.from = found.languageCode;
        }
        setFromTo(choices);
    }

    const handleImageButtonClick = () => {
        setFileInputShown(!fileInputShown);
    }

    const validateText = (value) => {
        let error;
        if (!value) {
            error = 'Text to translate required.';
        }
        return error;
    }

    const formRedirect = () => {
        if (shouldRedirect) {
            return <div>
                {props.isAuthenticated ? <Redirect to='/feed' /> : <Redirect to='/authorize' />}
            </div>
        }
    }

    return (
        <Formik
            initialValues={{ fromLanguageCode: '', toLanguageCode: '', text: '', context: '', contextImage: '' }}
            onSubmit={values => handleSubmit(values)}
        >
            {({ errors }) => (
                <Form>
                    <div className='row-container'>
                        <Field value={fromTo.from}
                            as='select'
                            className='text-box small-box'
                            name='fromLanguageCode'
                            placeholder='From'
                            onChange={handleChangeFrom}>
                            {languages.map(language => (
                                <option key={language.languageCode} value={language.languageCode}>{language.languageName}</option>
                            ))}
                        </Field>
                        <img className='image' alt='icon' src={swap} onClick={handleClick} />
                        <Field value={fromTo.to}
                            as='select'
                            className='text-box small-box'
                            name='toLanguageCode'
                            placeholder='To'
                            onChange={handleChangeTo}>
                            {languages.map(language => (
                                <option key={language.languageCode} value={language.languageCode}>{language.languageName}</option>
                            ))}
                        </Field>
                    </div>
                    <Field className='text-box big-box'
                        as='textarea'
                        name='text'
                        placeholder='Get started!'
                        validate={validateText} />
                    <div className='row-container'>
                        <Field className='text-box small-box' name='context' placeholder='Context' />
                        <img className='image' alt='icon' src={image} onClick={handleImageButtonClick} />
                    </div>
                    <div className='row-container'>
                        <div>

                            <Collapse in={fileInputShown}>
                                <label htmlFor='img'>Click me to upload an image</label>
                                <Field className='file-input'
                                    id='img'
                                    innerRef={fileInput}
                                    onChange={() => encodeContextImageAsURL()}
                                    type='file'
                                    accept='image/*'
                                    name='contextImage' />
                            </Collapse>
                            <div className='error'>{errors.text && errors.text}</div>
                        </div>
                        <button type='submit'>Translate</button>
                    </div>
                    {formRedirect()}
                </Form>
            )}
        </Formik>
    );
}

export const Home = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const _subscription = authService.subscribe(() => populateState());
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
        <div className='row-container'>
            <div className='left-side'>
                <HeaderText />
                <TranslationRequestForm isAuthenticated={isAuthenticated} userId={userId} />
            </div>
            <BackgroundImage />
        </div>
    );
}
