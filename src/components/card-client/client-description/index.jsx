import { Card, Row } from "antd";
import { useSelector } from "react-redux";
import { ClientDesCkeditor } from "components";

const ClientDescription = ({ form, callBack }) => {
  const detailData = useSelector(state => state.client.detailData);
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <ClientDesCkeditor
          name="summary"
          title="COMPANY SUMMARY"
          data={detailData.summary}
          form={form}
          callBack={callBack}
        />
        <ClientDesCkeditor
          name="culture"
          title="COMPANY CULTURE"
          data={detailData.culture}
          form={form}
          callBack={callBack}
        />
        <ClientDesCkeditor
          name="environment"
          title="ENVIRONMENT"
          data={detailData.environment}
          form={form}
          callBack={callBack}
        />
        <ClientDesCkeditor
          name="selling_point"
          title="UNIQUE SELLING POINT"
          data={detailData.selling_point}
          form={form}
          callBack={callBack}
        />
      </Row>
    </Card>
  );
};

export default ClientDescription;
