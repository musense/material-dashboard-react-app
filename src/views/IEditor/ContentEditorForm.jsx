import React, { useImperativeHandle, useRef } from "react";
import SlateEditor from '../../components/SlateEditor/SlateEditor';

const ContentEditorForm = React.forwardRef(({
  newTitleRef,
  editorContentRef,
  initialValue,
  onEditorSave,
}, ref) => {
  console.log("🚀 ~ file: ContentEditorForm.jsx:45 ~ editorContentRef:", editorContentRef)
  console.log("🚀 ~ file: ContentEditorForm.jsx:45 ~ initialValue:", initialValue)


  useImperativeHandle(ref, () => {
    return {
      getFormData: (editor) => {

        const tData = new Map()
        if (editor) {
          const content = new Map()
          newTitleRef.current.value !== editor.content.title && (content.set('title', newTitleRef.current.value))
          JSON.stringify(editorContentRef.current) !== JSON.stringify(editor.content.content) && (content.set('content', editorContentRef.current))
          content.size !== 0 && tData.set('content', content)
          console.log("🚀 ~ file: index.jsx:145 ~ onEditorSave ~ content:", content)
        } else {
          const content = new Map()
          newTitleRef.current.value !== "" && content.set('title', newTitleRef.current.value)
          JSON.stringify(editorContentRef.current) !== JSON.stringify(initialValue) && content.set('content', editorContentRef.current)
          content.size !== 0 && tData.set('content', content)
        }
        return tData
      }
    }
  })
  const contentFormRef = useRef(null);
  return (
    <>
      <form ref={contentFormRef} onSubmit={onEditorSave}>
        <div className='iEditor-Title-Container'>
          <label htmlFor='title'>文章標題</label>
          <input
            ref={newTitleRef}
            name='title'
            id='content-editor-title'
            type='text'
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