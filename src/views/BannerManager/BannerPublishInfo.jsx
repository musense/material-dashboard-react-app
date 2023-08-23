import React, { useCallback } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';
import DateTimeSelector from "components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/material";

export default function BannerPublishInfo({
    isOnShelvesImmediate,
    isDisplay,
    isEternal,
    startDate,
    endDate,
    onPropertyChange
}) {

    const setIsOnShelvesImmediate = useCallback((value) => {
        onPropertyChange(value, 'isOnShelvesImmediate', 'publishInfo')
    }, [onPropertyChange])

    const onIsDisplay = useCallback((value) => {
        onPropertyChange(value, 'isDisplay', 'publishInfo')
    }, [onPropertyChange])

    const onIsEternal = useCallback((value) => {
        onPropertyChange(value, 'isEternal', 'publishInfo')
    }, [onPropertyChange])

    const onStartDateChange = useCallback((value) => {
        onPropertyChange(value, 'startDate', 'publishInfo', 'scheduledAt')
    }, [onPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onPropertyChange(value, 'endDate', 'publishInfo', 'scheduledAt')
    }, [onPropertyChange])

    return <section id="publishInfo">
        <div>
            <Stack direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={2}>
                    <CustomRadio
                        value={isOnShelvesImmediate}
                        label={'立即上架'}
                        setState={setIsOnShelvesImmediate} />
                    <CustomRadio
                        value={isDisplay}
                        label={'是否顯示'}
                        setState={onIsDisplay} />
                    <CustomRadio
                        value={isEternal}
                        label={'設為常駐'}
                        setState={onIsEternal}
                    />
                </Stack>
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
