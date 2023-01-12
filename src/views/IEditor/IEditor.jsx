import React from "react"; // useState
import { CKEditor, CKEditorContext } from "@ckeditor/ckeditor5-react";
// import Editor from "ckeditor5-custom-build/build/ckeditor";

// import Context from "@ckeditor/ckeditor5-core/src/context";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

const editorConfiguration = {
  toolbar: ["bold", "italic"],
};

function IEditor({ ...props }) {
  //   const [text, setText] = useState("I am editor!!!");
  return (
    <div className="App">
        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
            editor={ ClassicEditor }
            data="<p>Hello from CKEditor 5!</p>"
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log( 'Editor is ready to use!', editor );
            } }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
                console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                console.log( 'Focus.', editor );
            } }
        />
    </div>
);
}

export default IEditor;
