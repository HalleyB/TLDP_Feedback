import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Modal from "./modal";



function ManagerResponse(props) {

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
                            // onChange={handleChange}
>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <TextField
                            id="outlined-multiline-static"
                            label="Manager Response"
                            multiline
                            fullWidth
                            rows={4}
                            defaultValue=""
/>
                    </FormControl>
                </div>
            </Modal>
        </div>
    </Box>
    )
}

export default ManagerResponse