import { DeleteOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Select, Typography } from "antd";
import { fetchCandidates } from "features/candidatesSlice";
import { postJobCandidateFlows } from "features/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { get_text_obj_industry } from "ultis/func";

const { Option } = Select;

const ModalCandidateList = ({ data, openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [listPicked, setListPicked] = useState([]);

  const candidates = useSelector(state => state.candidates.data);

  useEffect(() => {
    openModal &&
      dispatch(
        fetchCandidates({
          perPage: 20,
        })
      );
  }, [openModal]);

  const onOK = async () => {
    try {
      await dispatch(
        postJobCandidateFlows({
          candidate_array: listPicked.map(({ id }) => id),
          job_id: data.id,
        })
      ).unwrap();
      setListPicked([]);
      // handle result here
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  };

  return (
    <Modal
      closable={false}
      destroyOnClose
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
      <RowItem
        title="Industry"
        label={data?.business_line.map((item, idx) => (
          <p key={idx} className="mb-0.5">
            {get_text_obj_industry(item)}
          </p>
        ))}
      />
      <RowItem title="Experience Level" label="" />
      <Select
        className="w-5/6"
        optionFilterProp={false}
        mode="multiple"
        placeholder="Please select candidate"
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
            <Col span={4} className="justify-center flex items-center text-lg">
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
