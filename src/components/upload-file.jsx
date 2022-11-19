/* eslint-disable no-unused-vars */
import { Row, Upload } from "antd";
import { putEditDetailCandidateNotLoading } from "features/candidatesSlice";
import { fetchFiles, fetchPostFile } from "features/fileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "ultis/api";

const UploadFile = () => {
  const dispatch = useDispatch();
  const detailData = useSelector(state => state.candidates.detailData);
  const file = useSelector(state => state.file.file);
  const files = useSelector(state => state.file.files);
  console.log("files", files);
  useEffect(() => {
    dispatch(
      fetchFiles({
        obj_id: detailData.id,
        obj_table: "candidates",
      })
    );
  }, []);

  const test = [
    {
      created_at: "2022-11-19T06:59:56.555Z",
      ext: ".docx",
      id: "7ade7528-f1c9-48ba-8f9d-907d7c9a237f",
      mime_type:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      name: "CV-XIN-VIEC-FILE-WORD.docx",
      size: 158947,
      type: "",
      url: "https://lubrytics.com:8443/nadh-mediafile/file/7ade7528-f1c9-48ba-8f9d-907d7c9a237f",
    },
    {
      created_at: "2022-11-18T09:39:47.623Z",
      ext: ".jpg",
      id: "4d62dfc0-c6c9-49e5-b530-bc9cf757c400",
      mime_type: "image/jpeg",
      name: "Screenshot from 2022-10-25 10-20-31.png",
      size: 29670,
      type: "",
      //   thumbUrl:
      //     "https://lubrytics.com:8443/nadh-mediafile/file/4d62dfc0-c6c9-49e5-b530-bc9cf757c400",
      linkProps: '{"download": "image"}',
      url: "https://lubrytics.com:8443/nadh-mediafile/file/4d62dfc0-c6c9-49e5-b530-bc9cf757c400",
      status: "done",
    },
  ];

  //   const handleChange = async info => {
  //     if (info.file.status === "removed") {
  //       console.log(info);
  //       deleteFile(info.file.id);
  //     } else {
  //       let formData = new FormData();
  //       formData.append("file", info.file);
  //       formData.append("obj_table", "candidates");
  //       formData.append("obj_uid", detailData.id);
  //       formData.append("uploadedByUserId", 12);
  //       await dispatch(fetchPostFile(formData));
  //     }
  //     await dispatch(
  //       putEditDetailCandidateNotLoading({
  //         id: detailData.id,
  //         params: {
  //           mediafiles: {
  //             files: info.file.status === "removed" ? [] : [file.id],
  //           },
  //         },
  //       })
  //     );
  //     await dispatch(
  //       fetchFiles({
  //         obj_id: detailData.id,
  //         obj_table: "candidates",
  //       })
  //     );
  //   };

  //   const previewFile = file => {
  //     console.log(file);
  //     return true;
  //   };

  //   const onPreview = file => {
  //     console.log("file", file);
  //   };

  //   const itemRender = originNode => {
  //     return <>{originNode}</>;
  //   };

  //   const onDownload = file => {
  //     console.log(file);
  //   };

  return (
    <Row>
      {/* <Col span={4}> */}
      <Upload
        headers={{
          authorization: "authorization-text",
        }}
        name="file"
        // fileList={files}
        fileList={test}
        showUploadList={{
          showPreviewIcon: true,
          showDownloadIcon: true,
          showRemoveIcon: true,
        }}
        // itemRender={itemRender}
        listType="picture-card"
        className="avatar-uploader"
        action="https://lubrytics.com:8443/nadh-mediafile/file"
        beforeUpload={() => false}
        // onDownload={onDownload}
        // previewFile={previewFile}
        // onChange={handleChange}
        // onPreview={onPreview}
      >
        Upload
      </Upload>
      {/* </Col> */}
    </Row>
  );
};

export default UploadFile;
