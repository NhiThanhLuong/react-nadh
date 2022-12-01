import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Row } from "antd";
import styled from "styled-components";
import CandidateListTable from "./candidate-list-table";
import ModalCandidateList from "./modal-candidate-list";

const JobCandidateList = ({ data }) => {
  return (
    <Card>
      <Row justify="space-between" className="mb-0.5">
        <Title>Candidates List</Title>
        <Button
          //   onClick={() => dispatch(showModal(TYPE_MODAL.contact_person.add))}
          type="primary"
          icon={<PlusOutlined />}
        >
          Pick Candidate
        </Button>
      </Row>
      <CandidateListTable data={data.candidate_flows} />
      <ModalCandidateList data={data} />
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
