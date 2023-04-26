import React, { useImperativeHandle, useRef } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateTimePicker from './DateTimePicker';
import { css } from '@emotion/css';

const DateSelector = React.forwardRef((props, ref) => {

    const startDateRef = useRef();
    const endDateRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            reset: () => {
                startDateRef.current.reset()
                endDateRef.current.reset()
            },
            current: () => {
                return {
                    startDate: startDateRef.current.current() !== null ? new Date(`${startDateRef.current.current()} 00:00:00`).getTime() : null,
                    endDate: endDateRef.current.current() !== null ? new Date(`${endDateRef.current.current()} 23:59:59`).getTime() : null,
                }
            }

        }
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <div className={css`
                        display: flex;
                        flex-direction: row;
                        gap: 1rem;
                        align-items: center;
                        `}>
                    <DateTimePicker
                        ref={startDateRef}
                        title={'Start Date'}
                    />
                    ~
                    <DateTimePicker
                        ref={endDateRef}
                        title={'End Date'}
                    />
                </div>
            </DemoContainer>
        </LocalizationProvider>
    )
})

export default DateSelector