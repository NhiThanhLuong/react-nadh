import { Card } from "antd";
import React from "react";
import styled from "styled-components";
import CandidateListTable from "./candidate-list-table";

const JobCandidateList = () => {
  return (
    <Card>
      <Title>Candidates List</Title>
      <CandidateListTable />
    </Card>
  );
};

const Title = styled.p`
  color: #465f7b;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`;

export default JobCandidateList;
