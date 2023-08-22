import React from "react";
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import {
    Editor,
    Transforms,
    Text,
    Range,
    Element as SlateElement
} from 'slate'
import { css } from '@emotion/css'

const LIST_TYPES = ['numbered-list', 'bulleted-list']
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export const CustomEditor = {


    addMarkData(editor, data) {
        Editor.addMark(editor, data.format, data.value)
    },

    activeMark(editor, format) {
        const defaultMarkData = {
            color: 'black',
            bgColor: 'black',
            fontSize: 'normal',
            fontFamily: 'sans'
        }
        const marks = Editor.marks(editor);
        const defaultValue = defaultMarkData[format];
        return marks?.[format] ?? defaultValue;
    },

    isMarkActive(editor, format) {
        const marks = Editor.marks(editor)
        if (!marks) return false
        if (marks[format] === false) return false
        return marks[format]
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

    //! would be removed
    resetBlockAndNewLine(editor, type) {
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
            const paragraph = { type: 'paragraph', children: [] }
            Transforms.wrapNodes(editor, paragraph)
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
    },


    isImageUrl(url) {
        if (!url) return false
        if (!isUrl(url)) return false
        const ext = new URL(url).pathname.split('.').pop()
        //! fail at this point, the ext should not be part of the url
        return imageExtensions.includes(ext)
    },

    insertImage(editor, url, alt, href) {
        const text = { text: '' }
        const image = { type: 'image', url, alt, href, children: [text] }
        Transforms.insertNodes(editor, image)
    },

    withImages(editor) {
        const { insertData, isVoid } = editor

        editor.isVoid = element => {
            return element.type === 'image' ? true : isVoid(element)
        }

        editor.insertData = data => {
            const text = data.getData('text/plain')
            const { files } = data

            if (files && files.length > 0) {
                for (const file of files) {
                    const reader = new FileReader()
                    const [mime] = file.type.split('/')

                    if (mime === 'image') {
                        reader.addEventListener('load', () => {
                            const url = reader.result
                            this.insertImage(editor, url)
                        })

                        reader.readAsDataURL(file)
                    }
                }
            } else if (this.isImageUrl(text)) {
                this.insertImage(editor, text)
            } else {
                insertData(data)
            }
        }

        return editor
    },

    withInlines(editor) {
        const {
            insertData,
            insertText,
            isInline,
            isElementReadOnly,
            isSelectable,
        } = editor

        editor.isInline = element =>
            ['link', 'button', 'badge'].includes(element.type) || isInline(element)

        editor.isElementReadOnly = element =>
            element.type === 'badge' || isElementReadOnly(element)

        editor.isSelectable = element =>
            element.type !== 'badge' && isSelectable(element)

        editor.insertText = text => {
            if (text && isUrl(text)) {
                this.wrapLink(editor, text)
            } else {
                insertText(text)
            }
        }

        editor.insertData = data => {
            const text = data.getData('text/plain')

            if (text && isUrl(text)) {
                this.wrapLink(editor, text)
            } else {
                insertData(data)
            }
        }

        return editor
    },

    insertLink(editor, url) {
        if (editor.selection) {
            this.wrapLink(editor, url)
        }
    },

    insertButton(editor) {
        if (editor.selection) {
            this.wrapButton(editor)
        }
    },

    isLinkActive(editor) {
        const [link] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
        return !!link
    },

    isButtonActive(editor) {
        const [button] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
        })
        return !!button
    },
    unwrapLink(editor) {
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
    },

    unwrapButton(editor) {
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'button',
        })
    },

    wrapLink(editor, url) {
        if (this.isLinkActive(editor)) {
            this.unwrapLink(editor)
        }

        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const link = {
            type: 'link',
            url,
            children: isCollapsed ? [{ text: url }] : [],
        }

        if (isCollapsed) {
            Transforms.insertNodes(editor, link)
        } else {
            Transforms.wrapNodes(editor, link, { split: true })
            Transforms.collapse(editor, { edge: 'end' })
        }
    },

    wrapButton(editor) {
        if (this.isButtonActive(editor)) {
            this.unwrapButton(editor)
        }

        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const button = {
            type: 'button',
            children: isCollapsed ? [{ text: 'Edit me!' }] : [],
        }

        if (isCollapsed) {
            Transforms.insertNodes(editor, button)
        } else {
            Transforms.wrapNodes(editor, button, { split: true })
            Transforms.collapse(editor, { edge: 'end' })
        }
    },
    getSingleParagraphText(allTextArray, selection) {
        const anchorOffset = selection.anchor.offset
        const anchorPath = selection.anchor.path[0]
        const focusOffset = selection.focus.offset
        const focusText = allTextArray[anchorPath].children[0].text

        const selectedText =
            anchorOffset <= focusOffset
                ? focusText.slice(anchorOffset, focusOffset)
                : focusText.slice(focusOffset, anchorOffset)
        return selectedText
    },
    getMultiParagraphText(allTextArray, selection) {
        const anchorPath = selection.anchor.path[0]
        const focusPath = selection.focus.path[0]

        let selectedText
        let startOffset,
            startPath,
            endOffset,
            endPath


        if (anchorPath < focusPath) {
            startOffset = selection.anchor.offset
            startPath = anchorPath
            endOffset = selection.focus.offset
            endPath = focusPath
        } else {
            startOffset = selection.focus.offset
            startPath = focusPath
            endOffset = selection.anchor.offset
            endPath = anchorPath
        }

        selectedText =
            [allTextArray[startPath].children[0].text.slice(startOffset, allTextArray[startPath].children[0].text.length),
            allTextArray[endPath].children[0].text.slice(0, endOffset)
            ]
        for (let i = startPath + 1; i < endPath; i++) {
            selectedText.splice(1, 0, allTextArray[startPath].children[0].text)
        }
        return selectedText.join()
    },
}


export default function InlineChromiumBugfix() {
    return (<span
        contentEditable={false}
        className={css`
        font-size: 0;
      `}
    >
        ${String.fromCodePoint(160) /* Non-breaking space */}
    </span>)
}