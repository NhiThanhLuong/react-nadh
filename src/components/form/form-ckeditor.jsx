import { Form } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const FormCkeditor = ({ name, label, data, onChange, onFocus, ...props }) => {
  const config = {
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
  };

  return (
    <Form.Item
      name={name}
      label={label}
      getValueFromEvent={(_, editor) => editor.getData()}
    >
      <CKEditor
        editor={ClassicEditor}
        data={data}
        config={config}
        onChange={onChange}
        onFocus={onFocus}
        {...props}
      />
    </Form.Item>
  );
};

export default FormCkeditor;
