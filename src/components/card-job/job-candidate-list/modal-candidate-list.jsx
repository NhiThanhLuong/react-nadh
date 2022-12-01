/* eslint-disable no-unused-vars */
import { DeleteOutlined } from "@ant-design/icons";
import { Col, Form, Modal, Row, Select, Typography } from "antd";
import { fetchCandidates } from "features/candidatesSlice";
import { postJobCandidateFlows } from "features/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { postCandidateFlows } from "ultis/api";
import { get_text_obj_industry } from "ultis/func";

const { Option } = Select;

const ModalCandidateList = ({ data, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [listPicked, setListPicked] = useState([]);

  const candidates = useSelector(state => state.candidates.data);

  useEffect(() => {
    dispatch(
      fetchCandidates({
        perPage: 20,
      })
    );
  }, []);

  const industryLabel =
    data.business_line.length > 0
      ? `${data.business_line[0].industry.label} / ${data.business_line[0].sector.label}`
      : "";

  const onOK = () => {
    dispatch(
      postJobCandidateFlows({
        candidate_array: listPicked.map(({ id }) => id),
        job_id: data.id,
      })
        .unwrap()
        .then(() => setListPicked({}))
    );
  };

  return (
    <Modal
      closable={false}
      open={openModal}
      title="Pick Candidate"
      width={700}
      okText="Pick"
      onCancel={() => setOpenModal(false)}
      okButtonProps={{
        disabled: listPicked.length === 0,
        onClick: onOK,
      }}
    >
      <RowItem title="Job Title" label={data?.title.label} />
      <RowItem title="Department" label={data.department.label} />
      <RowItem title="Industry" label={industryLabel} />
      <RowItem title="Experience Level" label="" />
      <Select
        className="w-4/5"
        optionFilterProp={false}
        mode="multiple"
        value={[]}
        onSelect={value => {
          setListPicked(prevState => [
            ...prevState,
            candidates.find(candidate => candidate.id === value),
          ]);
        }}
      >
        {candidates.map(candidate => (
          <Option
            key={candidate.id}
            className="mb-0.5"
            disabled={
              !!data.candidate_flows.find(
                item => item.candidate_id === candidate.id
              ) || !!listPicked.find(({ id }) => id === candidate.id)
            }
          >
            <p className="font-medium capitalize">
              {candidate.candidate_id_int} - {candidate.full_name} -{" "}
              {candidate.dob}
            </p>
            <p>
              <span className="font-medium">Position Applied: </span>
              {candidate.prefer_position.positions
                .map(({ label }) => label)
                .join(", ")}
            </p>
            <div>
              <p className="font-medium">Industry:</p>
              {candidate.business_line.map((item, idx) => (
                <p key={idx}>{get_text_obj_industry(item)}</p>
              ))}
            </div>
          </Option>
        ))}
      </Select>
      {listPicked.length > 0 && (
        <p className="text-lg font-medium">
          {listPicked.length} Candidates Picked
        </p>
      )}
      <ListPickedContainer>
        {listPicked.map(candidate => (
          <Row
            key={candidate.id}
            className="mb-1"
            align="middle"
            justify="center"
          >
            <Col span={20}>
              <p className="font-medium capitalize">
                {candidate.candidate_id_int} - {candidate.full_name} -{" "}
                {candidate.dob}
              </p>
              <p>
                <span className="font-medium">Position Applied: </span>
                {candidate.prefer_position.positions
                  .map(({ label }) => label)
                  .join(", ")}
              </p>
              <div>
                <p className="font-medium">Industry:</p>
                {candidate.business_line.map((item, idx) => (
                  <p key={idx}>{get_text_obj_industry(item)}</p>
                ))}
              </div>
            </Col>
            <Col span={4} className="text-center flex items-center text-lg">
              <DeleteOutlined
                style={{ color: "red", cursor: "pointer" }}
                onClick={() =>
                  setListPicked(state =>
                    state.filter(({ id }) => id !== candidate.id)
                  )
                }
              />
            </Col>
          </Row>
        ))}
      </ListPickedContainer>
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

const ListPickedContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export default ModalCandidateList;
