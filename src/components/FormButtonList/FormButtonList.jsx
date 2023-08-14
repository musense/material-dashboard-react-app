import React from "react";
import styles from "./FormButtonList.module.css"

export default function FormButtonList({
    isEditing,
    onReset
}) {
    return <div className={styles['form-button-container']}>
        {isEditing
            ? (<>
                <input type='button' value='取消' onClick={(e) => onReset(e)} />
                <input type='submit' value='儲存' title="Enter" />
            </>)
            : (<>
                <input type='button' value='清空' onClick={(e) => onReset(e)} />
                <input type='submit' value='新增' title="Enter" />
            </>)}
    </div>;
}

