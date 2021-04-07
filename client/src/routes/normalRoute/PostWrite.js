import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Progress,
} from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import { editorConfiguration } from '../../components/editor/EditorConfig';
// import MyInit from '../../components/editor/UploadAdapter';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [form, setValues] = useState({ title: '', contents: '', fileUrl: '' });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getDataFromCKEditor = (event, editor) => {
    console.log('editor - event', event);
    console.log('editor - editor', editor);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { title, contents, fileUrl, category } = form;
  };

  return (
    <div>
      {isAuthenticated ? (
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-3">
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="category">Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="form-control"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="contents">Content</Label>
            {/* <CKEditor
              // editor={ClassicEditor}
              editor={DecoupledEditor}
              config={editorConfiguration}
              onReady={MyInit}
              onBlur={getDataFromCKEditor}
            ></CKEditor> */}

            <CKEditor
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor);

                // Insert the toolbar before the editable area.
                editor.ui
                  .getEditableElement()
                  .parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                  );

                // this.editor = editor;
              }}
              onError={({ willEditorRestart }) => {
                // If the editor is restarted, the toolbar element will be created once again.
                // The `onReady` callback will be called again and the new toolbar will be added.
                // This is why you need to remove the older toolbar.
                if (willEditorRestart) {
                  // this.editor.ui.view.toolbar.element.remove();
                }
              }}
              onChange={(event, editor) => console.log({ event, editor })}
              editor={DecoupledEditor}
              data="<p>Hello from CKEditor 5's decoupled editor!</p>"
              onBlur={getDataFromCKEditor}
              // config={/* the editor configuration */}
            />

            <Button
              color="success"
              className="mt-3 col-md-2 offset-md-10 mb-3"
              block
            >
              제출하기
            </Button>
          </FormGroup>
        </Form>
      ) : (
        <Col width={50} className="p-5 m-5">
          <Progress animated color="info" value={100}></Progress>
        </Col>
      )}
    </div>
  );
};

export default PostWrite;
