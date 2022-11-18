import { Col, Row, Upload } from "antd";
import { putEditDetailCandidateNotLoading } from "features/candidatesSlice";
import { fetchFiles, fetchPostFile } from "features/fileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleChange = async info => {
    let formData = new FormData();
    formData.append("file", info.file);
    formData.append("obj_table", "candidates");
    formData.append("obj_uid", detailData.id);
    formData.append("uploadedByUserId", 12);
    await dispatch(fetchPostFile(formData));
    await dispatch(
      putEditDetailCandidateNotLoading({
        id: detailData.id,
        params: {
          mediafiles: {
            files: [file.id],
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

  return (
    <Row>
      <Col span={4}>
        <Upload
          headers={{
            authorization: "authorization-text",
          }}
          name="file"
          fileList={files}
          listType="picture-card"
          className="avatar-uploader"
          //   showUploadList={false}
          action="https://lubrytics.com:8443/nadh-mediafile/file"
          beforeUpload={() => false}
          onChange={handleChange}
        >
          Upload
        </Upload>
      </Col>
    </Row>
  );
};

export default UploadFile;
