import React from 'react';

// const [show, setShow] = useState(false);

// const modalStyles = {
//     position: 'fixed',
//     left: '0',
//     right: '0',
//     top: '0',
//     bottom: '0',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   };

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" style={props.styles}>
      <div className="modal-content">
        <div className="modal-body">
          {props.children}
        </div>
      </div>
    </div>
  )
};

export default Modal;