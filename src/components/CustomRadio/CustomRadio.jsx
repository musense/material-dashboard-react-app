import React, { useEffect, useImperativeHandle, useState } from 'react'
import styles from './CustomRadio.module.css'

const CustomRadio = React.forwardRef(({ ...props }, ref) => {

    const defaultValue = props.defaultValue || false;
    console.log("🚀 ~ file: CustomRadio.jsx:7 ~ CustomRadio ~ defaultValue:", defaultValue)
    const [checked, setChecked] = useState(defaultValue);
    const [checkHistory, setCheckHistory] = useState([]);
    useEffect(() => {
        if (!props.setState) return
        props.setState(checked)
    }, [props.setState, checked]);
    // useEffect(() => {
    //     setCheckHistory(prevState => [
    //         ...prevState, checked
    //     ])
    // }, [checked]);
    // useEffect(() => {
    //     if (!props.defaultValue) return
    //     setChecked(props.defaultValue)
    // }, [props.defaultValue]);

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
            defaultValue={defaultValue}
            onChange={e => {
                setChecked(e.target.checked)
                setCheckHistory(prevState => [
                    ...prevState, e.target.checked
                ])
            }}
            name={props.name}
            className={styles['custom-switch']}
        />
    </>;
})

export default CustomRadio;