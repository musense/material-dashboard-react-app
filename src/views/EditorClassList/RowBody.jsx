import React from "react";
import BodyCell from '../../components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetClassAction from 'actions/GetClassAction';
import MyScrollbar from "components/MyScrollbar/MyScrollbar";


export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    className = null
}) {
    const headerRow = headerConfig.headerRow;
    return (
        <MyScrollbar>
            <div className={`view-body ${className}`}>
                {showList &&
                    showList.length > 0 &&
                    showList.map((editorClass, index) => {
                        return (
                            <div key={index}>
                                {headerRow.map((rowItem, index) => {
                                    if (rowItem.patchKey === 'customUrl') {
                                        return (
                                            <BodyCell
                                                key={index}
                                                children={
                                                    <a href={editorClass.customUrl}
                                                        target='_blank'
                                                        rel='noopener noreferrer'>
                                                        {editorClass.customUrl}
                                                    </a>
                                                }
                                            />
                                        )
                                    }
                                    if (rowItem.name === '編輯') {
                                        return <EditBodyCell
                                            key={index}
                                            copyText={editorClass.customUrl}
                                            id={editorClass._id}
                                            name={editorClass.name}
                                            deleteMessage={'delete class'}
                                            editType={GetClassAction.EDITING_CLASS}
                                            editData={editorClass}
                                            handleOpenDialog={handleOpenDialog}
                                        />
                                    }
                                    return <BodyCell key={index} children={editorClass[rowItem.patchKey]} />
                                })}
                            </div>
                        );
                    })}
            </div>
        </MyScrollbar>
    );
}
