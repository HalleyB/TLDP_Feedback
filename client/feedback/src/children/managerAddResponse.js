import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Modal from "./modal";
import { Button } from '@mui/material';



function ManagerResponse(props) {

    const [newResponse, setResponse] = useState({
        feedback_id: 0, manager_id: props.userId, date: '', 
        employee_id: 0, feedback: '', response: ''
    })
    const [resError, setResError] = useState(false)

    const setDate = () => {
        let date = new Date()
        date = date.toISOString().split('T')[0]
        setResponse({...newResponse, date: date})
    }

    if (!props.show) {
        return null;
    }
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

    const resetForm = () => {
        setResponse({
            feedback_id: 0, manager_id: props.userId, date: '', 
            employee_id: 0, feedback: '', response: ''
        })
    }

    const handleChange = (event) => {
        let selectedFeedback = event.target.value;
        let employeeId = selectedFeedback.employee_id;
        let feedback = selectedFeedback.feedback;
        let feedbackId = selectedFeedback.feedback_id;
        setResponse({...newResponse, employee_id: employeeId, 
            feedback: feedback, feedback_id: feedbackId})
    }

    const handleResponse = (e) => {
        let curDate = setDate()
        setResponse({...newResponse, response: e.target.value, date: curDate})
    }

    const handleSubmit = () => {
        if (!newResponse.response || !newResponse.employee_id) {
            setResError(true)
        } else {
            fetch(`/api/${props.userId}/managerResponse`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newResponse)
            })
            .then(data => {
                props.setShow(false)
                props.setNewData(true)
                resetForm()
            })
        }
    }

    return (
    <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
>
        <div>
            <Modal styles={modalStyles} show={props.show} onClose={() => props.setShow(false)}>
                <div className="modal-body">
                    <FormControl>
                        <InputLabel id="select-feedback">Select Feedback</InputLabel>
                        <Select
                            labelId="select-feedback-label"
                            id="select-feedback"
                            value={props.feedbackId}
                            label="Feedback Id"
                            onChange={handleChange}
                            
>
                            {props.unansweredFeedback.length ? props.unansweredFeedback.map((oneFeedback) => {
                                return(
                                    <MenuItem value={oneFeedback} >
                                        {oneFeedback.feedback}
                                    </MenuItem>
                                )
                            }) : <MenuItem disabled>No unanswered feedback</MenuItem>}
                            
                        </Select>
                        <TextField
                            id="outlined-multiline-static"
                            label="Manager Response"
                            multiline
                            fullWidth
                            rows={4}
                            defaultValue=""
                            onChange={(e) => handleResponse(e)}
/>
                        <Button onClick={() => handleSubmit()}>Submit</Button>
                        <Button onClick={() => props.setShow(false)}>Cancel</Button>
                    </FormControl>
                    {resError ? 'Please ensure all boxes are filled out' : ''}
                </div>
            </Modal>
        </div>
    </Box>
    )
}

export default ManagerResponse