import { Form } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormCkeditor = ({ name, label, data, onChange }) => {
  return (
    <div>
      <Form.Item name={name} label={label}>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "blockQuote",
              "ckfinder",
              "|",
              "imageTextAlternative",
              "imageUpload",
              "imageStyle:full",
              "imageStyle:side",
              "|",
              "mediaEmbed",
              "insertTable",
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "|",
              "undo",
              "redo",
            ],
          }}
          onChange={onChange}
        />
      </Form.Item>
    </div>
  );
};

export default FormCkeditor;
