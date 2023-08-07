import React, { useCallback } from "react";
import CustomRadio from '../../components/CustomRadio/CustomRadio';
import DateTimeSelector from "components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/material";

export default function BannerPublishInfo({
    isOnShelvesImmediate,
    isPermanent,
    startDate,
    endDate,
    onPropertyChange
}) {
    const setIsOnShelvesImmediate = useCallback((value) => {
        onPropertyChange(value, 'isOnShelvesImmediate', 'publishInfo')
    }, [onPropertyChange])

    const onIsPermanent = useCallback((value) => {
        onPropertyChange(value, 'isPermanent', 'publishInfo')
    }, [onPropertyChange])

    const onStartDateChange = useCallback((value) => {
        onPropertyChange(value, 'startDate', 'publishInfo')
    }, [onPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onPropertyChange(value, 'endDate', 'publishInfo')
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
                        value={isPermanent}
                        label={'設為常駐'}
                        setState={onIsPermanent} />
                </Stack>
                <Stack direction={"column"} spacing={2}>
                    <DateTimeSelector
                        disabled={isOnShelvesImmediate || isPermanent}
                        defaultValue={startDate}
                        title={'排程開始日期'}
                        setState={onStartDateChange} />
                    <DateTimeSelector
                        disabled={isPermanent}
                        defaultValue={endDate}
                        title={'排程結束日期'}
                        setState={onEndDateChange} />
                </Stack>
            </Stack>
        </div>
    </section>;
}
