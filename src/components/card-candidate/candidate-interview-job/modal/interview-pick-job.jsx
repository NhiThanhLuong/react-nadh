import { DeleteOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postCandidateFlowsSlice } from "features/candidatesSlice";
import { fetchJobs } from "features/jobSlice";
import useFecthApi from "hooks/useFecthApi";
import { get_text_obj_industry } from "ultis/func";
import { storage } from "_constants";

const { Option } = Select;

const ModalInterviewPickJob = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const [listPicked, setListPicked] = useState([]);

  const detailData = useSelector(state => state.candidates.detailData);
  const user_id = JSON.parse(localStorage.getItem(storage.user_sent)).id;

  const jobs = useSelector(state => state.job.data);

  useFecthApi(
    fetchJobs({
      page: null,
      perPage: null,
      status: 1,
      related_to: user_id,
    }),
    openModal
  );

  const onOK = async () => {
    try {
      await dispatch(
        postCandidateFlowsSlice({
          job_array: listPicked.map(({ id }) => id),
          candidate_id: detailData.id,
        })
      ).unwrap();
      setListPicked([]);
    } catch (rejectedValueOrSerializedError) {
      // handle error here
    }
  };

  return (
    <Modal
      closable={false}
      open={openModal}
      destroyOnClose
      title="Pick Job"
      width={700}
      okText="Pick"
      onCancel={() => setOpenModal(false)}
      okButtonProps={{
        disabled: listPicked.length === 0,
        onClick: onOK,
      }}
    >
      <CustomRow
        title="Full name"
        label={
          <span className="capitalize">{detailData?.full_name || "-"}</span>
        }
      />
      <CustomRow
        title="Position Applied"
        label={detailData?.prefer_position.positions
          ?.map(({ label }) => label)
          .join(", ")}
      />
      <CustomRow
        title="Industry"
        label={detailData?.business_line.map((item, idx) => (
          <p key={idx} className="mb-0.5">
            {get_text_obj_industry(item)}
          </p>
        ))}
      />
      <Select
        className="w-5/6"
        optionFilterProp={false}
        mode="multiple"
        value={[]}
        placeholder="Please select job"
        onSelect={value => {
          setListPicked(prevState => [
            ...prevState,
            jobs.find(job => job.id === value),
          ]);
        }}
      >
        {jobs.map(job => (
          <Option
            key={job.id}
            className="mb-3"
            disabled={
              !!detailData.flows.find(item => item.job_id === job.id) ||
              !!listPicked.find(({ id }) => id === job.id)
            }
          >
            <div className="[&>*~*]:mt-2">
              <p className="font-medium capitalize">
                {job?.job_id} - {job?.title.label} - {job?.end_date}
              </p>
              <p>
                <span className="font-medium">Client Name: </span>
                {job?.client.name}
              </p>
              <div className="[&>*~*]:mt-1">
                <p className="font-medium">Industry: </p>
                {job?.business_line.map((item, index) => (
                  <p key={index}>{get_text_obj_industry(item)}</p>
                ))}
              </div>
            </div>
          </Option>
        ))}
      </Select>
      {listPicked.length > 0 && (
        <p className="text-lg font-medium my-1">
          {listPicked.length} Jobs Picked
        </p>
      )}
      <div className="max-h-[300px] overflow-y-auto">
        {listPicked.map(job => (
          <Row key={job.id} className="mb-1" align="middle" justify="center">
            <Col span={20}>
              <div className="[&>*~*]:mt-2">
                <p className="font-medium capitalize">
                  {job?.job_id} - {job?.title.label} - {job?.end_date}
                </p>
                <p>
                  <span className="font-medium">Client Name: </span>
                  {job?.client.name}
                </p>
                <div className="[&>*~*]:mt-1">
                  <p className="font-medium">Industry: </p>
                  {job?.business_line.map((item, index) => (
                    <p key={index}>{get_text_obj_industry(item)}</p>
                  ))}
                </div>
              </div>
            </Col>
            <Col span={4} className="justify-center flex items-center text-lg">
              <DeleteOutlined
                className="text-red-600 cursor-pointer"
                onClick={() =>
                  setListPicked(state =>
                    state.filter(({ id }) => id !== job.id)
                  )
                }
              />
            </Col>
          </Row>
        ))}
      </div>
    </Modal>
  );
};

const CustomRow = ({ title, label }) => (
  <Row gutter={16} className="mb-1">
    <Col span={8}>
      <span className="font-medium">{title}</span>
    </Col>
    <Col span={16}>
      <div className="text-neutral-500 font-medium">{label}</div>
    </Col>
  </Row>
);

export default ModalInterviewPickJob;
