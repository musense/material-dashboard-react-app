import { useState, useEffect } from "react";
import dayjs from 'dayjs';

export default function useSetDateTimeDefaultValue(defaultValue) {

    const [date, setDate] = useState(dayjs(new Date()));
    const [time, setTime] = useState(dayjs(new Date()));

    useEffect(() => {
        if (!defaultValue) return
        setDate(dayjs(defaultValue))
        setTime(dayjs(defaultValue))
    }, [defaultValue]);

    return {
        date,
        time,
        setDate,
        setTime
    }
}
