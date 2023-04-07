import React, { useMemo, useCallback } from 'react'
import {
  Transforms,
  createEditor
} from 'slate'
import {
  Slate,
  Editable,
  useSlateStatic,
  useSelected,
  withReact,
  useFocused,
  ReactEditor,
} from 'slate-react'
import { withHistory } from 'slate-history'
import { Button, Icon } from './components'
import { css } from '@emotion/css'
import InlineChromiumBugfix, { CustomEditor } from './CustomEditor'
import HoveringToolbar from "./HoveringToolbar";
import Toolbar from "./Toolbar";
import "./SlateEditor.module.css";

function SlateEditor({ editorContentRef }) {
  const editor = useMemo(() => CustomEditor.withInlines(
    CustomEditor.withImages(
      withHistory(
        withReact(createEditor())
      )
    )
  ), [])
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  // const initialValue = useMemo(
  //   () =>
  //   JSON.parse(localStorage.getItem('content')) || [
  //     {
  //       type: 'paragraph',
  //       children: [{ text: '' }],
  //     },
  //   ],
  //   []
  //   )
  //   const editorContentRef = React.useRef(initialValue)
  // const [value, setValue] = useState(initialValue)

  const Link = ({ attributes, children, element }) => {
    const selected = useSelected()
    return (
      <a
        {...attributes}
        href={element.url}
        className={
          selected
            ? css`
                text-decoration: underline;
                &:hover{
                  text-decoration: underline;
                }
              `
            : ''
        }
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
    )
  }

  const EditableButton = ({ attributes, children }) => {
    return (
      /*
        Note that this is not a true button, but a span with button-like CSS.
        True buttons are display:inline-block, but Chrome and Safari
        have a bad bug with display:inline-block inside contenteditable:
        - https://bugs.webkit.org/show_bug.cgi?id=105898
        - https://bugs.chromium.org/p/chromium/issues/detail?id=1088403
        Worse, one cannot override the display property: https://github.com/w3c/csswg-drafts/issues/3226
        The only current workaround is to emulate the appearance of a display:inline button using CSS.
      */
      <span
        {...attributes}
        onClick={ev => ev.preventDefault()}
        // Margin is necessary to clearly show the cursor adjacent to the button
        className={css`
          margin: 0 0.1em;
          background-color: #efefef;
          padding: 2px 6px;
          border: 1px solid #767676;
          border-radius: 2px;
          font-size: 0.9em;
        `}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </span>
    )
  }

  const Badge = ({ attributes, children }) => {
    const selected = useSelected()

    return (
      <span
        {...attributes}
        contentEditable={false}
        className={css`
        background-color: green;
        color: white;
        padding: 2px 6px;
        border-radius: 2px;
        font-size: 0.9em;
        ${selected && 'box-shadow: 0 0 0 3px #ddd;'}
      `}
        data-playwright-selected={selected}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </span>
    )
  }

  const Image = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)

    const selected = useSelected()
    const focused = useFocused()
    return (
      <div {...attributes}>
        {children}
        <div
          contentEditable={false}
          className={css`
            position: relative;
          `}
        >
          <img
            src={element.url}
            className={css`
              display: block;
              max-width: 100%;
              max-height: 20em;
              box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
            `}
          />
          <Button
            active
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={css`
              display: ${selected && focused ? 'inline' : 'none'};
              position: absolute;
              top: 0.5em;
              left: 0.5em;
              background-color: white;
            `}
          >
            <Icon icon={'delete'} />
          </Button>
        </div>
      </div>
    )
  }
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
      case 'image':
        return <Image
          element={element}
          attributes={attributes}
          children={children}
        />
      case 'link':
        return <Link
          element={element}
          attributes={attributes}
          children={children} />
      case 'button':
        return <EditableButton
          attributes={attributes}
          children={children} />
      case 'badge':
        return <Badge
          attributes={attributes}
          children={children} />
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
    margin-top: 20px;
    padding-top: 20px;
    `}>
      <Slate
        editor={editor}
        value={editorContentRef.current}
        onChange={newValue => {
          editorContentRef.current = newValue
          console.log(editorContentRef.current);
          // const isAstChange = editor.operations.some(
          //   op => 'set_selection' !== op.type
          // )
          // if (isAstChange) {
            // Save the value to Local Storage
            // const content = JSON.stringify(newValue)
            // localStorage.setItem('content', content)
          // }
        }}>
        <HoveringToolbar />
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
          // renderPlaceholder={({ children, attributes }) => (
          //   <div {...attributes}>
          //     <p>{children}</p>
          //     <pre>
          //       Use the renderPlaceholder prop to customize the placeholder text.
          //     </pre>
          //   </div>
          // )}
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
              case 'l': {
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                CustomEditor.insertLink(editor, url)
                break
              }
              case 'r': {
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











