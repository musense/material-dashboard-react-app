import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import SlateEditor from '../../components/SlateEditor/SlateEditor';

const ContentEditorForm = React.forwardRef(({
  editor,
  onEditorSave,
}, ref) => {
  // console.log("🚀 ~ file: ContentEditorForm.jsx:85 ~ editor:", editor)
  // console.log("🚀 ~ file: ContentEditorForm.jsx:45 ~ editorContentRef:", editorContentRef)
  // console.log("🚀 ~ file: ContentEditorForm.jsx:45 ~ initialValue:", initialValue)


  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  const [newTitleRef, setNewTitleRef] = useState('');
  const editorContentRef = useRef(initialValue)

  useEffect(() => {
    if (!editor) return
    const { content } = editor
    if (content && content.title) {
      setNewTitleRef(content.title)
    }


  }, [editor]);
  //*  set default value for ContentEditorForm
  const setContentDefaultValue = (editor) => {
    if (!editor) return
    const { content } = editor
    if (content && content.content) {
      editorContentRef.current = content.content
    }
  }

  setContentDefaultValue(editor)

  useImperativeHandle(ref, () => {
    return {
      getFormData: (editor) => {

        const tData = new Map()
        console.log("🚀 ~ file: ContentEditorForm.jsx:51 ~ useImperativeHandle ~ newTitleRef:", newTitleRef)
        if (editor) {
          const content = new Map()
          newTitleRef !== editor.content.title && (content.set('title', newTitleRef))
          JSON.stringify(editorContentRef.current) !== JSON.stringify(editor.content.content) && (content.set('content', editorContentRef.current))
          content.size !== 0 && tData.set('content', content)
          console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ content:", content)
        } else {
          const content = new Map()
          newTitleRef !== "" && content.set('title', newTitleRef)
          JSON.stringify(editorContentRef.current) !== JSON.stringify(initialValue) && content.set('content', editorContentRef.current)
          content.size !== 0 && tData.set('content', content)
        }
        console.log("🚀 ~ file: ContentEditorForm.jsx:62 ~ useImperativeHandle ~ tData:", tData)
        return tData
      },
    }
  })
  const contentFormRef = useRef(null);
  return (
    <>
      <form ref={contentFormRef} onSubmit={onEditorSave}>
        <div className='iEditor-Title-Container'>
          <label htmlFor='title'>文章標題</label>
          <input
            name='title'
            id='content-editor-title'
            type='text'
            value={newTitleRef}
            onChange={e => setNewTitleRef(e.target.value)}
          />
        </div>
        <SlateEditor
          editorContentRef={editorContentRef}
        />
      </form>
    </>
  );
})



export default ContentEditorForm;