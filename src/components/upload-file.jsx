/* eslint-disable no-unused-vars */
import { Row, Upload } from "antd";
import { putEditDetailCandidateNotLoading } from "features/candidatesSlice";
import { fetchFiles, fetchPostFile } from "features/fileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile } from "ultis/api";
import axiosClient from "ultis/axios";
import { URL_FILE } from "ultis/const";

const UploadFile = () => {
  const dispatch = useDispatch();
  const detailData = useSelector(state => state.candidates.detailData);
  const file = useSelector(state => state.file.file);
  const files = useSelector(state => state.file.files);
  useEffect(() => {
    dispatch(
      fetchFiles({
        obj_id: detailData.id,
        obj_table: "candidates",
      })
    );
  }, []);

  const handleChange = async info => {
    if (info.file.status === "removed") {
      console.log(info);
      deleteFile(info.file.id);
    } else {
      let formData = new FormData();
      formData.append("file", info.file);
      formData.append("obj_table", "candidates");
      formData.append("obj_uid", detailData.id);
      formData.append("uploadedByUserId", 12);
      await dispatch(fetchPostFile(formData));
    }
    await dispatch(
      putEditDetailCandidateNotLoading({
        id: detailData.id,
        params: {
          mediafiles: {
            files: info.file.status === "removed" ? [] : [file.id],
          },
        },
      })
    );
    await dispatch(
      fetchFiles({
        obj_id: detailData.id,
        obj_table: "candidates",
      })
    );
  };

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

  const onDownload = async ({ id, name }) => {
    console.log(file);
    const url = `${URL_FILE}/${id}`;

    const config = { responseType: "blob" };
    const blob = await axiosClient.get(url, config);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
  };

  return (
    <Row>
      <Upload
        headers={{
          authorization: "authorization-text",
        }}
        name="file"
        fileList={files}
        showUploadList={{
          showPreviewIcon: true,
          showDownloadIcon: true,
          showRemoveIcon: true,
        }}
        listType="picture-card"
        className="avatar-uploader"
        action="https://lubrytics.com:8443/nadh-mediafile/file"
        beforeUpload={() => false}
        onDownload={onDownload}
        // previewFile={previewFile}
        onChange={handleChange}
        // onPreview={onPreview}
      >
        Upload
      </Upload>
    </Row>
  );
};

export default UploadFile;
