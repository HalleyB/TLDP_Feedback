import { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from "./modal";

function EmployeeFeedback(props) {
    const [feedbackForm, setFeedbackForm] = useState({
        manager_id: props.userInfo.manager_id, date: '', 
        employee_id: props.userInfo.employee_id, feedback: '',
        job_satisfaction: -1, manager_feedback: -1, career_growth: -1,
        feedback_id: 0
    });
    const [feedbackErr, setFeedbackErr] = useState(false);


    const modalStyles = {
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const newInput = (e) => {
        setFeedbackForm({...feedbackForm, [e.target.name]: Number(e.target.value)})
    }

    const newInputText = (e) => {
        setFeedbackForm({...feedbackForm, [e.target.name]: e.target.value})
    }

    const resetForm = () => {
        setFeedbackForm({
            manager_id: props.userInfo.manager_id, date: '', 
            employee_id: props.userInfo.employee_id, feedback: '',
            job_satisfaction: -1, manager_feedback: -1, career_growth: -1,
            feedback_id: 0
        })
    }

    const handleSubmit = () => {
        if (!feedbackForm.feedback) {
            setFeedbackErr(true)
        } else {
            
            fetch('/api/lastFeedback')
            .then(response => {
                return response.json()
            })
            .then(data => {
                props.setShow(false)
                let feedbackId = data
                feedbackId = feedbackId + 1
                setFeedbackForm({...feedbackForm, feedback_id: feedbackId})
            })
        }
    }

    const submitData = () => {
        fetch(`/api/${props.userInfo.employee_id}/employeeGiveFeedback`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedbackForm)
        })
        .then(data => {
            props.setNewData(true)
            resetForm()
        })
    }

    useEffect(() => {
        if (feedbackForm.feedback_id) {
            submitData()
        }
    }, [feedbackForm])

    if (!props.show) {
        return null;
    }

    return (<div>
        <div>
            <button onClick={() => props.setShow(true)}>Add Feedback</button>
            <Modal styles={modalStyles} show={props.show} onClose={() => props.setShow(false)}>
                <div className="modal-body">
                    <FormControl>
                        Please rate your overall job satisfaction
                        <FormLabel onChange={e => (newInput(e))} id='Job Satisfaction'>
                        <RadioGroup
                            required
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name='job_satisfaction'
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                        How well does the manager provide feedback
                        <FormLabel onChange={e => (newInput(e))} id='Manager Feedback' >
                        <RadioGroup
                            required
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="manager_feedback"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                        How much does the manager help with your career growth
                        <FormLabel onChange={e => (newInput(e))} id='Career Growth'>
                        <RadioGroup
                            required
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="career_growth"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                        Please provide additional feedback here
                        <TextField onChange={e => (newInputText(e))}
                            required
                            id="outlined-textarea"
                            label="Additional Feedback"
                            placeholder="Placeholder"
                            multiline
                            name='feedback'
                        />
                    </FormControl>
                </div>
                {feedbackErr ? 'Please enter feedback' : ''}
                <div>
                    <button type='submit' onClick={e => (handleSubmit())}>Submit</button>
                    <button onClick={e => props.setShow(false)}>Cancel</button>
                </div>
            </Modal>
        </div>
    </div>
    )
}

export default EmployeeFeedback