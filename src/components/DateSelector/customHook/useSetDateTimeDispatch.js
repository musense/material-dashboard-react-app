import { useEffect } from "react";

export default function useSetDateTimeDispatch(dispatch, date, time) {

    const getDate = (dayObject) => `${dayObject['$y']}/${dayObject['$M'] + 1}/${dayObject['$D']}`
    const getTime = (dayObject) => `${dayObject['$H']}:${dayObject['$m']}`

    const dateTime = `${getDate(date)} ${getTime(time)}`

    useEffect(() => {
        if (!dateTime) return
        dispatch(dateTime)
    }, [dispatch, dateTime])
}
