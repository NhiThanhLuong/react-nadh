import { Col, Typography } from "antd";
import { CancelSave, FormSelect } from "components";
import React from "react";
import { useState } from "react";

const InfoItemSelect = ({ title, onCancel, onSave, children, ...props }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <Col span={8}>
        <Typography.Paragraph strong>{title}</Typography.Paragraph>
      </Col>
      <Col span={16}>
        {isEdit ? (
          <>
            <FormSelect {...props} />
            <CancelSave
              onCancel={() => onCancel(setIsEdit)}
              onSave={() => onSave(setIsEdit)}
            />
          </>
        ) : (
          <span onDoubleClick={() => setIsEdit(true)}>{children}</span>
        )}
      </Col>
    </>
  );
};

export default InfoItemSelect;
