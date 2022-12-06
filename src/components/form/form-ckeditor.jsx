import { Form } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { imgPath } from "ultis/const";
import { postFile } from "ultis/api";

const FormCkeditor = ({ name, label, data, onFocus, ...props }) => {
  const config = {
    // toolbar: [
    //   "heading",
    //   "|",
    //   "bold",
    //   "italic",
    //   "link",
    //   "bulletedList",
    //   "numberedList",
    //   "blockQuote",
    //   "ckfinder",
    //   "|",
    //   "imageTextAlternative",
    //   "imageUpload",
    //   "imageStyle:full",
    //   "imageStyle:side",
    //   "|",
    //   "mediaEmbed",
    //   "insertTable",
    //   "tableColumn",
    //   "tableRow",
    //   "mergeTableCells",
    //   "|",
    //   "undo",
    //   "redo",
    // ],
    simpleUpload: {
      uploadUrl: "https://example.com/...",
      headers: {
        "X-CSRF-TOKEN": "CSRF-Token",
        Authorization: "Bearer <JSON Web Token>",
      },
      withCredentials: true,
    },
    extraPlugins: [uploadPlugin],
  };

  function uploadAdapter(loader) {
    return {
      upload: async () => {
        const body = new FormData();
        const file = await loader.file;
        body.append("upload", file);
        const { id } = await postFile(body);
        return { default: imgPath(id) };
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
      return uploadAdapter(loader);
    };
  }

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
        onFocus={onFocus}
        {...props}
      />
    </Form.Item>
  );
};

export default FormCkeditor;
