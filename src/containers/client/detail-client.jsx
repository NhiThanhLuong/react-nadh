/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Form, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  fetchDetailClient,
  putDetailClientNotLoading,
} from "features/clientSlice";
import { RowTitle } from "styles/styled";
import {
  ClientAttachments,
  ClientComments,
  ClientContactPerson,
  ClientDescription,
  ClientIndustry,
  ClientInfo,
} from "components";
import { fetchUsers } from "features/userSlice";
import { fetchFiles, fetchPostFile } from "features/fileSlice";
import styled from "styled-components";

const DetailClient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();

  const loading = useSelector(state => state.client.loading);
  const loadingDetail = useSelector(state => state.client.loadingDetail);
  const detailData = useSelector(state => state.client.detailData);

  const file = useSelector(state => state.file.file);
  const getFiles = useSelector(state => state.file.getFiles);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(
      fetchClients({
        getAll: true,
      })
    );
    dispatch(fetchDetailClient(id));
  }, []);

  useEffect(() => {
    if (detailData?.id)
      dispatch(
        fetchFiles({
          obj_id: detailData.id,
          obj_table: "client",
        })
      );
  }, [detailData?.id, getFiles]);

  useEffect(() => {
    if (file?.id && file.obj_table === "client")
      callBackKey("mediafiles", {
        [file.type === "avatar" ? "logo" : "files"]: [file.id],
      });
  }, [file?.id]);

  const callBackKey = (key, value) =>
    dispatch(
      putDetailClientNotLoading({
        id: detailData.id,
        params: {
          [key]: value,
        },
      })
    );

  const upLoadingFile = async file => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("obj_table", "client");
    formData.append("obj_uid", detailData.id);
    formData.append("uploadedByUserId", 12);
    await dispatch(fetchPostFile(formData));
  };

  return (
    <Row style={{ marginTop: "90px" }}>
      <Col span={24}>
        {!loading && detailData?.client_id === id ? (
          <StyledSpin spinning={loadingDetail} tip="Loading...">
            <Form
              form={form}
              initialValues={{
                name: detailData.name,
                address: detailData.address,
                phone_number: detailData.phone.number,
                fax: detailData.fax?.number,
                email: detailData.email || "",
                tax_code: detailData.tax_code || "",
                status: detailData.status,
                code: detailData.code,
                parent_id: detailData.parent_id,
                factory_site: detailData.factory_site,
                type: detailData.type,
                cpa: detailData.cpa,
                lead_consultants: detailData.lead_consultants[0],
              }}
            >
              <RowTitle>
                <Link to="/clients">Clients List /</Link>
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  {id} | {detailData.name}
                </span>
              </RowTitle>

              <Row gutter={[8, 16]}>
                <Col span={24}>
                  <ClientInfo form={form} data={detailData} />
                </Col>
                <Col span={16}>
                  <ClientIndustry
                    data={detailData.business_line}
                    callBack={callBackKey}
                  />
                  <ClientContactPerson
                    data={detailData.pic}
                    client_id={detailData.id}
                  />
                </Col>
                <Col span={24}>
                  <ClientDescription form={form} callBack={callBackKey} />
                  <ClientComments
                    data={detailData.detail_comments}
                    form={form}
                    id={detailData.id}
                  />
                  <ClientAttachments upLoadingFile={upLoadingFile} />
                </Col>
              </Row>
            </Form>
          </StyledSpin>
        ) : (
          <StyledRow align="middle" justify="center">
            <Spin tip="Loading..." />
          </StyledRow>
        )}
      </Col>
    </Row>
  );
};

const StyledSpin = styled(Spin)`
  position: fixed !important;
  max-height: 100vh !important;
`;

const StyledRow = styled(Row)`
  height: 100vh;
`;

export default DetailClient;
