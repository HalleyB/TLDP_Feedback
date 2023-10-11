import React, { useState, useEffect} from 'react'

function Manager(props) {
    if (!props.show) {
        return null;
    }
    
    return (
        <h1>Manager Page</h1>
    )
}

export default Manager