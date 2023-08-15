import React from 'react';
import Card from 'components/Card/Card.jsx';
import styles from './BannerList.module.css'
import BannerRightHeader from './BannerRightHeader';
import BannerRightBody from './BannerRightBody';
import { useSelector } from 'react-redux';

export default function BannerRightWrapper() {

    const maxSizeClassName = useSelector((state) => state.getConfigReducer.maxSizeClassName);

    return <div className={`${styles['banner-right-wrapper']} ${styles[maxSizeClassName]}`}>
        <Card>
            <BannerRightHeader title={'Banner管理'} />
            <BannerRightBody />
        </Card>
    </div>;
}









