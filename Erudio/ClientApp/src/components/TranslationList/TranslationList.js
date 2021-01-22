import React, { useState, useEffect } from 'react';
import API from '../../Api';
import Translation from '../Translation/Translation';
import './TranslationList.css';

const TranslationList = ({ requestId, setPopup, userId }) => {

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
                        <Translation {...translation} key={translation.translationId} setPopup={setPopup} userId={userId} />
                    ))
                    :
                    <div className='information-message'>There are no translations for this request yet. Be the first one to help!</div>
                }
            </div>
        </div>
    );
}
export default TranslationList;