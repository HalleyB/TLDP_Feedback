import React, { useState, useEffect} from 'react'

function Employee(props) {
    if (!props.show) {
        return null;
    }
    return (<div>
        <h1>Employee Page</h1>
        {props.userId}
    </div>
    )
}

export default Employee