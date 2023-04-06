import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Range,
  Element as SlateElement
} from 'slate'
import { useSlate, Slate, Editable, withReact, useFocused } from 'slate-react'
import { Portal, Menu, Button, Icon } from './components'
import { css } from '@emotion/css'
import styles from './slateEditor.module.css'

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']


const CustomEditor = {
  isMarkActive(editor, format) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  },

  isBlockActive(editor, format, blockType = 'type') {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    )

    return !!match
  },

  toggleMark(editor, format) {
    const isActive = this.isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  },

  toggleBlock(editor, type) {
    const isActive = this.isBlockActive(
      editor,
      type,
      TEXT_ALIGN_TYPES.includes(type) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(type)

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(type),
      split: true,
    })
    let newProperties
    if (TEXT_ALIGN_TYPES.includes(type)) {
      newProperties = {
        align: isActive ? undefined : type,
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : type,
      }
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: type, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  },

  toggleFormat(editor, format) {
    const isActive = this.isFormatActive(editor, format)
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true },
      { match: Text.isText, split: true }
    )
  },

  isFormatActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: n => n[format] === true,
      mode: 'all',
    })
    return !!match
  }
}


function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), [])
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem('content')) || [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    []
  )

  const [value, setValue] = useState(initialValue)


  const Element = ({ element, children, attributes }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
      case 'block-quote':
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        )
      case 'h1':
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        )
      case 'h2':
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        )
      case 'list-item':
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        )
      case 'numbered-list':
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        )
      case 'bulleted-list':
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        )
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        )
    }
  }

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
    if (leaf.code) {
      children = <code>{children}</code>
    }
    if (leaf.italic) {
      children = <em>{children}</em>
    }
    if (leaf.underline) {
      children = <u>{children}</u>
    }
    return <span {...attributes}>{children}</span>
  }

  return (
    <div className={css` 
    background: rgb(255, 255, 255);
    max-width: 100%;
    margin: 20px auto;
    padding: 20px;
    `}>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          setValue(newValue)
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Save the value to Local Storage
            const content = JSON.stringify(newValue)
            // localStorage.setItem('content', content)
          }
        }}>
        <HoveringToolbar />
        <Toolbar />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="請輸入文案..."
          renderPlaceholder={({ children, attributes }) => (
            <div {...attributes}>
              <p>{children}</p>
              <pre>
                Use the renderPlaceholder prop to customize the placeholder text.
              </pre>
            </div>
          )}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }

            event.preventDefault()
            switch (event.key) {
              case 'b': {
                CustomEditor.toggleMark(editor, 'bold')
                break
              }
              case 'i': {
                CustomEditor.toggleMark(editor, 'italic')
                break
              }
              case 'u': {
                CustomEditor.toggleMark(editor, 'underline')
                break
              }
              case '`': {
                CustomEditor.toggleMark(editor, 'code')
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
    </div>
  )
}

export default SlateEditor


function HoveringToolbar() {
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

function Toolbar() {
  return <div className={css` 
                position: relative;
                padding: 1px 18px 17px;
                margin: 0px -20px 20px;
                border-bottom: 2px solid rgb(238, 238, 238);
                &>*+*{
                  margin-left: 15px;
                }
                `}>
    {/* inline-block style */}
    <MarkButton type={'bold'} icon={'format_bold'} title={'ctrl+b'} />
    <MarkButton type={'italic'} icon={'format_italic'} title={'ctrl+i'} />
    <MarkButton type={'underline'} icon={'format_underline'} title={'ctrl+u'} />
    <MarkButton type={'code'} icon={'code'} title={'ctrl+`'} />
    {/* block style */}
    <BlockButton type={'h1'} icon={'looks_one'} />
    <BlockButton type={'h2'} icon={'looks_two'} />
    <BlockButton type={'numbered-list'} icon={'format_list_numbered'} />
    <BlockButton type={'bulleted-list'} icon={'format_list_bulleted'} />
    <BlockButton type={'block-quote'} icon={'format_quote'} />
    <BlockButton type={'left'} icon={'format_align_left'} />
    <BlockButton type={'center'} icon={'format_align_center'} />
    <BlockButton type={'right'} icon={'format_align_right'} />
    <BlockButton type={'justify'} icon={'format_align_justify'} />
  </div>
}

function FormatButton({ type, icon, title }) {
  const editor = useSlate()
  return (
    <Button
      reversed
      title={title}
      active={CustomEditor.isMarkActive(editor, type)}
      onMouseDown={(event) => {
        console.log('Clicked!!!!', event);

        event.preventDefault();
        CustomEditor.toggleFormat(editor, type)
      }}

    >
      <Icon icon={icon} />
    </Button >
  )
}

function MarkButton({ icon, type, title = '' }) {
  const editor = useSlate();
  return <Button
    title={title}
    active={CustomEditor.isMarkActive(editor, type)}
    onMouseDown={(event) => {
      event.preventDefault();
      CustomEditor.toggleMark(editor, type);
    }} >
    <Icon icon={icon} />
  </Button>
}

function BlockButton({ icon, type }) {
  const editor = useSlate();
  return <Button
    active={CustomEditor.isBlockActive(
      editor,
      type,
      TEXT_ALIGN_TYPES.includes(type) ? 'align' : 'type')}
    onMouseDown={(event) => {
      event.preventDefault();
      CustomEditor.toggleBlock(editor, type);
    }}
  >
    <Icon icon={icon} />
  </Button>
}

