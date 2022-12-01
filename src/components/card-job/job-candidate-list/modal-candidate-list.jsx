import { Col, Modal, Row, Typography } from "antd";
import React from "react";

const ModalCandidateList = ({ data }) => {
  const industryLabel =
    data.business_line.length > 0
      ? `${data.business_line[0].industry.label} / ${data.business_line[0].sector.label}`
      : "";

  return (
    <Modal open title="Pick Candidate" width={700}>
      <RowItem title="Job Title" label={data?.title.label} />
      <RowItem title="Department" label={data.department.label} />
      <RowItem title="Industry" label={industryLabel} />
      <RowItem title="Experience Level" label="" />
    </Modal>
  );
};

const RowItem = ({ title, label }) => (
  <Row className="mb-0.5">
    <Col span={8}>
      <Typography.Text className="font-medium">{title}</Typography.Text>
    </Col>
    <Col span={16}>{label}</Col>
  </Row>
);

export default ModalCandidateList;
