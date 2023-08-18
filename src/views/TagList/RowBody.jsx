import React from 'react';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetTagsAction from '../../actions/GetTagsAction';
import getUpdateDateTime from '../../utils/getUpdateDateTime';
import MyScrollbar from 'components/MyScrollbar/MyScrollbar';

export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    className = null
}) {

    const headerRow = headerConfig.headerRow
    return (
        <MyScrollbar>
            <div className={`view-body ${className}`}>
                {showList && showList.length > 0 && showList.map((tag, index) => {
                    return (
                        <div key={index} >
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
                                    return tag.popular
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
                                        editType={GetTagsAction.EDITING_TAG}
                                        editData={tag}
                                        handleOpenDialog={handleOpenDialog}
                                    />
                                }
                                return <BodyCell key={index} children={tag[rowItem.patchKey]} />
                            })}
                        </div>);
                })}
            </div>
        </MyScrollbar>
    );
}