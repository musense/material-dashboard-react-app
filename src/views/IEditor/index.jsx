import React from 'react';
import { useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import MessageDialog from 'components/Modal/MessageDialog.jsx';

import useModalResult from 'hook/useModalResult';
import useSetEditorDefaultValue from 'hook/useSetEditorDefaultValue.js';
import usePreview from 'hook/usePreview.js';
import useEditorModal from 'hook/useEditorModal.js';
import useEditorSave from 'hook/useEditorSave.js';
import useBeforeUnloadSave from 'hook/useBeforeUnloadSave.js';
import getErrorMessage from 'utils/getErrorMessage.js';

function NewIEditor() {

  useSetEditorDefaultValue()

  const editor = useSelector((state) => state.getEditorReducer.editor);

  const submitState = useSelector((state) => state.getSlateReducer.submitState);
  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const id = useSelector((state) => state.getEditorReducer._id);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  const message = getErrorMessage(errorMessage, returnMessage)



  const {
    title,
    content,
    sitemapUrl,
    success
  } = useModalResult({
    message,
    name: '文章',
    data: editor,
    isEditor: true
  })

  const {
    open,
    handleClose
  } = useEditorModal(title)

  usePreview(previewID, isPreview)
  useEditorSave(message, submitState, isPreview)
  // useBeforeUnloadSave(onEditorSave)

  return (
    <div className={'container'}>
      <div className={'wrapper'}>
        <div className={'left-side'}>
          <ContentEditorForm />
        </div>
        <div className={'right-side'}>
          <DetailForm
            createType={'add_new'} />
        </div>
      </div>
      <MessageDialog
        dialogTitle={title}
        dialogContent={content}
        editorID={id}
        sitemapUrl={sitemapUrl}
        success={success}
        open={open}
        setClose={handleClose}
        editor={true}
      />
    </div>
  );
}

export default NewIEditor;

