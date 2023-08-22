import React, { useCallback } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';
import DateTimeSelector from "components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/material";

export default function BannerPublishInfo({
    isOnShelvesImmediate,
    isEternal,
    startDate,
    endDate,
    onPropertyChange
}) {
    const setIsOnShelvesImmediate = useCallback((value) => {
        onPropertyChange(value, 'isOnShelvesImmediate')
    }, [onPropertyChange])

    const onIsEternal = useCallback((value) => {
        onPropertyChange(value, 'isEternal')
    }, [onPropertyChange])

    const onStartDateChange = useCallback((value) => {
        onPropertyChange(value, 'startDate')
    }, [onPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onPropertyChange(value, 'endDate')
    }, [onPropertyChange])

    return <section id="publishInfo">
        <div>
            <Stack direction={"column"} spacing={2}>
                {/* <Stack direction={"row"} spacing={2}>
                    <CustomRadio
                        value={isOnShelvesImmediate}
                        label={'立即上架'}
                        setState={setIsOnShelvesImmediate} />
                    <CustomRadio
                        value={isEternal}
                        label={'設為常駐'}
                        setState={onIsEternal} />
                </Stack> */}
                <Stack direction={"column"} spacing={2}>
                    <DateTimeSelector
                        disabled={isOnShelvesImmediate || isEternal}
                        defaultValue={startDate}
                        title={'排程開始日期'}
                        setState={onStartDateChange} />
                    <DateTimeSelector
                        disabled={isEternal}
                        defaultValue={endDate}
                        title={'排程結束日期'}
                        setState={onEndDateChange} />
                </Stack>
            </Stack>
        </div>
    </section>;
}
