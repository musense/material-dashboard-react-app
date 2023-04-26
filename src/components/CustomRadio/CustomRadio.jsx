import React from 'react'
import styles from './CustomRadio.module.css'

const CustomRadio = React.forwardRef(({ ...props }, ref) => {
    return <>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            ref={ref}
            type='checkbox'
            name={props.name}
            className={styles['custom-switch']} />
    </>;
})

export default CustomRadio;