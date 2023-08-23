import React from 'react';
import Card from 'components/Card/Card.jsx';
import BannerRightHeader from './BannerRightHeader';
import BannerRightBody from './BannerRightBody';
import { useSelector } from 'react-redux';

export default function BannerRightWrapper({ styles }) {

    const maxSizeClassName = useSelector((state) => state.getConfigReducer.maxSizeClassName);

    const bannerRightWrapperClassName = maxSizeClassName !== "" ? styles[maxSizeClassName] : ""
    return <div className={`${styles['banner-right-wrapper']} ${bannerRightWrapperClassName}`}>
        <Card>
            <BannerRightHeader title={'Banner管理'} />
            <BannerRightBody />
        </Card>
    </div>;
}









