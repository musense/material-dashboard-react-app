import React, { useMemo, useCallback, useEffect, useState, useLayoutEffect } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { css } from '@emotion/css'
import { CustomEditor } from './CustomEditor'
import HoveringPopupToolbar from "./HoveringPopupToolbar";
import Toolbar from "./Toolbar";
import "./SlateEditor.module.css";

import { Element, Leaf } from "./Elements";

function SlateEditor({ editorContentRef }) {

  const editor = useMemo(() => CustomEditor.withInlines(
    CustomEditor.withImages(
      withHistory(
        withReact(createEditor())
      )
    )
  ), [])

  // console.log("🚀 ~ file: SlateEditor.jsx:24 ~ SlateEditor ~ editorContentRef.current:", editorContentRef.current)
  // const [value, setValue] = useState(editorContentRef.current);
 
  // useEffect(() => {
  //   setValue(editorContentRef.current)
  // }, [editorContentRef.current]);
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <div className={css` 
    background: rgb(255, 255, 255);
    max-width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    `}>
      <Slate
        editor={editor}
        value={editorContentRef.current}
        onChange={newValue => {
          // setValue(newValue)
          editorContentRef.current = newValue
          // console.log(editorContentRef.current);
          // const isAstChange = editor.operations.some(
          //   op => 'set_selection' !== op.type
          // )
          // if (isAstChange) {
          //   // Save the value to Local Storage
          //   const content = JSON.stringify(newValue)
          //   localStorage.setItem('content', content)
          // }
        }}>
        <HoveringPopupToolbar />
        <Toolbar />
        <Editable
          style={
            {
              minHeight: '60rem',
              fontSize: '1rem',
            }
          }
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="請輸入文案..."
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleMark(editor, 'bold')
                break
              }
              case 'i': {
                event.preventDefault()
                CustomEditor.toggleMark(editor, 'italic')
                break
              }
              case 'u': {
                event.preventDefault()
                CustomEditor.toggleMark(editor, 'underline')
                break
              }
              case '`': {
                event.preventDefault()
                CustomEditor.toggleMark(editor, 'code')
                break
              }
              case 'l': {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                CustomEditor.insertLink(editor, url)
                break
              }
              case 'r': {
                event.preventDefault()
                if (CustomEditor.isLinkActive(editor)) {
                  CustomEditor.unwrapLink(editor)
                }
                break
              }

            }
          }}
          onDOMBeforeInput={event => {
            switch (event.inputType) {
              case 'formatBold':
                event.preventDefault()
                return CustomEditor.toggleFormat(editor, 'bold')
              case 'formatItalic':
                event.preventDefault()
                return CustomEditor.toggleFormat(editor, 'italic')
              case 'formatUnderline':
                event.preventDefault()
                return CustomEditor.toggleFormat(editor, 'underlined')
            }
          }}
        />
      </Slate>
    </div >
  )
}

export default SlateEditor











