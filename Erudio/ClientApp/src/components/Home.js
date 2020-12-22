import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import bubbles from '../images/bubbles.png';
import swap from '../images/swap.svg';
import image from '../images/image.svg';
import '../App.css';
import './Home.css';

function BackgroundImage(props) {
    return <img className='background right-side' src={bubbles} />;
}

function HeaderText(props) {
    return (
        <div>
            <h1>Have words translated <strong>right</strong></h1>
            <p className='text-right'>Benefit and contribute</p>
            <p>Obtain highly accurate translations and contribute to help others!</p>
        </div>
    );
}
 
function TranslationRequestForm(props) {
    return (
        <Formik
            initialValues={{ from: 'English', to: 'Polish', textToTranslate: '', context: '' }}
            onSubmit={async values => {
            await new Promise(resolve => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
            }}
        >
            <Form>
                <div className='row-container'>
                    <Field className='text-box small-box' name='from' placeholder='From' />
                    <img src={swap} />
                    <Field className='text-box small-box' name='to' placeholder='To' />
                </div>
                <Field className='text-box big-box' as='textarea' name='textToTranslate' placeholder='Get started!' />
                <div className='row-container'>
                    <Field className='text-box small-box' name='context' placeholder='Context' />
                    <img className='image' src={image} />
                </div>
                <button type='submit'>Translate</button>
            </Form>
        </Formik>
    );
}

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className='row-container'>
        <div className='left-side'>
            <HeaderText />
            <TranslationRequestForm />
        </div>
        <BackgroundImage />
      </div>
    );
  }
}
