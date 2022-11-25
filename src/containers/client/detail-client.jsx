import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  fetchDetailClient,
  putDetailClientNotLoading,
} from "features/clientSlice";
import { RowTitle } from "styles/styled";
import {
  ClientContactPerson,
  ClientDescription,
  ClientIndustry,
  ClientInfo,
} from "components";
import { fetchUsers } from "features/userSlice";

const DetailClient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();

  const loading = useSelector(state => state.client.loading);
  const detailData = useSelector(state => state.client.detailData);

  const callBackKey = (key, value) =>
    dispatch(
      putDetailClientNotLoading({
        id: detailData.id,
        params: {
          [key]: value,
        },
      })
    );

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(
      fetchClients({
        getAll: true,
      })
    );
    dispatch(fetchDetailClient(id));
  }, []);

  return (
    <Row style={{ marginTop: "90px" }}>
      <Col span={24}>
        {!loading && detailData?.client_id === id && (
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
              </Col>
            </Row>
          </Form>
        )}
      </Col>
    </Row>
  );
};

export default DetailClient;
