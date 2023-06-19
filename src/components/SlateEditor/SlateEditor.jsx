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
import withCorrectVoidBehavior from "./withCorrectVoidBehavior";


function SlateEditor({ editorContentRef }) {
  // console.log("🚀 ~ file: SlateEditor.jsx:15 ~ SlateEditor ~ editorContentRef.current:", editorContentRef.current)

  const editor = useMemo(() =>
    withCorrectVoidBehavior(
      CustomEditor.withInlines(
        CustomEditor.withImages(
          withHistory(
            withReact(createEditor())
          )
        ))
    ), [])

  const urlRef     = useRef(null);
  const altTextRef = useRef(null);
  const hrefRef    = useRef(null);

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
    margin-top: 36px;
    padding-top: 0;
    `}>
      <ImageDialog
        open       = {open} setClose = {() => setOpen(false)}
        urlRef     = {urlRef}
        altTextRef = {altTextRef}
        hrefRef    = {hrefRef}
      />
      <Slate
        editor   = {editor}
        value    = {editorContentRef.current}
        onChange = {newValue => editorContentRef.current = newValue
        }>
        {/* <HoveringPopupToolbar /> */}
        <Toolbar
          handleClickOpen = {handleClickOpen}
          currentUrl      = {urlRef.current}
          currentAltText  = {altTextRef.current}
          currentHref     = {hrefRef.current}
        />
        <Editable
          style={{
            fontSize : '1rem',
            minHeight: '30rem',
            height   : 'auto',
            maxHeight: '57rem',
            overflow : 'hidden scroll',
          }}
          renderElement = {renderElement}
          renderLeaf    = {renderLeaf}
          placeholder   = "請輸入文案..."
          onKeyDown     = {event => {
            console.log("🚀 ~ file: SlateEditor.jsx:155 ~ SlateEditor ~ event:", event)
            if (event.ctrlKey && event.key === 'Enter') {
              event.preventDefault()
              CustomEditor.toggleBlock(editor, 'numbered-list');
            }
            if (event.shiftKey && event.key === 'Enter') {
              event.preventDefault()
              CustomEditor.toggleBlock(editor, 'bulleted-list');
            }

            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case '1': {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, 'h1');
                break;
              }
              case '2': {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, 'h2');
                break;
              }
              case '3': {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, 'h3');
                break;
              }
              case 'q': {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, 'block-quote');
                break
              }
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
              case 'h': {
                event.preventDefault()

                const { selection } = editor
                const allTextArray = editor.children
                const anchorPath   = selection.anchor.path[0]
                const focusPath    = selection.focus.path[0]

                let selectedText
                if (anchorPath === focusPath) {
                    selectedText = CustomEditor.getSingleParagraphText(allTextArray, selection)
                } else {
                    selectedText = CustomEditor.getMultiParagraphText(allTextArray, selection)
                }
                const url = window.prompt(`${selectedText && `顯示的文字: ${selectedText}\n`}請輸入超連結：`)
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
              case 'g': {
                event.preventDefault()
                if (CustomEditor.isButtonActive(editor)) {
                  CustomEditor.unwrapButton(editor)
                } else {
                  CustomEditor.insertButton(editor)
                }
                break
              }

            }
            if (event.shiftKey && event.ctrlKey) {
              switch (event.key) {
                case 'm': 
                case 'M': {
                  event.preventDefault()
                  handleClickOpen()
                  break
                }
                case 'l': 
                case 'L': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(editor, 'left');
                  break
                }
                case 'c': 
                case 'C': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(editor, 'center');
                  break
                }
                case 'r': 
                case 'R': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(editor, 'right');
                  break
                }
                case 'f': 
                case 'F': {
                  event.preventDefault();
                  CustomEditor.toggleBlock(editor, 'justify');
                  break
                }
                case 'x':
                case 'X': {
                  event.preventDefault()
                  CustomEditor.toggleMark(editor, 'hide')
                  break
                }
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











