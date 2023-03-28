import React, { useEffect, useMemo, useRef, useState } from 'react'; // useState
// core components
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CustomEditorTable from 'components/CustomEditorTable/CustomEditorTable.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import CustomModal from '../../components/CustomModal/CustomModal';
import Button from 'components/CustomButtons/Button';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import * as GetTagsAction from '../../actions/GetTagsAction';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import styles from './EditorList.module.css'

function EditorList() {

  const dateRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const serialNumberSortingRef = useRef('asc');
  const titleSortingRef = useRef('asc');
  const classificationSortingRef = useRef('asc');
  const createAtSortingRef = useRef('asc');
  const [isEditing, setIsEditing] = useState(false);
  const checkedToDeleteMap = new Map()
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [dateRangeState, setDateRangeState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const titleList = useSelector((state) => state.getEditorReducer.titleList);
  const [titleViewList, setTitleViewList] = useState([]);

  useMemo(() => {
    setTitleViewList(titleList)
  }, [titleList])

  console.log('🚀 ~ file: EditorList.jsx:59 ~ EditorList ~ titleList:', titleList);

  const [addEditorDisabled, setAddEditorDisabled] = useState(false);

  const [isRowLink, setIsRowLink] = useState(true);
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  const mounted = useRef();
  const selectedIDRef = useRef(null);

  function keyDownEventHandler(e) {
    const keyName = e.key;
    if (keyName === 'Enter') {
      e.target.submit()
    }
  }
  useEffect(() => {
    if (!mounted.current) {
      //componentDidMount
      selectedIDRef.current = -1;
      mounted.current = true;
      // dispatch({ type: GetEditorAction.REQUEST_EDITOR });
      // dispatch({ type: GetTagsAction.REQUEST_TAG });

      const submitBtn = document.getElementById('editor-list-form-submit');
      submitBtn.addEventListener('keydown', keyDownEventHandler)

    } else {
      //componentDidUpdate
      if (returnMessage && returnMessage.indexOf('successfully') !== -1) {
        if (returnMessage.indexOf('update') === -1) {
          selectedIDRef.current = -1;
        }
        closeModal();
      }
    }

    return () => {
      const submitBtn = document.getElementById('editor-list-form-submit');
      submitBtn.removeEventListener('keydown', keyDownEventHandler)
    }
  }, [returnMessage]);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function onSelectEditorClick() {
    setIsRowLink((prevIsRowLink) => !prevIsRowLink);
  }
  function onDeleteEditorClick() {
    const ids = [selectedIDRef.current];

    dispatch({
      type: GetEditorAction.DELETE_EDITOR,
      payload: {
        data: {
          ids,
        },
      },
    });
  }

  function initialEditorState() {
    dispatch({ type: GetEditorAction.INITIAL_EDITOR });
  }
  function onAddNewEditor() {
    // initialEditorState()
    navigate('/admin/editorList/edit/new');
  }

  function handleSelect(item) {
    dateRef.current = {
      'start-date': `${item.selection.startDate.toLocaleDateString()} 00:00:00`,
      'end-date': `${item.selection.endDate.toLocaleDateString()} 23:59:59`
    }
    setDateRangeState([item.selection])
  }
  function onSearchEditorList(e) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const searchData = Object.assign({}, Object.fromEntries(formData), { createAt: dateRef.current });
    console.log("🚀 ~ file: EditorList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)
    let tempViewList = [...titleList]

    if (searchData.title) {
      tempViewList = tempViewList
        .filter(titleView => titleView.title.toLowerCase().includes(searchData.title.toLowerCase()))
    }
    if (searchData.classification) {
      tempViewList = tempViewList
        .filter(titleView => titleView.classification.toLowerCase().includes(searchData.classification.toLowerCase()))
    }
    if (searchData.createAt) {
      searchData.createAt['start-date'] && (
        tempViewList = tempViewList
          .filter(titleView =>
            (new Date(searchData.createAt['start-date'])).getTime() <= (new Date(titleView.createAt)).getTime())
      )
      searchData.createAt['end-date'] && (
        tempViewList = tempViewList
          .filter(titleView =>
            (new Date(searchData.createAt['end-date'])).getTime() >= (new Date(titleView.createAt)).getTime())
      )
    }
    setTitleViewList(tempViewList)
  }
  function reset() {
    // name='editor-list-form' 
    const form = document.getElementsByName('editor-list-form')[0];
    form.reset();
    dateRef.current = {
      'start-date': null,
      'end-date': null
    }
    setDateRangeState([{
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }])
  }
  function onEdit(updateEditor) {
    setIsEditing(true)
    console.log(updateEditor);
    // return
    dispatch({
      type: GetEditorAction.UPDATE_EDITOR,
      payload: {
        data: {
          editorClass: updateEditor,
        },
      },
    });

  }
  function onSearchBunchDeleteList(e) {
    e.preventDefault()
    const deleteIds = []
    for (const [key, value] of checkedToDeleteMap.entries()) {
      if (!value) continue
      deleteIds.push(key)
    }
    console.log("🚀 ~ file: EditorClassList.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)

    dispatch({
      type: GetEditorAction.BUNCH_DELETE_CLASS,
      payload: {
        data:
          deleteIds
      },
    });
    e.target.reset();
  }

  function checkEditorClassRow(e) {
    e.stopPropagation();
    checkedToDeleteMap.set(e.target.name, e.target.checked)
    console.log("🚀 ~ file: EditorClassList.jsx:164 ~ checkEditorClassRow ~ checkedToDeleteMap:", checkedToDeleteMap)
  }
  function onSerialNumberClick() {
    const tempViewList = [...titleViewList]
    if (serialNumberSortingRef.current === 'asc') {
      serialNumberSortingRef.current = 'desc'
      setTitleViewList(tempViewList.sort((t1, t2) => t2['serial-number'] - t1['serial-number']))
    } else {
      serialNumberSortingRef.current = 'asc'
      setTitleViewList(tempViewList.sort((t1, t2) => t1['serial-number'] - t2['serial-number']))
    }
  }
  function onTitleClick() {
    const tempViewList = [...titleViewList]
    if (titleSortingRef.current === 'asc') {
      titleSortingRef.current = 'desc'
      setTitleViewList(tempViewList.sort((t1, t2) => t2.title.localeCompare(t1.title)))
    } else {
      titleSortingRef.current = 'asc'
      setTitleViewList(tempViewList.sort((t1, t2) => t1.title.localeCompare(t2.title)))
    }
  }
  function onClassificationClick() {
    const tempViewList = [...titleViewList]
    if (classificationSortingRef.current === 'asc') {
      classificationSortingRef.current = 'desc'
      setTitleViewList(tempViewList.sort((t1, t2) => t2.classification.localeCompare(t1.classification)))
    } else {
      classificationSortingRef.current = 'asc'
      setTitleViewList(tempViewList.sort((t1, t2) => t1.classification.localeCompare(t2.classification)))
    }
  }
  function onCreateAtClick() {
    const tempViewList = [...titleViewList]
    if (createAtSortingRef.current === 'asc') {
      createAtSortingRef.current = 'desc'
      setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t2.createAt)).getTime() - (new Date(t1.createAt)).getTime()))
    } else {
      createAtSortingRef.current = 'asc'
      setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t1.createAt)).getTime() - (new Date(t2.createAt)).getTime()))
    }
  }
  return (
    <div className={'container'}>
      {/* <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} /> */}
      <div className={'wrapper'}>
        <Card>
          <CardHeader color='primary'>
            <h4 >文章列表</h4>
            <form name='editor-list-form' onSubmit={onSearchEditorList}>
              <div>
                <label htmlFor="title">標題</label>
                <input type="text" name='title' />
              </div>
              <div>

                <label htmlFor="classification">分類</label>
                <input type="text" name='classification' />
              </div>
              <div>

                <label htmlFor="dateRange">日期</label>
                <DateRange
                  className={styles['date-range-selector']}
                  name="dateRange"
                  // editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRangeState}
                  onChange={handleSelect}
                  locale={locales['zhTW']}
                />
              </div>
              <div>
                <input id="editor-list-form-submit" type="submit" value="查詢" />
                <input type='button' value='清空' onClick={reset} />
              </div>
            </form>

          </CardHeader>
          <CardBody>
            <Button
              color='info'
              disabled={addEditorDisabled}
              onClick={() => onAddNewEditor()}
            >
              Add New Editor
            </Button>
            <form name='view-editor-list-form' onSubmit={onSearchBunchDeleteList}>
              <div data-attr="data-header" className={`${styles['view-form']} ${styles['view-editor-list-header']}`}>
                <div data-attr="data-header-row">
                  <div> <input type='submit' value='批次刪除' /> </div>
                  <div> <input type='button' value='編號' onClick={onSerialNumberClick} /> </div>
                  <div><input type='button' value='標題' onClick={onTitleClick} /></div>
                  <div><input type='button' value='分類' onClick={onClassificationClick} /></div>
                  <div>圖片/縮圖</div>
                  <div>圖片/連結影片</div>
                  <div><input type='button' value='日期' onClick={onCreateAtClick} /> </div>
                </div>
              </div>
              <div data-attr="data-body" className={`${styles['view-form']} ${styles['view-editor-list-body']}`}>
                {
                  titleViewList && titleViewList.length > 0 && titleViewList.map((titleView, index) => {
                    if (titleView.thumbnail) {
                      titleView = {
                        ...titleView,
                        img: {
                          src: titleView.thumbnail.src,
                          alt: titleView.thumbnail.alt,
                        },
                        film: {
                          href: titleView.thumbnail.src,
                          title: titleView.thumbnail.alt,
                        },
                      }
                    }
                    if (titleView['film-url']) {
                      titleView = {
                        ...titleView,
                        img: {
                          src: titleView['film-url'].thumbnail,
                          alt: titleView['film-url'].title,
                        },
                        film: {
                          href: titleView['film-url'].url,
                          title: titleView['film-url'].title,
                        },
                      }
                    }
                    return (
                      <div data-attr="data-body-row" key={index} onClick={() => onEdit(titleView)}>
                        <div><input type='checkbox' name={titleView._id} onClick={checkEditorClassRow} /></div>
                        <div>{titleView['serial-number']}</div>
                        <div>{titleView.title}</div>
                        <div>{titleView.classification}</div>
                        {titleView.img && titleView.film ? (
                          <>
                            <div className={styles['view-editor-image-container']}>
                              {titleView.img && <img src={titleView.img.src} title={titleView.img.alt} alt={titleView.img.alt} />}
                            </div>
                            <div>
                              {titleView.film && <a href={titleView.film.href} target="_blank" >{titleView.film.title}</a>}
                            </div>
                          </>
                        )
                          :
                          (
                            <>
                              <div className={styles['view-editor-image-container']}>無圖片/縮圖</div>
                              <div>無連結</div>
                            </>
                          )
                        }

                        <div>
                          <span className={`${titleView.published ? styles['published'] : styles['not-published-yet']}`}>
                            {titleView.published ? '已發佈' : '未發佈'}
                          </span>
                          <span>
                            {titleView['createAt']}
                          </span>
                        </div>
                      </div>)
                  })
                }
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
      <Outlet />
    </div>
  );
}


export default EditorList;



              // <>
              //   <CustomEditorTable
              //     tableHeaderColor='primary'
              //     tableHead={tableHead}
              //     tableData={titleList}
              //     openModal={openModal}
              //     closeModal={closeModal}
              //     initialEditorState={initialEditorState}
              //     selectedIDRef={selectedIDRef}
              //     isRowLink={isRowLink}
              //   />
              //   <div className={'EditorList-Button-Container'}>
              //     <Button color='info' onClick={() => onSelectEditorClick()}>
              //       {isRowLink ? 'Select Editor' : 'Cancel Select'}
              //     </Button>
              //     <div
              //       className={
              //         isRowLink ? 'HideDeleteButton' : 'ShowDeleteButton'
              //       }
              //     >
              //       <Button
              //         color='danger'
              //         disabled={addEditorDisabled}
              //         onClick={() => onDeleteEditorClick()}
              //       >
              //         Delete Editor
              //       </Button>
              //     </div>
              //   </div>
              // </>