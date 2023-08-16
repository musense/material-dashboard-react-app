import React from 'react';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetBannerAction from '../../actions/GetBannerAction';
import getUpdateDateTime from 'utils/getUpdateDateTime';
import MyScrollbar from 'components/MyScrollbar/MyScrollbar';
import { Stack } from '@mui/material';

export default function RowBody({
    headerConfig,
    showList,
    handleOpen,
    setMediaInfo,
    className = ''
}) {

    const headerRow = headerConfig.headerRow

    const onNoteClick = (note) => {
        handleOpen();
        setMediaInfo('Hello World!');
    }

    return (
        <MyScrollbar>
            <div className={`view-body ${className}`}>
                {showList && showList.length > 0 && showList.map((banner, index) => {
                    return (
                        <div key={index} >
                            {headerRow.map((rowItem, index) => {
                                if (rowItem.patchKey === 'createDate') {
                                    return (
                                        <BodyCell
                                            key={index}
                                            children={getUpdateDateTime(banner[rowItem.patchKey])}
                                            className={rowItem.className}
                                        />
                                    )
                                }
                                if (rowItem.patchKey === 'sort') {
                                    return banner.sort
                                        ? (
                                            <BodyCell
                                                key={index}
                                                children={banner.sort}
                                                className={rowItem.className}
                                            />
                                        )
                                        : (
                                            <BodyCell
                                                key={index}
                                                children={<span>-</span>}
                                                className={rowItem.className}
                                            />
                                        )
                                }
                                if (rowItem.patchKey === 'startDate') {
                                    return (<>
                                        <Stack spacing={2} direction={'column'} className={rowItem.className}>
                                            <BodyCell
                                                key={'startDate' + index}
                                                children={getUpdateDateTime(banner.startDate)}
                                                className={rowItem.className}
                                            />
                                            <div>~</div>
                                            <BodyCell
                                                key={'endDate' + index}
                                                children={getUpdateDateTime(banner.endDate)}
                                            />
                                        </Stack>
                                    </>)
                                }
                                if (rowItem.name === '圖片/影片') {
                                    return <BodyCell key={index} children={banner.contentImagePath !== ''
                                        ? (
                                            <img
                                                src={banner.homeImagePath}
                                                title={banner.contentImagePath}
                                                alt={banner.hyperlink}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpen();
                                                    setMediaInfo(banner);
                                                }} />
                                        ) : '無圖片/縮圖'}
                                        className={rowItem.className}

                                    />
                                }
                                if (rowItem.name === '編輯') {
                                    return <EditBodyCell
                                        // note
                                        // onNote={() => onNoteClick(banner.remark)}
                                        key={index}
                                        copyText={banner.hyperlink}
                                        id={banner._id}
                                        name={banner.name}
                                        editType={GetBannerAction.EDITING_BANNER}
                                        editData={banner}
                                        className={rowItem.className}
                                    />
                                }
                                return <BodyCell key={index} className={rowItem.className} children={banner[rowItem.patchKey]} />
                            })}
                        </div>);
                })}
            </div>
        </MyScrollbar>
    );
}