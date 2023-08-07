import React from 'react';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetTagsAction from '../../actions/GetTagsAction';
import getUpdateDateTime from '../../utils/getUpdateDateTime';

export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    className = null
}) {

    const headerRow = headerConfig.headerRow
    return <div data-attr="data-body" className={`view-body ${className}`}>
        {showList && showList.length > 0 && showList.map((tag, index) => {
            return (
                <div data-attr="data-body-row" key={index} >
                    {headerRow.map((rowItem, index) => {
                        if (rowItem.patchKey === 'createDate') {
                            return (
                                <BodyCell
                                    key={index}
                                    children={getUpdateDateTime(tag[rowItem.patchKey])}
                                />
                            )
                        }
                        if (rowItem.patchKey === 'sorting') {
                            return tag.sorting
                                ? (
                                    <BodyCell
                                        key={index}
                                        children={tag.sorting}
                                        className={`is-popular-tag`}
                                    />
                                )
                                : (
                                    <BodyCell
                                        key={index}
                                        children={<span>-</span>}
                                        className={`not-popular-tag`}
                                    />
                                )
                        }
                        if (rowItem.name === '編輯') {
                            return <EditBodyCell
                                key={index}
                                copyText={tag.webHeader.customUrl}
                                id={tag._id}
                                name={tag.name}
                                deleteMessage={'delete tag'}
                                editType={GetTagsAction.EDITING_TAG}
                                editData={tag}
                                handleOpenDialog={handleOpenDialog}
                            />
                        }
                        return <BodyCell key={index} children={tag[rowItem.patchKey]} />
                    })}
                </div>);
        })}
    </div>;
}