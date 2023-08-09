import React from 'react';
import Card from 'components/Card/Card.jsx';
import styles from './TagList.module.css'
import TagRightHeader from './TagRightHeader';
import TagRightBody from './TagRightBody';
import { useSelector } from 'react-redux';

export default function TagRightWrapper() {

    const maxSizeClassName = useSelector((state) => state.getConfigReducer.maxSizeClassName);

    return <div className={`${styles['tag-right-wrapper']} ${styles[maxSizeClassName]}`}>
        <Card>
            <TagRightHeader />
            <TagRightBody />
        </Card>
    </div>;
}









