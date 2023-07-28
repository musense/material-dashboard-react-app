import React, { useCallback } from "react";


import styles from '../IEditor.module.css';

import { useDispatch, useSelector } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction';

import WebHeader from "./WebHeader";
import Tags from "./Tags";
import Classification from "./Classification";
import Media from "./Media";
import PublishInfo from "./PublishInfo";
import DetailFormButtonList from "./DetailFormButtonList";



const DetailForm = ({ createType }) => {

    const dispatch = useDispatch();
    const detailForm = useSelector((state) => state.getSlateReducer.detailForm);

    const { webHeader, media, publishInfo, ...props } = detailForm;
    const {
        headTitle,
        headDescription,
        headKeyword,
        manualUrl,
        sitemapUrl: customUrl
    } = webHeader;

    const {
        tags,
        categories
    } = props
    console.log("🚀 ~ file: DetailForm.jsx:37 ~ DetailForm ~ categories:", categories)
    console.log("🚀 ~ file: DetailForm.jsx:37 ~ DetailForm ~ tags:", tags)

    const {
        contentImagePath,
        homeImagePath,
        altText
    } = media

    const {
        hide,
        isScheduled,
        scheduledAt
    } = publishInfo





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
                altText={altText} />
            <PublishInfo
                styles={styles}
                hide={hide}
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














