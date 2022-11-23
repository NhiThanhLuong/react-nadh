import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, fetchDetailClient } from "features/clientSlice";
import { RowTitle } from "styles/styled";
import { ClientInfo } from "components";

const DetailClient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form] = Form.useForm();

  const loading = useSelector(state => state.client.loading);
  const detailData = useSelector(state => state.client.detailData);

  useEffect(() => {
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
          <>
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
              }}
            >
              <Row>
                <Col span={24}>
                  <ClientInfo form={form} data={detailData} />
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Col>
    </Row>
  );
};

export default DetailClient;
