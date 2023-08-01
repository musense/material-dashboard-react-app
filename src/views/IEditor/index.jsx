import React from 'react';
import { useSelector } from 'react-redux';
import ContentEditorForm from "./ContentEditorForm.jsx"
import DetailForm from "./DetailForm/DetailForm.jsx"
import MessageDialog from '../../components/Modal/MessageDialog.jsx';

import useIEditorResult from '../../hook/useIEditorResult.js';
import useSetEditorDefaultValue from '../../hook/useSetEditorDefaultValue.js';
import usePreview from '../../hook/usePreview.js';
import useEditorModal from '../../hook/useEditorModal.js';
import useEditorSave from '../../hook/useEditorSave.js';
import useBeforeUnloadSave from '../../hook/useBeforeUnloadSave.js';

function NewIEditor() {

  useSetEditorDefaultValue()

  const submitState = useSelector((state) => state.getSlateReducer.submitState);
  const isPreview = useSelector((state) => state.getSlateReducer.isPreview);
  const returnMessage = useSelector((state) => state.getSlateReducer.errorMessage);
  const id = useSelector((state) => state.getEditorReducer._id);
  const errorMessage = useSelector((state) => state.getEditorReducer.errorMessage);
  const previewID = useSelector((state) => state.getSlateReducer.previewID);
  const message = getErrorMessage(errorMessage, returnMessage)

  function getErrorMessage(errorMessage, returnMessage) {
    console.log("🚀 ~ file: index.jsx:40 ~ getErrorMessage ~ returnMessage:", returnMessage)
    console.log("🚀 ~ file: index.jsx:40 ~ getErrorMessage ~ errorMessage:", errorMessage)
    if (errorMessage) {
      return errorMessage;
    }
    if (returnMessage) {
      return returnMessage;
    }
    return null;

  }

  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ editor:", submitState)
  console.log("🚀 ~ file: index.jsx:35 ~ NewIEditor ~ message:", message)


  const {
    title,
    content,
    sitemapUrl,
    success
  } = useIEditorResult(message, submitState)

  const {
    open,
    handleClose
  } = useEditorModal(title)

  usePreview(previewID, isPreview)
  useEditorSave(message, submitState, isPreview)
  const { onEditorSave } = useEditorSave(message, submitState, isPreview)
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

