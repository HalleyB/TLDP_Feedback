import React, { useState, useEffect } from 'react';

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