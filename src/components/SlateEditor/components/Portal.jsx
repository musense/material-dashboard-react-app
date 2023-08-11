import React from "react";
import ReactDOM from 'react-dom'


export default Portal = ({ children }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

