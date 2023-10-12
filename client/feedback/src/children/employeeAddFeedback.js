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
                    
                </div>
            </Modal>
        </div>
    </div>
    )
}

export default EmployeeFeedback