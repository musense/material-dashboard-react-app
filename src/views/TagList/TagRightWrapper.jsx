import React from 'react';
import Card from 'components/Card/Card.jsx';
import styles from './TagList.module.css'
import TagRightHeader from './TagRightHeader';
import TagRightBody from './TagRightBody';

export default function TagRightWrapper() {
    return <div className={styles['tag-right-wrapper']}>
        <Card>
            <TagRightHeader />
            <TagRightBody />
        </Card>
    </div>;
}









