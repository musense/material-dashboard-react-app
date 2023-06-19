import React, { useEffect, useImperativeHandle, useState } from 'react'
import styles from './CustomRadio.module.css'

const CustomRadio = React.forwardRef(({ ...props }, ref) => {

    const radioRef = React.useRef(null);

    const [checked, setChecked] = useState(props.checked);
    const [checkHistory, setCheckHistory] = useState([]);
    useEffect(() => {
        if (checked === true || checked === false) {
            setCheckHistory(prevState => {
                return [...prevState, checked]
            })
        }
    }, [checked]);
    useImperativeHandle(ref, () => {
        return {
            checkHistory: checkHistory
        }
    })
    return <>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            ref={radioRef}
            type='checkbox'
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            name={props.name}
            className={styles['custom-switch']}
        />
    </>;
})

export default CustomRadio;