import React from "react";
import { Stack } from '@mui/material';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import BodyCell from "../../components/BodyCell/BodyCell";
import EditBodyCell from "../../components/EditBodyCell/EditBodyCell";
import getUpdateDateTime from "utils/getUpdateDateTime";
import MyScrollbar from "components/MyScrollbar/MyScrollbar";

export default function RowBody({
    headerConfig,
    showList,
    handleOpen,
    setMediaInfo,
    handleOpenDialog,
    className = ''
}) {
    const navigate = useNavigate();

    const headerRow = headerConfig.headerRow
    return (
        <MyScrollbar>
            <div className={`view-body ${className}`}>
                {showList && showList.length > 0 && showList.map((titleView, index) => {
                    return (
                        <div key={index}>
                            {headerRow.map((rowItem, index) => {
                                if (rowItem.patchKey && rowItem.patchKey.includes(".")) {
                                    const patchKeys = rowItem.patchKey.split(".");
                                    return <BodyCell key={index} children={titleView[patchKeys[0]][patchKeys[1]]} className={rowItem.className} />
                                }
                                if (rowItem.patchKey === 'createDate' || rowItem.patchKey === 'updateDate') {
                                    return (
                                        <BodyCell
                                            key={index}
                                            children={getUpdateDateTime(titleView[rowItem.patchKey])}
                                            className={rowItem.className}
                                        />
                                    )
                                }
                                if (rowItem.patchKey === 'status') {
                                    return <BodyCell key={index} className={rowItem.className} children={<Stack spacing={1} direction={'column'} >
                                        <span style={{
                                            color: titleView.status === '已發布' ? 'green'
                                                : titleView.status === '已排程' ? 'red'
                                                    : titleView.status === '草稿' ? 'black'
                                                        : 'grey',
                                            fontWeight: 'bold'
                                        }}>
                                            {titleView.status}
                                        </span>
                                        <span>
                                            {
                                                titleView.isPublished
                                                    ? getUpdateDateTime(titleView.publishDate)
                                                    : titleView.isScheduled
                                                        ? getUpdateDateTime(titleView.scheduleTime)
                                                        : null
                                            }
                                        </span>
                                    </Stack>} />
                                }
                                if (rowItem.name === '圖片/影片') {
                                    return <BodyCell key={index} children={titleView.media.contentImagePath !== ''
                                        ? (
                                            <img
                                                src={titleView.media.homeImagePath}
                                                title={titleView.media.contentImagePath}
                                                alt={titleView.media.altText}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpen();
                                                    setMediaInfo(titleView.media);
                                                }} />
                                        ) : '無圖片/縮圖'}
                                        className={rowItem.className}

                                    />
                                }
                                if (rowItem.name === '編輯') {
                                    return <EditBodyCell
                                        key={index}
                                        copyText={titleView.webHeader.customUrl}
                                        id={titleView._id}
                                        name={titleView.content.title}
                                        editType={GetEditorAction.REQUEST_EDITOR_BY_ID}
                                        editData={titleView._id}
                                        handleOpenDialog={handleOpenDialog}
                                        callback={() => navigate(`/admin/editorList/${titleView._id}`)}
                                        className={rowItem.className}
                                    />
                                }
                                return <BodyCell key={index} children={titleView[rowItem.patchKey]} className={rowItem.className} />
                            })}
                        </div>);
                })}
            </div>
        </MyScrollbar>
    )

}

