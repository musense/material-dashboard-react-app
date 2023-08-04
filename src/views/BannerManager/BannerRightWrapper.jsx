import React from 'react';
import Card from 'components/Card/Card.jsx';
import styles from './BannerList.module.css'
import BannerRightHeader from './BannerRightHeader';
import BannerRightBody from './BannerRightBody';

export default function BannerRightWrapper() {
    return <div className={styles['banner-right-wrapper']}>
        <Card>
            <BannerRightHeader title={'Banner管理'}/>
            <BannerRightBody />
        </Card>
    </div>;
}









