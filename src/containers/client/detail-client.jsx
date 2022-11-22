import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Form, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailClient } from "features/clientSlice";
import { RowTitle } from "styles/styled";
import { ClientInfo } from "components";

const DetailClient = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const loading = useSelector(state => state.client.loading);
  const detailData = useSelector(state => state.client.detailData);

  console.log(loading);

  useEffect(() => {
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
            <Form>
              <Row>
                <Col span={24}>
                  <ClientInfo />
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
