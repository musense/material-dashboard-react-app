import React, { useImperativeHandle, useState, useRef, useEffect } from 'react'
import dayjs from 'dayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { css } from '@emotion/css';

const DateTimePicker = React.forwardRef((props, ref) => {
    const { width } = props
    const currentRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            reset: () => {
                currentRef.current = null
                setValue(null)
            },
            current: () => currentRef.current
        }
    })
    const initialState = dayjs(new Date())

    const [value, setValue] = useState(null);

    const getDate = (dayObject) => {
        return `${dayObject['$y']}/${dayObject['$M'] + 1}/${dayObject['$D']}`
    }
    useEffect(() => {
        handleChange(initialState)
    }, []);

    const handleChange = (newValue) => {
        currentRef.current = getDate(newValue)
        setValue(newValue)
    }

    return (
        <div className={css`
        display:flex;
        flex-direction: column;
            `}>
            <label htmlFor={props.title}>{props.title}</label>
            <MUIDatePicker
                sx={{
                    height: '40.8px',
                    border: '1px solid black',
                    borderRadius: '4px',
                    width: width,
                    '& input': {
                        paddingTop: '9px',
                        paddingBottom: '9px',
                    }
                }}
                className={css`
                    background-color: #fff;
                `}
                name={props.title}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
})

export default DateTimePicker