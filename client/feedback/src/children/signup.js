import React, { useState, useEffect } from 'react'
import Modal from './modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function SignUp(props) {
    const [employeeInfo, setEmployeeInfo] = useState({
        username: '', name: '', sex: '', address: '', mail:''
    })
    const [newEmployee, setNewEmployee] = useState({
        employee_id: 0, employee_info: {}, 
        is_manager: false, manager_id: 0
    });

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


    const handleInput = (e) => {
         setEmployeeInfo({...employeeInfo, [e.target.name]: e.target.value})
    }

    const handleManager = (id) => {
        setNewEmployee({...newEmployee, manager_id: id})
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        fetch('/api/lastEmployee')
        .then(response => {
            return response.json()
        })
        .then(data => {
            props.setShow(false)
            let employeeId = data
            employeeId = employeeId + 1
            
            setNewEmployee({...newEmployee, 
                employee_id: employeeId, employee_info: employeeInfo})
        })
    }

    const submitData = () => {
        fetch(`/api/newEmployee`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
        .then(data => {
            props.setUserId(newEmployee.employee_id)
            props.setUserInfo(newEmployee)
            props.setShowLogin(false)
            props.setShow(false)
            props.setShowEmployee(true)
        })
    }

    useEffect(() => {
        if (newEmployee.employee_id) {
            submitData()
        }
    }, [newEmployee])

    return (
        <div>
            <Modal styles={modalStyles} show={props.show} onClose={() => props.setShow(false)}>
                <div className='modal-body'>
                    <FormControl>
                        <h3>Sign Up</h3>
                        <TextField  onChange={(e) => handleInput(e)}
                            required
                            id="outlined-textarea"
                            label="Username"
                            placeholder="Placeholder"
                            multiline
                            name='username'
                        />
                        <TextField  onChange={(e) => handleInput(e)}
                            required
                            id="outlined-textarea"
                            label="Name"
                            placeholder="Placeholder"
                            multiline
                            name='name'
                        />
                        <FormLabel onChange={(e) => handleInput(e)}>
                        <RadioGroup
                            required
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="sex"
                        >
                             <FormControlLabel value="F" control={<Radio />} label="Female" labelPlacement="bottom"/>
                             <FormControlLabel value="M" control={<Radio />} label="Male" labelPlacement="bottom"/>
                             <FormControlLabel value="O" control={<Radio />} label="Other" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>

                        <TextField  onChange={(e) => handleInput(e)}
                            required
                            id="outlined-textarea"
                            label="Address"
                            placeholder="Placeholder"
                            multiline
                            name='address'
                        />
                        <TextField  onChange={(e) => handleInput(e)}
                            required
                            id="outlined-textarea"
                            label="Email"
                            placeholder="Placeholder"
                            multiline
                            name='mail'
                        />
                        <FormLabel onChange={(e) => handleManager(e.target.value)}>
                        <RadioGroup
                            required
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="sex"
                        >
                             <FormControlLabel value="9001" control={<Radio />} label="Jason Green" labelPlacement="bottom"/>
                             <FormControlLabel value="9002" control={<Radio />} label="Sharon Green" labelPlacement="bottom"/>
                             <FormControlLabel value="9003" control={<Radio />} label="Doris Martinez" labelPlacement="bottom"/>
                             <FormControlLabel value="9004" control={<Radio />} label="Vicki Green" labelPlacement="bottom"/>
                             <FormControlLabel value="9005" control={<Radio />} label="David Dennis" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                        <button className='cancel' onClick={() => props.setShow(false)}>Cancel</button>
                        <button className='button'  onClick={(e) => handleSignUp(e)}>Submit</button>
                    </FormControl>
                </div>
            </Modal>
        </div>
    )
}

export default SignUp;