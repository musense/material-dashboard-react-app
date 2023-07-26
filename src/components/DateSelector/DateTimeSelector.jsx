import React, { useImperativeHandle, useState, useRef, useEffect } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import {
    DatePicker,
    TimePicker
} from '@mui/x-date-pickers';
import Stack from '@mui/system/Stack';

const DateTimeSelector = React.forwardRef((props, ref) => {
    console.log("🚀 ~ file: DateTimeSelector.jsx:16 ~ DateTimeSelector ~ props.defaultValue:", props.defaultValue)
    const { width } = props
    const currentRef = useRef();
    const [date, setDate] = useState(dayjs(new Date()));
    const [time, setTime] = useState(dayjs(new Date()));
    useEffect(() => {
        if (!props.defaultValue) return
        setDate(dayjs(props.defaultValue))
        setTime(dayjs(props.defaultValue))
    }, [props.defaultValue]);
    useEffect(() => {
        if (!currentRef.current) return
        props.setState(currentRef.current)
    }, [props.setState, currentRef.current])
    useImperativeHandle(ref, () => {
        return {
            reset: () => {
                currentRef.current = null
                setDate(null);
                setTime(null);
            },
            current: () => {
                return currentRef.current
                    ? currentRef.current
                    : `${getDate(dayjs(new Date()))} ${getTime(dayjs(new Date()))}`
            }
        }
    })
    const getDate = (dayObject) => {
        console.log("🚀 ~ file: DateTimeSelector.jsx:29 ~ getDateTime ~ dayObject:", dayObject)
        return `${dayObject['$y']}/${dayObject['$M'] + 1}/${dayObject['$D']}`
    }
    const getTime = (dayObject) => {
        console.log("🚀 ~ file: DateTimeSelector.jsx:29 ~ getDateTime ~ dayObject:", dayObject)
        return `${dayObject['$H']}:${dayObject['$m']}`
    }

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={'zh-tw'}
        >
            <Stack direction={'row'} spacing={2}>
                <DatePicker label="日期"
                    value={date}
                    onChange={(newValue) => {
                        currentRef.current = `${getDate(newValue)} ${getTime(time)}`
                        setDate(newValue)
                    }} />
                <TimePicker label="時間"
                    value={time}
                    onChange={(newValue) => {
                        currentRef.current = `${getDate(date)} ${getTime(newValue)}`
                        setTime(newValue)
                    }}
                    ampm={false} />
            </Stack>
        </LocalizationProvider>
    )
})

export default DateTimeSelector