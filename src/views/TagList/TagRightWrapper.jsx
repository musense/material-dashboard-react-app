import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';

import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import styles from './TagList.module.css'
import Button from '../../components/CustomButtons/Button';
import TagSearchForm from './TagSearchForm';



export default function TagRightWrapper({ isLoading = true }) {


    return <div className={styles['tag-right-wrapper']}>
        <Card>
            <MemoizedTagRightHeader />
            <MemoizedTagRightHeaderBody />
        </Card>
    </div>;
}

const TagRightHeader = () => {


    return <CardHeader color='primary'>
        <h4>標籤管理</h4>

    </CardHeader>;
}



function TagRightBody() {


    const dispatch = useDispatch();
    const [prevBtnDisable, setPrevBtnDisable] = useState(false);
    const [nextBtnDisable, setNextBtnDisable] = useState(false);

    const checkedToDeleteMapRef = useRef(new Map())
    const showTagList = useSelector((state) => state.getTagsReducer.showTagList);
    const currentPage = useSelector((state) => state.getTagsReducer.currentPage) || 0;
    console.log("🚀 ~ file: TagRightWrapper.jsx:105 ~ TagRightBody ~ currentPage:", currentPage)
    const totalCount = useSelector((state) => state.getTagsReducer.totalCount) || 0;

    const [tagList, setTagList] = useState();

    useEffect(() => {
        setTagList(showTagList)
    }, [showTagList]);

    useEffect(() => {
        console.log("🚀 ~ file: TagRightWrapper.jsx:25 ~ TagRightWrapper ~ totalCount:", totalCount)
        console.log("🚀 ~ file: TagRightWrapper.jsx:28 ~ useEffect ~ currentPage:", currentPage)
        if (currentPage === 1)
            setPrevBtnDisable(true)
        else
            setPrevBtnDisable(false)
        if (currentPage * 10 - totalCount >= 0 && currentPage * 10 - totalCount < 10)
            setNextBtnDisable(true)
        else
            setNextBtnDisable(false)
    }, [currentPage, totalCount]);

    function onEdit(tag) {
        dispatch({
            type: GetTagsAction.EDITING_TAG,
            payload: {
                data: tag
            },
        });
    }
    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetTagsAction.REQUEST_PAGE_TAG,
            payload: pageNumber

        })
    }

    function checkEditorClassRow(e) {
        e.stopPropagation();
        checkedToDeleteMapRef.current.set(e.target.name, e.target.checked)
        console.log("🚀 ~ file: TagRightWrapper.jsx:164 ~ checkEditorClassRow ~ checkedToDeleteMapRef.current:", checkedToDeleteMapRef.current)
    }

    function onBunchDelete(e) {
        e.preventDefault()
        const deleteIds = []
        for (const [key, value] of checkedToDeleteMapRef.current.entries()) {
            if (!value) continue
            deleteIds.push(key)
        }
        console.log("🚀 ~ file: TagRightWrapper.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)
        // return
        console.log("🚀 ~ file: TagRightWrapper.jsx:43 ~ onBunchDelete ~ checkedToDeleteMapRef.current:", checkedToDeleteMapRef.current)
        dispatch({
            type: GetTagsAction.BUNCH_DELETE_TAG,
            payload: deleteIds

        });
        checkedToDeleteMapRef.current.clear()
        e.target.reset();
    }
    const onSortingClick = (key) => {
        dispatch({
            type: GetTagsAction.SHOW_TAG_LIST_SORTING,
            payload: {
                key: key
            }
        })
    }
    return <CardBody>
        <TagSearchForm />
        <Button
            color='info'
            disabled={prevBtnDisable}
            onClick={() => onPageButtonClick(currentPage - 1)}
        >
            上一頁
        </Button>
        <Button
            color='info'
            disabled={nextBtnDisable}
            onClick={() => onPageButtonClick(currentPage + 1)}
        >
            下一頁
        </Button>
        <form name='view-class-form' className={styles['tag-table-wrapper']} onSubmit={onBunchDelete}>
            <div data-attr="data-header" className={`view-form ${styles['tag-table-header']}`}>
                <div data-attr="data-header-row">
                    <div> <input type='submit' value='批次刪除' /> </div>
                    <div> <input type='button' value='標籤名稱' onClick={() => onSortingClick('name')} /></div>
                    <div> 前台顯示網址</div>
                    {/* <div> <input type='button' value='標籤排序' onClick={() => onSortingClick('sorting')} /></div> */}
                    {/* <div> <input type='button' value='日期' onClick={() => onSortingClick('createDate')} /></div> */}
                    {/* <div> <input type='button' value='熱門標籤' onClick={() => onSortingClick('isHot')} /></div> */}
                </div>
            </div>
            <div data-attr="data-body" className={`${styles['view-form']} ${styles['tag-table-body']}`}>
                {tagList && tagList.length > 0 && tagList.map((tag, index) => {
                    return (
                        <div data-attr="data-body-row" key={index} onClick={() => onEdit(tag)}>
                            <div><input type='checkbox' name={tag._id} onClick={checkEditorClassRow} /></div>
                            <div>{tag.name}</div>
                            <div>
                                <a href={tag.webHeader.customUrl} target="_blank" rel="noopener noreferrer" >
                                    {tag.webHeader.customUrl}
                                </a>
                            </div>
                            {/* <div>{tag.createDate}</div>
                            <div>{tag.isHot ? 'Yes' : 'No'}</div> */}
                        </div>);
                })}
            </div>

        </form>
    </CardBody>;
}
const MemoizedTagRightHeader = React.memo(TagRightHeader)
const MemoizedTagRightHeaderBody = React.memo(TagRightBody)


