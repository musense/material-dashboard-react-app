import React from 'react';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetBannerAction from '../../actions/GetBannerAction';
import getUpdateDateTime from 'utils/getUpdateDateTime';

export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    className = null
}) {

    const headerRow = headerConfig.headerRow

    return <div data-attr="data-body" className={`view-body ${className}`}>
        {showList && showList.length > 0 && showList.map((Banner, index) => {
            return (
                <div data-attr="data-body-row" key={index} >
                    {headerRow.map((rowItem, index) => {
                        if (rowItem.patchKey === 'createDate') {
                            return (
                                <BodyCell
                                    key={index}
                                    children={getUpdateDateTime(Banner[rowItem.patchKey])}
                                />
                            )
                        }
                        if (rowItem.patchKey === 'sorting') {
                            return Banner.sorting
                                ? (
                                    <BodyCell
                                        key={index}
                                        children={Banner.sorting}
                                        className={`is-popular-Banner`}
                                    />
                                )
                                : (
                                    <BodyCell
                                        key={index}
                                        children={<span>-</span>}
                                        className={`not-popular-Banner`}
                                    />
                                )
                        }
                        if (rowItem.name === '編輯') {
                            return <EditBodyCell
                                key={index}
                                copyText={Banner.webHeader.customUrl}
                                id={Banner._id}
                                name={Banner.name}
                                deleteMessage={'delete banner'}
                                editType={GetBannerAction.EDITING_BANNER}
                                editData={Banner}
                                handleOpenDialog={handleOpenDialog}
                            />
                        }
                        return <BodyCell key={index} children={Banner[rowItem.patchKey]} />
                    })}
                </div>);
        })}
    </div>;
}