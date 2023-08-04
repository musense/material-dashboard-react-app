import React, { useCallback } from "react";


import styles from '../IEditor.module.css';

import { useDispatch, useSelector } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction';

import WebHeader from "./WebHeader";
import Tags from "./Tags";
import Classification from "./Classification";
import Media from "../../../components/Media/Media";
import PublishInfo from "./PublishInfo";
import DetailFormButtonList from "./DetailFormButtonList";



const DetailForm = ({ createType }) => {

    const dispatch = useDispatch();

    const headTitle = useSelector((state) => state.getSlateReducer.detailForm?.webHeader?.headTitle);
    const headDescription = useSelector((state) => state.getSlateReducer.detailForm?.webHeader?.headDescription);
    const headKeyword = useSelector((state) => state.getSlateReducer.detailForm?.webHeader?.headKeyword);
    const manualUrl = useSelector((state) => state.getSlateReducer.detailForm?.webHeader?.manualUrl);
    const customUrl = useSelector((state) => state.getSlateReducer.detailForm?.webHeader?.sitemapUrl);

    const tags = useSelector((state) => state.getSlateReducer.detailForm?.tags);

    const categories = useSelector((state) => state.getSlateReducer.detailForm?.categories);

    const showUrl = useSelector((state) => state.getSlateReducer.showUrl);
    const altText = useSelector((state) => state.getSlateReducer.detailForm?.media.altText);

    const hidden = useSelector((state) => state.getSlateReducer.detailForm?.publishInfo?.hidden);
    const isScheduled = useSelector((state) => state.getSlateReducer.detailForm?.publishInfo?.isScheduled);
    const scheduledAt = useSelector((state) => state.getSlateReducer.detailForm?.publishInfo?.scheduledAt);

    const onPropertyChange = useCallback((value, property, info) => {
        dispatch({
            type: GetSlateAction.SET_PROPERTY,
            payload: {
                allProps: {
                    form: 'detailForm',
                    info: info,
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])

    return (
        <form name='ieditor-detail-form' >
            <WebHeader headTitle={headTitle}
                onPropertyChange={onPropertyChange}
                headDescription={headDescription}
                headKeyword={headKeyword}
                manualUrl={manualUrl}
                customUrl={customUrl} />
            <Tags
                tags={tags}
                onPropertyChange={onPropertyChange} />
            <Classification
                categories={categories}
                onPropertyChange={onPropertyChange} />
            <Media
                styles={styles}
                onPropertyChange={onPropertyChange}
                patchType={GetSlateAction.SET_SHOW_URL}
                showUrl={showUrl}
                altText={altText}
            />
            <PublishInfo
                styles={styles}
                hidden={hidden}
                onPropertyChange={onPropertyChange}
                isScheduled={isScheduled}
                scheduledAt={scheduledAt} />
            <DetailFormButtonList
                styles={styles}
                createType={createType}
            />
        </form >
    );
}

export default DetailForm;














