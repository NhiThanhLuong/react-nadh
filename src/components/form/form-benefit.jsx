/* eslint-disable no-unused-vars */
import { Col, Input, Radio, Row, Space } from "antd";
import { Item } from "styles/styled";

const FormBenefit = ({ label, name_radio, name_text }) => {
  return (
    <Item label={label}>
      <Row>
        <Col span={6}>
          <Item name={name_radio}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio key={1} value={1}>
                  Yes
                </Radio>
                <Radio key={-1} value={-1}>
                  No
                </Radio>
              </Space>
            </Radio.Group>
          </Item>
        </Col>
        <Col span={18}>
          <Item dependencies={[name_radio]}>
            {({ getFieldValue }) => {
              return (
                getFieldValue(name_radio) === 1 && (
                  <Item name={name_text}>
                    <Input />
                  </Item>
                )
              );
            }}
          </Item>
        </Col>
      </Row>
    </Item>
  );
};

export default FormBenefit;
