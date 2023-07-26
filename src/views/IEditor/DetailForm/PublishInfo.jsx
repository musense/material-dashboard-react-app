import React, { useCallback } from "react";
import CustomRadio from '../../../components/CustomRadio/CustomRadio';
import DateTimeSelector from "../../../components/DateSelector/DateTimeSelector";
import { Stack } from "@mui/system";

export default function PublishInfo({ styles, hidden,  isScheduled,  onPropertyChange, reservedPublishDateTime }) {
    const onPublishInfoHiddenChange = useCallback((value) => {
        onPropertyChange(value, 'hidden', 'publishInfo')
    }, [onPropertyChange])

    const onPublishInfoIsScheduledChange = useCallback((value) => {
        onPropertyChange(value, 'isScheduled', 'publishInfo')
    }, [onPropertyChange])

    const onPublishReservedPublishDateTimeChange = useCallback((value) => {
        onPropertyChange(value, 'reservedPublishDateTime', 'publishInfo')
    }, [onPropertyChange])
    return <section id="publishInfo">
        <div className={styles['input-group']}>
            <Stack direction={"column"} spacing={2}>
                <CustomRadio
                    defaultValue={hidden}
                    label={'將這篇文章「隱藏」'}
                    name={'hideSwitch'}
                    setState={onPublishInfoHiddenChange} />
                {hidden && <CustomRadio
                    defaultValue={isScheduled}
                    label={'是否排程上版'}
                    name={'scheduledSwitch'}
                    setState={onPublishInfoIsScheduledChange} />}
                {hidden && isScheduled &&
                    <DateTimeSelector
                        // ref={scheduledDateTimeRef}
                        defaultValue={reservedPublishDateTime}
                        width={'250px'}
                        title={'排程日期'}
                        setState={onPublishReservedPublishDateTimeChange} />}
            </Stack>
        </div>
    </section>;
}
