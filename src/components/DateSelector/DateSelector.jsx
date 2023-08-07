import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePicker from './DatePicker';
import { css } from '@emotion/css';

const DateSelector = ({
    startDate,
    endDate,
    width,
    height,
    onStartDateChange,
    onEndDateChange,
    title = '創建'
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ overflow: 'visible', paddingTop: 'unset' }} components={['DateRangePicker']}>
                <div className={css`
                        display: flex;
                        flex-direction: row;
                        gap: 1rem;
                        align-items: center;
                        `}>
                    <DatePicker
                        title={`${title}開始日期`}
                        width={width}
                        height={height}
                        lastThreeMonth
                        state={startDate}
                        setState={onStartDateChange}
                    />
                    ~
                    <DatePicker
                        title={`${title}結束日期`}
                        width={width}
                        height={height}
                        state={endDate}
                        setState={onEndDateChange}
                    />
                </div>
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default DateSelector