/* eslint-disable no-unused-vars */
import { Anchor, Card, Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { blue } from "@ant-design/colors";
import { useDispatch } from "react-redux";
import { filterCandidateListByID } from "features/jobSlice";
import {
  CALL,
  INTERVIEW_NADH,
  SUBMIT_CLIENT,
  INTERVIEW_CLIENT,
  REFERENCE_CHECK,
  NEGOTIATION,
  OFFER_ACCEPTED,
  PLACEMENT,
  FOLLOW_UP,
  RE_PLACEMENT,
  SHORT_LIST,
} from "ultis/const";

const { Link } = Anchor;

const arrShowRow1 = [
  CALL,
  INTERVIEW_NADH,
  SHORT_LIST,
  SUBMIT_CLIENT,
  INTERVIEW_CLIENT,
  REFERENCE_CHECK,
];

const arrShowRow2 = [
  NEGOTIATION,
  OFFER_ACCEPTED,
  PLACEMENT,
  FOLLOW_UP,
  RE_PLACEMENT,
];

const JobCountCandidate = ({ data }) => {
  const dispatch = useDispatch();

  const onClick = id => {
    dispatch(filterCandidateListByID(id));
  };

  return (
    <StyledCard className="mb-0.5">
      <ShowRow arr={arrShowRow1} data={data} onClick={onClick} spanCol={4} />
      <ShowRow arr={arrShowRow2} data={data} onClick={onClick} spanCol={5} />
    </StyledCard>
  );
};

const ShowRow = ({ arr, data, onClick, spanCol }) => (
  <Anchor
    affix={false}
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <Row className="border border-solid border-slate-400 rounded-lg mb-1">
      {arr.map(item => (
        <Col
          key={item.id}
          span={item.id === PLACEMENT.id ? 4 : spanCol}
          className="flex items-center justify-center my-1"
        >
          <Link
            href="#card_job_candidate_list"
            title={
              <DivItem onClick={() => onClick(item.id)}>
                <p className="text-center">
                  {
                    data?.filter(({ previous_status }) =>
                      previous_status.includes(item.id)
                    ).length
                  }
                </p>
                <span>{item.label}</span>
              </DivItem>
            }
          />
        </Col>
      ))}
    </Row>
  </Anchor>
);

const StyledCard = styled(Card)`
  a {
    color: inherit !important;
    text-decoration: none !important;
  }
`;

const DivItem = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background-color: ${blue[0]};
    border-color: ${blue.primary};
    color: ${blue.primary};
    border-radius: 5px;
  }
`;

export default JobCountCandidate;
