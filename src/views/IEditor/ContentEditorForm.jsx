import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import SlateEditor from '../../components/SlateEditor/SlateEditor';
import { useDispatch, useSelector } from "react-redux";
import * as GetSlateAction from 'actions/GetSlateAction';
import useSetDefaultRef from "../../hook/useSetDefaultRef";

const ContentEditorForm = () => {
  const dispatch = useDispatch();
  const contentForm = useSelector((state) => state.getSlateReducer.contentForm);
  const { title, content } = contentForm;
  console.log("🚀 ~ file: ContentEditorForm.jsx:17 ~ ContentEditorForm ~ title:", title)
  console.log("🚀 ~ file: ContentEditorForm.jsx:17 ~ ContentEditorForm ~ content:", content)

  const onPropertyChange = useCallback((value, property) => {
    if (JSON.stringify(value) === JSON.stringify(content)) return
    dispatch({
      type: GetSlateAction.SET_PROPERTY,
      payload: {
        allProps: {
          form: 'contentForm',
          info: null,
          property: property,
          value: value
        }
      }
    })
  }, [dispatch, content])

  const onSlateEditorChange = useCallback((value) => {
    onPropertyChange(value, 'content')
  }, [onPropertyChange])

  return (
    <form >
      <div className='iEditor-Title-Container'>
        <label htmlFor='title'>文章標題</label>
        <input
          name='title'
          id='content-editor-title'
          type='text'
          value={title}
          onChange={e => onPropertyChange(e.target.value, 'title')}
        />
      </div>
      <SlateEditor
        key={title}
        slateValue={content}
        setState={onSlateEditorChange}
      />
    </form>
  );
}



export default ContentEditorForm;