import { Row, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { deleteFileSlice } from "features/fileSlice";
import axiosClient from "ultis/axios";
import { URL_FILE } from "ultis/const";
import { beforeUpload3M } from "ultis/uploadFile";

const UploadFile = ({ upLoadingFile }) => {
  const dispatch = useDispatch();

  const files = useSelector(state => state.file.files);

  const customRequest = async () => {};

  const handleChange = async info => {
    const { status } = info.file;
    switch (status) {
      case "removed": {
        dispatch(deleteFileSlice(info.file.id));
        break;
      }

      case "uploading": {
        await upLoadingFile(info.file.originFileObj);
        break;
      }

      default:
        break;
    }
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
      <StyledUpload
        name="file"
        customRequest={customRequest}
        fileList={files}
        showUploadList={{
          showPreviewIcon: true,
          showDownloadIcon: true,
          showRemoveIcon: true,
        }}
        listType="picture-card"
        action="https://lubrytics.com:8443/nadh-mediafile/file"
        beforeUpload={beforeUpload3M}
        onDownload={onDownload}
        // previewFile={previewFile}
        onChange={handleChange}
        // onPreview={onPreview}
      >
        Upload
      </StyledUpload>
    </Row>
  );
};

const StyledUpload = styled(Upload)`
  .ant-upload-list-picture-card-container,
  .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 140px;
    height: 180px;
  }

  .ant-upload-list-item-name {
    height: 95px;
    white-space: normal;
  }
`;

export default UploadFile;
