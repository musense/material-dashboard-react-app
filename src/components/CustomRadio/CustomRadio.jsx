import React, { useEffect, useImperativeHandle, useState } from 'react'
import styles from './CustomRadio.module.css'

const CustomRadio = React.forwardRef(({ ...props }, ref) => {

    const [checked, setChecked] = useState(false);
    const [checkHistory, setCheckHistory] = useState([]);
    useEffect(() => {
        if (!props.setState) return
        props.setState(checked)
    }, [props.setState, checked]);
    useEffect(() => {
        setCheckHistory(prevState => [
            ...prevState, checked
        ])
    }, [checked]);
    useEffect(() => {
        if (!props.defaultValue) return
        setChecked(props.defaultValue)
    }, [props.defaultValue]);

    useImperativeHandle(ref, () => {
        return {
            checkHistory: () => checkHistory,
            current: () => checked
        }
    })
    return <>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            type='checkbox'
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            name={props.name}
            className={styles['custom-switch']}
        />
    </>;
})

export default CustomRadio;