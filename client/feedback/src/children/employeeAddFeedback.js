import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Modal from "./modal";

function EmployeeFeedback(props) {
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

    return (<div>
        <div>
            <button onClick={() => props.setShow(true)}>Add Feedback</button>
            <Modal styles={modalStyles} show={props.show} onClose={() => props.setShow(false)}>
                <div className="modal-body">
                    <FormControl>
                        <FormLabel id='Job Satisfaction'> Job Satisfaction
                        <RadioGroup
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                        <FormLabel id='Job Satisfaction'> How well does the manager provide feedback
                        <RadioGroup
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                        <FormLabel id='Job Satisfaction'> How much does the manager help with your career growth
                        <RadioGroup
                            row
                            aria-labelledby="radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="1" control={<Radio />} label="1" labelPlacement="bottom"/>
                            <FormControlLabel value="2" control={<Radio />} label="2" labelPlacement="bottom"/>
                            <FormControlLabel value="3" control={<Radio />} label="3" labelPlacement="bottom"/>
                            <FormControlLabel value="4" control={<Radio />} label="4" labelPlacement="bottom"/>
                            <FormControlLabel value="5" control={<Radio />} label="5" labelPlacement="bottom"/>

                        </RadioGroup>
                        </FormLabel>
                    </FormControl>
                </div>
            </Modal>
        </div>
    </div>
    )
}

export default EmployeeFeedback