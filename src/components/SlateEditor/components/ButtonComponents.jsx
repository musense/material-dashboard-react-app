import React, { useEffect } from 'react'
import Button from './Button'
import { CustomEditor, TEXT_ALIGN_TYPES } from '../utils/CustomEditor'
import TableSelector from '../Table/TableSelector';
import Icon from '../../../views/Icons/Icon';
import ColorPicker from '../ColorPicker/ColorPicker';
import CodeToTextButton from '../CodeToText/CodeToTextButton';
import Id from '../ID/Id';

function MarkButton({ editor, icon, type, title = '' }) {
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

function BlockButton({ editor, icon, type, title = '' }) {
    return <Button
        title={title}
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

function TableButton({ editor, title }) {
    return <TableSelector
        editor={editor}
        title={title}
    />
}

function ColorPickerButton({ editor, format, title }) {
    return <ColorPicker format={format} title={title} editor={editor} />
}

function HTMLCodeButton({ handleCodeToText, title }) {
    return <CodeToTextButton handleButtonClick={handleCodeToText} title={title} />
}

function InsertIdButton({ editor, title }) {
    return <Id editor={editor} title={title} />
}
function ImageButton({ editor,
    handleClickOpen,
    currentUrl,
    currentAltText,
    currentHref,
    title = ''
}) {

    useEffect(() => {
        if (currentUrl) {
            CustomEditor.insertImage(editor, currentUrl, currentAltText, currentHref)
        }
    }, [currentUrl, currentAltText]);

    return (
        <Button
            title={title}
            onMouseDown={event => {
                event.preventDefault()
                handleClickOpen()
                //! fail at this point, the ext should not be part of the url
                // if (url && !CustomEditor.isImageUrl(url)) {
                //   alert('URL is not an image')
                //   return
                // }
            }}
        >
            <Icon icon={'image'} />
        </Button>
    )
}

function AddLinkButton({ editor, icon, type, title }) {
    return (
        <Button
            title={title}
            active={CustomEditor.isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault()

                const { selection } = editor
                const allTextArray = editor.children
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
                CustomEditor.insertLink(editor, url)
            }}
        >
            {/* icon=link */}
            <Icon icon={icon} />
        </Button>
    )
}

function RemoveLinkButton({ editor, icon, type, title }) {
    return (
        <Button
            title={title}
            active={CustomEditor.isLinkActive(editor)}
            onMouseDown={event => {
                if (CustomEditor.isLinkActive(editor)) {
                    CustomEditor.unwrapLink(editor)
                }
            }}
        >
            {/* icon=link_off */}
            <Icon icon={icon} />
        </Button>
    )
}


function ToggleEditableButton({ editor, icon, type, title = '' }) {
    return (
        <Button
            title={title}
            active={CustomEditor.isButtonActive(editor)}
            onMouseDown={event => {
                event.preventDefault()
                if (CustomEditor.isButtonActive(editor)) {
                    CustomEditor.unwrapButton(editor)
                } else {
                    CustomEditor.insertButton(editor)
                }
            }}
        >
            {/* icon=smart_button */}
            <Icon icon={icon} />
        </Button>
    )
}

export {
    MarkButton,
    BlockButton,
    TableButton,
    ColorPickerButton,
    HTMLCodeButton,
    InsertIdButton,
    ImageButton,
    AddLinkButton,
    RemoveLinkButton,
    ToggleEditableButton
}