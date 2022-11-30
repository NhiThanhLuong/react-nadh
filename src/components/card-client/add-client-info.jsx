/* eslint-disable no-unused-vars */
import { Card, Col, Form, Input, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { Item } from "styles/styled";
import { getClientConflictTaxCode } from "ultis/api";
import validator from "ultis/validate";

const AddClientInfo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
      <Title>CLIENT INFORMATION</Title>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Item name="name" label="Trade Name" rules={validator("required")}>
              <Input placeholder="PLEASE ENTER TRADE NAME" />
            </Item>
          </Col>
          <Col span={12}>
            <Item name="code" label="Client's Shortened Name">
              <Input placeholder="PLEASE ENTER CODE" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="phone_number"
              label="Phone Number"
              rules={validator(["number", "required"])}
            >
              <Input placeholder="Please enter phone number" />
            </Item>
          </Col>
          <Col span={12}>
            <Item name="fax" label="Fax" rules={validator("number")}>
              <Input placeholder="Please enter fax number" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="lead_consultants"
              label="Lead consultant"
              rules={validator("required")}
            >
              <Input placeholder="Please select lead consultant" />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              name="tax_code"
              label="Tax code"
              rules={[
                ...validator(["number", "required"]),
                () => ({
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();
                    try {
                      await getClientConflictTaxCode(value);
                      return Promise.resolve();
                    } catch (err) {
                      return Promise.reject(
                        new Error(err.response.data[0].message)
                      );
                    }
                  },
                }),
              ]}
            >
              <Input placeholder="Please enter tax code" />
            </Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

const Title = styled.p`
  color: #465f7b;
  font-size: 16px;
  line-height: 24px;

  font-weight: 500;
`;

export default AddClientInfo;
