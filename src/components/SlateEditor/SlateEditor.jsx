import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react'
import { createEditor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { css } from '@emotion/css'
import { CustomEditor } from './CustomEditor'
import HoveringPopupToolbar from "./HoveringPopupToolbar";
import Toolbar from "./Toolbar";
import "./SlateEditor.module.css";

import { Element, Leaf } from "./Elements";
import ImageDialog from './ImageDialog'

function SlateEditor({ editorContentRef }) {
  // console.log("🚀 ~ file: SlateEditor.jsx:15 ~ SlateEditor ~ editorContentRef.current:", editorContentRef.current)

  const editor = useMemo(() => CustomEditor.withInlines(
    CustomEditor.withImages(
      withHistory(
        withReact(createEditor())
      )
    )
  ), [])

  const urlRef = useRef(null);
  const altTextRef = useRef(null);

  useEffect(() => {
    if (!editorContentRef.current) return
    if (editorContentRef.current.length <= 0) return

    const totalNodes = editor.children.length;
    const savedDefaultNodes = editorContentRef.current;
    if (totalNodes > 1) return

    for (let i = 0; i < totalNodes - 1; i++) {
      Transforms.removeNodes(editor, {
        at: [totalNodes - i - 1],
      });
    }

    for (const value of savedDefaultNodes) {
      Transforms.insertNodes(editor, value, {
        at: [editor.children.length]
      })
    }

    Transforms.removeNodes(editor, {
      at: [0],
    });
    
  }, [editor, editorContentRef.current]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <div className={css` 
    position: relative;
    background: rgb(255, 255, 255);
    max-width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    `}>
      <ImageDialog
        open={open} setClose={() => setOpen(false)}
        urlRef={urlRef} altTextRef={altTextRef}
      />
      <Slate
        editor={editor}
        value={editorContentRef.current}
        onChange={newValue => editorContentRef.current = newValue
        }>
        <HoveringPopupToolbar />
        <Toolbar
          handleClickOpen={handleClickOpen}
          currentUrl={urlRef.current}
          currentAltText={altTextRef.current}
        />
        <Editable
          style={
            {
              fontSize: '1rem',
              minHeight: '30rem',
              height: 'auto',
              maxHeight: '57rem',
              overflow: 'hidden scroll',
            }
          }
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="請輸入文案..."
          onKeyDown={event => {
            if (event.shiftKey && event.key === 'Enter') {
              event.preventDefault()
              // console.log("🚀 ~ file: SlateEditor.jsx:155 ~ SlateEditor ~ event:", event)
              // console.log("🚀 ~ file: SlateEditor.jsx:155 ~ SlateEditor ~ event.target.childNodes[0].localName:", event.target.childNodes[0].localName)
              switch (event.target.childNodes[0].localName) {
                case 'ol': {
                  CustomEditor.resetBlockAndNewLine(editor, 'numbered-list')
                  return
                }
                case 'ul': {
                  CustomEditor.resetBlockAndNewLine(editor, 'bulleted-list')
                  return
                }
              }
            }

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
                const url = window.prompt('請輸入超連結：')
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











