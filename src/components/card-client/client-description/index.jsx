import { Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { ClientDesCkeditor } from "components";

const FIELDS = [
  {
    key: 1,
    name: "summary",
    title: "COMPANY SUMMARY",
  },
  {
    key: 2,
    name: "culture",
    title: "COMPANY CULTURE",
  },
  {
    key: 3,
    name: "environment",
    title: "ENVIRONMENT",
  },
  {
    key: 4,
    name: "selling_point",
    title: "UNIQUE SELLING POINT",
  },
];

const ClientDescription = ({ form, callBack }) => {
  const detailData = useSelector(state => state.client.detailData);
  return (
    <Card
      title={<span style={{ color: "#465f7b" }}>Industry</span>}
      className="mb-1"
    >
      <Row gutter={[16, 16]}>
        {FIELDS.map(item => (
          <Col key={item.key} span={12}>
            <ClientDesCkeditor
              name={item.name}
              title={item.title}
              data={detailData[item.name]}
              form={form}
              callBack={callBack}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ClientDescription;
