import React from 'react'
import { css } from '@emotion/css'
import {
    MarkButton,
    BlockButton,
    TableButton,
    ImageButton,
    AddLinkButton,
    RemoveLinkButton,
    ToggleEditableButton
} from './ButtonComponents'
import { useSlate, useSlateStatic } from 'slate-react'
import TableContextMenu from './TableContextMenu/TableContextMenu'

export default function Toolbar({
    handleClickOpen,
    currentUrl,
    currentAltText,
    currentHref
}) {
    const editor = useSlate()
    const editorStatic = useSlateStatic()
    const style = css` 
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
    `
    return <>
        <div className={style}>
            {/* inline-block style */}
            <MarkButton editor={editor} type={'bold'} icon={'bold'} title={'黑體 ctrl+b'} />
            <MarkButton editor={editor} type={'italic'} icon={'italic'} title={'斜體 ctrl+i'} />
            <MarkButton editor={editor} type={'underline'} icon={'underline'} title={'底線 ctrl+u'} />
            <MarkButton editor={editor} type={'code'} icon={'code'} title={'等寬字型 ctrl+`'} />
            <MarkButton editor={editor} type={'hide'} icon={'hide'} title={'隱藏文字 ctrl+shift+x'} />
            {/* block style */}
            <BlockButton editor={editor} type={'h1'} icon={'headingOne'} title={'標題1 ctrl+1'} />
            <BlockButton editor={editor} type={'h2'} icon={'headingTwo'} title={'標題2 ctrl+2'} />
            <BlockButton editor={editor} type={'h3'} icon={'headingThree'} title={'標題3 ctrl+3'} />
            <BlockButton editor={editor} type={'numbered-list'} icon={'orderedList'} title={'編號列表 ctrl+Enter'} />
            <BlockButton editor={editor} type={'bulleted-list'} icon={'unorderedList'} title={'列表 shift+Enter'} />
            <TableButton editor={editor} type={'table'} icon={'table'} title={'表格 ctrl+shift+t'} />
            <BlockButton editor={editor} type={'block-quote'} icon={'blockquote'} title={'引用 ctrl+q'} />
            <BlockButton editor={editor} type={'left'} icon={'alignLeft'} title={'文字置左 ctrl+shift+l'} />
            <BlockButton editor={editor} type={'center'} icon={'alignCenter'} title={'文字置中 ctrl+shift+c'} />
            <BlockButton editor={editor} type={'right'} icon={'alignRight'} title={'文字置右 ctrl+shift+r'} />
            <BlockButton editor={editor} type={'justify'} icon={'alignJustify'} title={'分散對齊 ctrl+shift+f'} />

            <ImageButton editor={editorStatic} type={'image'} icon={'image'} title={'插入圖片 ctrl+shift+m'}

                handleClickOpen={handleClickOpen}
                currentHref={currentHref}
                currentUrl={currentUrl}
                currentAltText={currentAltText}
            />

            <AddLinkButton editor={editor} type={'link'} icon={'link'} title={'插入連結 ctrl+h'} />
            <RemoveLinkButton editor={editor} type={'unlink'} icon={'linkOff'} title={'移除連結 ctrl+r'} />
            <ToggleEditableButton editor={editor} type={'button'} icon={'smartButton'} title={'插入文字按鈕 ctrl+g'} />


            <TableContextMenu editor={editor} />
        </div>
    </>
}