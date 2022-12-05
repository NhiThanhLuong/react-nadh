/* eslint-disable no-unused-vars */
import { Col, DatePicker, Form, Modal, Row } from "antd";
import { FormSelect } from "components";
import { hideModal } from "features/modalSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { candidate_flow_status, TYPE_MODAL } from "ultis/const";
import { get_obj_key_label_from_id } from "ultis/func";

const ModalTimelineActivity = () => {
  const dispatch = useDispatch();

  const type_modal = useSelector(state => state.modal.type_modal);
  const { job_id, timeline_id } = useSelector(state => state.modal.data);
  const users = useSelector(state => state.user.users)?.map(
    ({ user_id, full_name }) => ({
      key: user_id,
      label: full_name,
    })
  );
  const detailData = useSelector(state => state.candidates.detailData);

  const job = detailData?.flows.find(({ id }) => id === job_id);
  const timeline = job?.flow.find(({ id }) => id === timeline_id);

  //   console.log(timeline);
  console.log(users);

  return (
    <Modal
      open={type_modal === TYPE_MODAL.candidate_interview_job_timeline.type}
      onCancel={() => dispatch(hideModal())}
      destroyOnClose
      title={
        <span>
          {
            get_obj_key_label_from_id(
              candidate_flow_status,
              timeline?.current_status
            )?.label
          }{" "}
          - {moment(timeline?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
        </span>
      }
      footer={null}
      width={900}
    >
      {job_id && timeline_id && (
        <Form
          initialValues={{
            time: moment(timeline.info.time),
            interviewer: timeline.info.interviewer,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <CustomRow
                title="Creator"
                label={
                  <span>
                    {timeline?.creator.full_name} -{" "}
                    {timeline?.creator.role.name}
                  </span>
                }
              />
              <CustomRow title="Job" label={job?.job.title.label} />
              <CustomRow title="Job code" label={job?.job.job_id} />
              <CustomRow title="Job status" label="Opening" />
              <CustomRow
                title="Date"
                label={
                  <Form.Item name="time">
                    <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />
                  </Form.Item>
                }
              />
              <CustomRow
                title="Consultant"
                label={
                  <FormSelect
                    name="interviewer"
                    options={users}
                    mode="multiple"
                  />
                }
              />
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

const CustomRow = ({ title, label }) => (
  <Row gutter={8} className="mb-1">
    <Col span={8}>
      <span className="font-medium">{title}</span>
    </Col>
    <Col span={16}>
      <span className="capitalize">{label}</span>
    </Col>
  </Row>
);

export default ModalTimelineActivity;
