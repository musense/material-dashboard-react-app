import React, { useCallback, useRef } from 'react'
import { Slate, Editable } from 'slate-react'
import { css } from '@emotion/css'
import { CustomEditor } from './CustomEditor'
import Toolbar from "./Toolbar";
import "./SlateEditor.module.css";

import { Element, Leaf } from "./Elements";
import ImageDialog from './ImageDialog'

import useCreateSlateEditor from '../../hook/useCreateSlateEditor'
import useModal from '../../hook/useModal';

function SlateEditor({
  slateValue,
  setState
}) {
  console.log("🚀 ~ file: SlateEditor.jsx:15 ~ SlateEditor ~ defaultValue:", slateValue)

  const slateEditor = useCreateSlateEditor()

  const urlRef = useRef(null);
  const altTextRef = useRef(null);
  const hrefRef = useRef(null);

  const {
    open,
    handleOpen,
    handleClose
  } = useModal()


  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <div className={css` 
    position: relative;
    background: rgb(255, 255, 255);
    max-width: 100%;
    margin-top: 36px;
    padding-top: 0;
    `}>
      <Slate
        editor={slateEditor}
        value={slateValue}
        onChange={setState}
      >
        <Toolbar
          handleClickOpen={handleOpen}
          currentUrl={urlRef.current}
          currentAltText={altTextRef.current}
          currentHref={hrefRef.current}
        />
        <Editable
          style={{
            fontSize: '1rem',
            minHeight: '30rem',
            height: '676px',
            maxHeight: '57rem',
            overflow: 'hidden auto',
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="請輸入文案..."
          onKeyDown={event => {
            // console.log("🚀 ~ file: SlateEditor.jsx:155 ~ SlateEditor ~ event:", event)
            if (event.ctrlKey && event.key === 'Enter') {
              event.preventDefault()
              CustomEditor.toggleBlock(slateEditor, 'numbered-list');
            }
            if (event.shiftKey && event.key === 'Enter') {
              event.preventDefault()
              CustomEditor.toggleBlock(slateEditor, 'bulleted-list');
            }

            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case '1': {
                event.preventDefault();
                CustomEditor.toggleBlock(slateEditor, 'h1');
                break;
              }
              case '2': {
                event.preventDefault();
                CustomEditor.toggleBlock(slateEditor, 'h2');
                break;
              }
              case '3': {
                event.preventDefault();
                CustomEditor.toggleBlock(slateEditor, 'h3');
                break;
              }
              case 'q': {
                event.preventDefault();
                CustomEditor.toggleBlock(slateEditor, 'block-quote');
                break
              }
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleMark(slateEditor, 'bold')
                break
              }
              case 'i': {
                event.preventDefault()
                CustomEditor.toggleMark(slateEditor, 'italic')
                break
              }
              case 'u': {
                event.preventDefault()
                CustomEditor.toggleMark(slateEditor, 'underline')
                break
              }
              case '`': {
                event.preventDefault()
                CustomEditor.toggleMark(slateEditor, 'code')
                break
              }
              case 'h': {
                event.preventDefault()

                const { selection } = slateEditor
                const allTextArray = slateEditor.children
                const anchorPath = selection.anchor.path[0]
                const focusPath = selection.focus.path[0]

                let selectedText
                if (anchorPath === focusPath) {
                  selectedText = CustomEditor.getSingleParagraphText(allTextArray, selection)
                } else {
                  selectedText = CustomEditor.getMultiParagraphText(allTextArray, selection)
                }
                const url = window.prompt(`${selectedText && `顯示的文字: ${selectedText}\n`}請輸入超連結：`)
                if (!url) return
                CustomEditor.insertLink(slateEditor, url)
                break
              }
              case 'r': {
                event.preventDefault()
                if (CustomEditor.isLinkActive(slateEditor)) {
                  CustomEditor.unwrapLink(slateEditor)
                }
                break
              }
              case 'g': {
                event.preventDefault()
                if (CustomEditor.isButtonActive(slateEditor)) {
                  CustomEditor.unwrapButton(slateEditor)
                } else {
                  CustomEditor.insertButton(slateEditor)
                }
                break
              }

            }
            if (event.shiftKey && event.ctrlKey) {
              switch (event.key) {
                case 'm':
                case 'M': {
                  event.preventDefault()
                  handleOpen()
                  break
                }
                case 'l':
                case 'L': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(slateEditor, 'left');
                  break
                }
                case 'c':
                case 'C': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(slateEditor, 'center');
                  break
                }
                case 'r':
                case 'R': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(slateEditor, 'right');
                  break
                }
                case 'f':
                case 'F': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(slateEditor, 'justify');
                  break
                }
                case 'x':
                case 'X': {
                  event.preventDefault()
                  CustomEditor.toggleMark(slateEditor, 'hide')
                  break
                }
              }
            }
          }}
          onDOMBeforeInput={event => {
            switch (event.inputType) {
              case 'formatBold':
                event.preventDefault()
                return CustomEditor.toggleFormat(slateEditor, 'bold')
              case 'formatItalic':
                event.preventDefault()
                return CustomEditor.toggleFormat(slateEditor, 'italic')
              case 'formatUnderline':
                event.preventDefault()
                return CustomEditor.toggleFormat(slateEditor, 'underlined')
            }
          }}
        />
      </Slate>
      <ImageDialog
        open={open}
        setClose={handleClose}
        urlRef={urlRef}
        altTextRef={altTextRef}
        hrefRef={hrefRef}
      />

    </div >
  )
}


export default SlateEditor











