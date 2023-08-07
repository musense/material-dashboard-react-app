import React, { useState, useRef, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/zh-tw';
import {
    DatePicker,
    TimePicker
} from '@mui/x-date-pickers';
import Stack from '@mui/system/Stack';
import useSetDateTimeDefaultValue from 'hook/useSetDateTimeDefaultValue';
import useSetDateTimeDispatch from 'hook/useSetDateTimeDispatch';

const DateTimeSelector = ({
    disabled = false,
    defaultValue,
    width = null,
    title = null,
    setState
}) => {
    console.log("🚀 ~ file: DateTimeSelector.jsx:16 ~ DateTimeSelector ~ defaultValue:", defaultValue)

    const {
        date,
        time,
        setDate,
        setTime
    } = useSetDateTimeDefaultValue(defaultValue)

    useSetDateTimeDispatch(setState, date, time)

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={'zh-tw'}>
            {title && <label htmlFor={title}>{title}</label>}
            <Stack direction={'row'} spacing={2} width={width}>
                <DatePicker
                    label="日期"
                    disabled={disabled}
                    value={date}
                    onChange={(newValue) => setDate(newValue)} />
                <TimePicker
                    label="時間"
                    disabled={disabled}
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    ampm={false} />
            </Stack>
        </LocalizationProvider>
    )
}

export default DateTimeSelector