import React from 'react'
import styles from './CustomRadio.module.css'

const CustomRadio = ({ ...props }) => {

    return <>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            type='checkbox'
            checked={props.value}
            onChange={e => props.setState(e.target.checked)}
            name={props.name}
            className={styles['custom-switch']}
        />
    </>;
}

export default CustomRadio;