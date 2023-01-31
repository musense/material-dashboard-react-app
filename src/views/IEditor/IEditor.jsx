import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { REQUEST_EDITOR_BY_TITLE } from "../../actions/GetEditorAction";
import { useParams, useNavigate } from "react-router-dom";

function IEditor({ props }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = useSelector((state) => state.getEditorReducer.title);
  const content = useSelector((state) => state.getEditorReducer.content);

  const [data, setData] = useState(null);
  function handleUpdateData() {
    if (data === null) {
      console.log(`nothing to update!!!`);
      return;
    }
    console.group(`handleUpdateData`);
    console.log(id);
    console.log(data);
    console.groupEnd(`handleUpdateData`);
    // dispatch({
    //   type: UPDATE_EDITOR,
    //   payload: {
    //     id,
    //     data,
    //   },
    // });
  }
  function handleGoBack() {
    setData(null);
    navigate(-1);
  }

  const setDataContent = `<h1>${title}</h1>${content}`;

  useEffect(() => {
    dispatch({
      type: REQUEST_EDITOR_BY_TITLE,
      payload: {
        id,
      },
    });
  }, [id]);
  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      {setDataContent ? (
        <CKEditor
          editor={ClassicEditor}
          data={setDataContent}
          onReady={( editor) => {
            // console.log(editor);
            // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
            // console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
          }}
        />
      ) : null}
      <button onClick={() => handleUpdateData()}>Update Data</button>
      <button onClick={() => handleGoBack()}>Go Back</button>
    </div>
  );
}

export default IEditor;
