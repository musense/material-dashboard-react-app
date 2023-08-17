import React from "react";
import styles from "./FormButtonList.module.css"

export default function FormButtonList({
    isEditing,
    onReset,
    callback
}) {

    return isEditing
        ? <FormButtonContainer
            resetValue="取消"
            submitValue="儲存"
            onReset={onReset}
            callback={callback}
        />
        : <FormButtonContainer
            resetValue="清空"
            submitValue="新增"
            onReset={onReset}
            callback={callback}
        />
}

const FormButtonContainer = ({ resetValue, submitValue, onReset, callback }) => {
    return <div className={styles['form-button-container']}>
        <input type='button' value={resetValue} onClick={(e) => onReset(e)} />
        <input className='submit-btn' type='button' value={submitValue} onClick={(e) => callback(e)} title="Enter" />
    </div>
}