import React from "react";
import styles from "./FormButtonList.module.css"

export default function FormButtonList({
    isEditing,
    onReset,
    callback
}) {
    return <div className={styles['form-button-container']}>
        {isEditing
            ? (<>
                <input type='button' value='取消' onClick={(e) => onReset(e)} />
                <input className='submit-btn' type='button' value='儲存' onClick={(e) => callback(e)} title="Enter" />
            </>)
            : (<>
                <input type='button' value='清空' onClick={(e) => onReset(e)} />
                <input className='submit-btn' type='button' value='新增' onClick={(e) => callback(e)} title="Enter" />
            </>)}
    </div>;
}

