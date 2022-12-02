import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Row, Tag } from "antd";
import { closeFilterTagCandidateList } from "features/jobSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { candidate_flow_status } from "ultis/const";
import CandidateListTable from "./candidate-list-table";
import ModalCandidateList from "./modal-candidate-list";

const JobCandidateList = ({ data }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const filterID = useSelector(state => state.job.filterIdCandidateList);

  return (
    <Card id="card_job_candidate_list">
      <Row justify="space-between" className="mb-0.5">
        <Title>Candidates List</Title>
        <Button
          onClick={() => setOpenModal(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Pick Candidate
        </Button>
      </Row>
      {filterID !== 0 && (
        <Tag
          className="mb-0.5"
          closable
          onClose={() => dispatch(closeFilterTagCandidateList())}
        >
          <span>Filter by previous status : </span>
          <span>
            {candidate_flow_status.find(item => item.id === filterID).label}
          </span>
        </Tag>
      )}
      <CandidateListTable data={data.candidate_flows} />
      <ModalCandidateList
        data={data}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
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
