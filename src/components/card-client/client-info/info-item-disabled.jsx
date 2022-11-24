import { Col, Typography } from "antd";
import React from "react";

const InfoItemDisabled = ({ title, children }) => {
  return (
    <>
      <Col span={8}>
        <Typography.Paragraph strong>{title}</Typography.Paragraph>
      </Col>
      <Col span={16}>
        <Typography.Text disabled style={{ color: "rgba(0,0,0,0.65)" }}>
          {children}
        </Typography.Text>
      </Col>
    </>
  );
};

export default InfoItemDisabled;
