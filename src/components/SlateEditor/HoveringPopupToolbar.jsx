import React, { useEffect, useRef } from 'react'
import { Editor, Range } from 'slate'
import { useSlate, useFocused } from 'slate-react'
import { Portal, Menu, Button, Icon } from './components'
import { css } from '@emotion/css'
import { CustomEditor } from './CustomEditor'

export default function HoveringPopupToolbar() {
    const ref = useRef()
    const editor = useSlate()
    const inFocus = useFocused()

    useEffect(() => {
        const el = ref.current
        const { selection } = editor

        if (!el) {
            return
        }

        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ''
        ) {
            el.removeAttribute('style')
            return
        }

        const domSelection = window.getSelection()
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        el.style.opacity = '1'
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
        el.style.left = `${rect.left +
            window.pageXOffset -
            el.offsetWidth / 2 +
            rect.width / 2}px`
    })

    return (
        <Portal>
            <Menu
                ref={ref}
                className={css`
            padding: 8px 7px 6px;
            position: absolute;
            z-index: 1;
            top: -10000px;
            left: -10000px;
            margin-top: -6px;
            opacity: 0;
            background-color: #222;
            border-radius: 4px;
            transition: opacity 0.75s;
          `}
                onMouseDown={e => {
                    // prevent toolbar from taking focus away from editor
                    e.preventDefault()
                }}
            >
                <FormatButton type={'bold'} icon={'format_bold'} title={'ctrl+b'} />
                <FormatButton type={'italic'} icon={'format_italic'} title={'ctrl+i'} />
                <FormatButton type={'underline'} icon={'format_underline'} title={'ctrl+u'} />
            </Menu>
        </Portal>
    )
}


function FormatButton({ type, icon, title }) {
    const editor = useSlate()
    return (
      <Button
        reversed
        title={title}
        active={CustomEditor.isMarkActive(editor, type)}
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleFormat(editor, type)
        }}
  
      >
        <Icon icon={icon} />
      </Button >
    )
  }