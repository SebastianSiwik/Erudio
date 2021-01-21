import React from 'react';
import { Checkbox, Typography } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import letterX from '../images/letter_x.svg';
import './ReportPopup.css';

const styles = createStyles({
    formControlLabel: {
        "fontFamily": "Roboto",
        "fontStyle": "normal",
        "fontWeight": "normal",
        "fontSize": "18px",
        "lineHeight": "28px"
    }
 });

const BlackCheckbox = withStyles({
    root: {
        '&$checked': {
            color: 'black',
        }
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const ReportPopup = ({ handleClick }) => {

    const [state, setState] = React.useState({
        checkedSpam: false,
        checkedAdultConent: false,
        checkedHarassment: false,
        checkedBadImage: false,
        checkedWrongLanguage: false
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      }

      const handleSubmit = () => {
        return <form onSubmit={handleClick(false)} />;
      }

    return (
        <div className='popup-background'>
            <div className='popup'>
                <img alt='X' src={letterX} onClick={() => handleClick(false)} />
                <h1>Report</h1>
                <div>
                    <FormControlLabel
                        control={<BlackCheckbox checked={state.checkedSpam} onChange={handleChange} name="checkedSpam" />}
                        label={<Typography style={styles.formControlLabel}>Spam</Typography>}
                        m={0}
                    />
                    <FormControlLabel
                        control={<BlackCheckbox checked={state.checkedAdultConent} onChange={handleChange} name="checkedAdultConent" />}
                        label={<Typography style={styles.formControlLabel}>Adult content</Typography>}
                        m={0}
                    />
                    <FormControlLabel
                        control={<BlackCheckbox checked={state.checkedHarassment} onChange={handleChange} name="checkedHarassment" />}
                        label={<Typography style={styles.formControlLabel}>Harassment</Typography>}
                        m={0}
                    />
                    <FormControlLabel
                        control={<BlackCheckbox checked={state.checkedBadImage} onChange={handleChange} name="checkedBadImage" />}
                        label={<Typography style={styles.formControlLabel}>Bad image</Typography>}
                        m={0}
                    />
                    <FormControlLabel
                        control={<BlackCheckbox checked={state.checkedWrongLanguage} onChange={handleChange} name="checkedWrongLanguage" />}
                        label={<Typography style={styles.formControlLabel}>Wrong language</Typography>}
                        m={0}
                    />
                </div>
                <button onClick={() => {handleSubmit(); handleClick()}}>Send</button>
            </div>
        </div>
    );
}