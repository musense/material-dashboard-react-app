import React, { useEffect } from 'react'
import { useSlate, useSlateStatic } from 'slate-react'
import { Button, Icon } from './components'
import { css } from '@emotion/css'
import { CustomEditor, TEXT_ALIGN_TYPES } from './CustomEditor'

export default function Toolbar({ handleClickOpen, currentUrl, currentAltText }) {
    return <div className={css` 
                  position: sticky;
                  top: 0;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  gap: 1rem;
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                  margin-bottom: 1rem;
                  border-bottom: 2px solid rgb(238, 238, 238);
                  background-color: white;
                  z-index: 1;
                  `}>
        {/* inline-block style */}
        <MarkButton type={'bold'} icon={'format_bold'} title={'ctrl+b'} />
        <MarkButton type={'italic'} icon={'format_italic'} title={'ctrl+i'} />
        <MarkButton type={'underline'} icon={'format_underline'} title={'ctrl+u'} />
        <MarkButton type={'code'} icon={'code'} title={'ctrl+`'} />
        {/* block style */}
        <BlockButton type={'h1'} icon={'looks_one'} />
        <BlockButton type={'h2'} icon={'looks_two'} />
        <BlockButton type={'h3'} icon={'looks_3'} />
        <BlockButton type={'numbered-list'} icon={'format_list_numbered'} />
        <BlockButton type={'bulleted-list'} icon={'format_list_bulleted'} />
        <BlockButton type={'block-quote'} icon={'format_quote'} />
        <BlockButton type={'left'} icon={'format_align_left'} />
        <BlockButton type={'center'} icon={'format_align_center'} />
        <BlockButton type={'right'} icon={'format_align_right'} />
        <BlockButton type={'justify'} icon={'format_align_justify'} />

        <ImageButton type={'image'} icon={'insert_photo'}
            handleClickOpen={handleClickOpen}

            currentUrl={currentUrl}
            currentAltText={currentAltText}
        />

        <AddLinkButton type={'link'} icon={'link'} title={'ctrl+l'} />
        <RemoveLinkButton type={'unlink'} icon={'link_off'} title={'ctrl+r'} />
        <ToggleEditableButton type={'button'} icon={'smart_button'} />
    </div>
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

function ImageButton({ handleClickOpen, currentUrl, currentAltText }) {

    const editor = useSlateStatic()

    useEffect(() => {
        console.log("🚀 ~ file: Toolbar.jsx:88 ~ ImageButton ~ currentUrl:", currentUrl)
        console.log("🚀 ~ file: Toolbar.jsx:89 ~ ImageButton ~ currentAltText:", currentAltText)
 
        if (currentUrl) {
            CustomEditor.insertImage(editor, currentUrl, currentAltText)
        }
    }, [currentUrl, currentAltText]);
    
    return (
        <Button
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

function AddLinkButton({ icon, type, title }) {
    const editor = useSlate()
    return (
        <Button
            title={title}
            active={CustomEditor.isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the link:')
                if (!url) return
                CustomEditor.insertLink(editor, url)
            }}
        >
            {/* icon=link */}
            <Icon icon={icon} />
        </Button>
    )
}

function RemoveLinkButton({ icon, type, title }) {
    const editor = useSlate()

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


function ToggleEditableButton({ icon, type }) {
    const editor = useSlate()
    return (
        <Button
            active
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
