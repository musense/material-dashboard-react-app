import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useEffect, useState } from "react"; // useState
// import Editor from "ckeditor5-custom-build/build/ckeditor";

// import Context from "@ckeditor/ckeditor5-core/src/context";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import { useDispatch, useSelector } from "react-redux";
import { REQUEST_EDITOR_BY_TITLE } from "../../actions/GetEditorAction";
// import queryString from 'query-string'

// const editorConfiguration = {
//   toolbar: ["bold", "italic"],
// };

function IEditor({ ...props }) {
  const params = new URLSearchParams(props.location.search);
  const dispatch = useDispatch();
  const id = params.get("id");

  const title = useSelector((state) => state.getEditorReducer.title);
  const content = useSelector((state) => state.getEditorReducer.content);

  const [data, setData] = useState(null);

  function handleUpdateData() {
    console.log(`handleUpdateData data: ${data}`);

    // const title =''
    // const content =''
    // dispatch({
    //   type: REQUEST_EDITOR_BY_TITLE,
    //   payload: {
    //     id,
    //   },
    // });
  }

  const setDataContent = `<h1>${title}</h1>${content}`;

  useEffect(() => {
    console.group("IEditor useEffect data");
    console.log(`IEditor id: ${id}`);
    console.log(`IEditor data: ${data}`);
    console.groupEnd("IEditor useEffect data");
    console.log(`IEditor useEffect id: ${id}`);

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
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
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
    </div>
  );
}

export default IEditor;
