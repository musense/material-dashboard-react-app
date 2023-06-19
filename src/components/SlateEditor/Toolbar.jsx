import React, { useEffect } from 'react'
import { useSlate, useSlateStatic } from 'slate-react'
import { Button, Icon } from './components'
import { css } from '@emotion/css'
import { CustomEditor, TEXT_ALIGN_TYPES } from './CustomEditor'

export default function Toolbar({
    handleClickOpen,
    currentUrl,
    currentAltText,
    currentHref
}) {
    return <div className={css` 
                  position: sticky;
                  top: 0;
                  display: flex;
                  flex-direction: row;
                  flex-wrap: wrap;
                  gap: 1rem;
                  padding-top: 0;
                  padding-bottom: 0.5rem;
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
        <BlockButton type={'h1'} icon={'looks_one'} title={'ctrl+1'} />
        <BlockButton type={'h2'} icon={'looks_two'} title={'ctrl+2'} />
        <BlockButton type={'h3'} icon={'looks_3'} title={'ctrl+3'} />
        <BlockButton type={'numbered-list'} icon={'format_list_numbered'} />
        <BlockButton type={'bulleted-list'} icon={'format_list_bulleted'} />
        <BlockButton type={'block-quote'} icon={'format_quote'} title={'ctrl+q'} />
        <BlockButton type={'left'} icon={'format_align_left'} title={'ctrl+shift+l'} />
        <BlockButton type={'center'} icon={'format_align_center'} title={'ctrl+shift+c'} />
        <BlockButton type={'right'} icon={'format_align_right'} title={'ctrl+shift+r'} />
        <BlockButton type={'justify'} icon={'format_align_justify'} title={'ctrl+shift+f'} />

        <ImageButton type={'image'} icon={'insert_photo'} title={'ctrl+shift+m'}

            handleClickOpen={handleClickOpen}
            currentHref={currentHref}
            currentUrl={currentUrl}
            currentAltText={currentAltText}
        />

        <AddLinkButton type={'link'} icon={'link'} title={'ctrl+h'} />
        <RemoveLinkButton type={'unlink'} icon={'link_off'} title={'ctrl+r'} />
        <ToggleEditableButton type={'button'} icon={'smart_button'} title={'ctrl+g'} />
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


function BlockButton({ icon, type, title = '' }) {
    const editor = useSlate();
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

function ImageButton({
    handleClickOpen,
    currentUrl,
    currentAltText,
    currentHref,
    title = ''
}) {

    const editor = useSlateStatic()

    useEffect(() => {
        console.log("🚀 ~ file: Toolbar.jsx:88 ~ ImageButton ~ currentUrl:", currentUrl)
        console.log("🚀 ~ file: Toolbar.jsx:89 ~ ImageButton ~ currentAltText:", currentAltText)
        console.log("🚀 ~ file: Toolbar.jsx:89 ~ ImageButton ~ currentHref:", currentHref)

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

function AddLinkButton({ icon, type, title }) {
    const editor = useSlate()
    return (
        <Button
            title={title}
            active={CustomEditor.isLinkActive(editor)}
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('請輸入超連結：')
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


function ToggleEditableButton({ icon, type, title = '' }) {
    const editor = useSlate()
    return (
        <Button
            title={title}
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
