import React from "react";
import SlateEditor from '../../components/SlateEditor/SlateEditor';

export default function ContentEditorForm({
  newTitleRef,
  editorContentRef
}) {

  return (
    <>
      <div className='iEditor-Title-Container'>
        <label htmlFor='title'>文章標題</label>
        <input
          ref={newTitleRef}
          name='title'
          type='text'
        />
      </div>
      <SlateEditor
        editorContentRef={editorContentRef}
      />
    </>
  );
}