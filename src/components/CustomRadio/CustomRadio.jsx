import React, { useEffect, useImperativeHandle, useState } from 'react'
import styles from './CustomRadio.module.css'

const CustomRadio = React.forwardRef(({ ...props }, ref) => {

    // console.log("🚀 ~ file: CustomRadio.jsx:7 ~ CustomRadio ~ defaultValue:", defaultValue)
    const [checked, setChecked] = useState(props.defaultValue);
    const [checkHistory, setCheckHistory] = useState([]);
    useEffect(() => {
        if (!props.setState) return
        setChecked(props.defaultValue)        
    }, [props.setState, props.defaultValue]);
 
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
            onChange={e => {
                props.setState(e.target.checked)
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