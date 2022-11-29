import { Card } from "antd";
import React from "react";
import styled from "styled-components";

import { UploadFile } from "components";

const ClientAttachments = ({ upLoadingFile }) => {
  return (
    <Card>
      <Title>Attachments</Title>
      <UploadFile upLoadingFile={upLoadingFile} />
    </Card>
  );
};

const Title = styled.p`
  color: #465f7b;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`;

export default ClientAttachments;
