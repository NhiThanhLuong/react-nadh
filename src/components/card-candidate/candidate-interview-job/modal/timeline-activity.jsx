/* eslint-disable no-unused-vars */
import { Col, DatePicker, Form, Modal, Row, Spin } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { CancelSave, Comments, FormSelect } from "components";
import {
  postCommentFlow,
  putCandidateFlowIDSlice,
} from "features/candidatesSlice";
import { hideModal } from "features/modalSlice";
import { candidate_flow_status, TYPE_MODAL } from "ultis/const";
import { get_obj_key_label_from_id } from "ultis/func";

const ModalTimelineActivity = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const type_modal = useSelector(state => state.modal.type_modal);
  const { job_id, timeline_id } = useSelector(state => state.modal.data);
  const users = useSelector(state => state.user.users)?.map(
    ({ user_id, full_name }) => ({
      key: user_id,
      label: full_name,
    })
  );
  const detailData = useSelector(state => state.candidates.detailData);
  const loadingDetail = useSelector(state => state.candidates.loadingDetail);

  const job = detailData?.flows.find(({ id }) => id === job_id);
  const timeline = job?.flow.find(({ id }) => id === timeline_id);

  const initialValues = timeline && {
    time: timeline?.info?.time ? moment(timeline?.info.time) : null,
    interviewer:
      timeline?.info?.interviewer?.map(({ user_id }) => user_id) || [],
    content: null,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [job_id, timeline_id]);

  const onResetField = name => {
    form.setFieldsValue({
      [name]: initialValues[name],
    });
  };

  const dispatchCustom = (key, value) => {
    dispatch(
      putCandidateFlowIDSlice({
        job_id,
        params: {
          flow: {
            id: timeline_id,
            [key]: value,
          },
        },
      })
    );
  };

  console.log(job_id, timeline_id);

  const postComment = (name, content) => {
    dispatch(
      postCommentFlow({
        [name]: content,
        source: {
          id: timeline_id,
          module: "candidate_flow",
          section: "flow_status",
        },
        source_uuid: job_id,
      })
    );
    form.resetFields([name]);
  };

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
      <Spin spinning={loadingDetail} tip="Loading...">
        {job_id && timeline_id && (
          <Form form={form}>
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
                    <>
                      <Form.Item name="time" className="m-0">
                        <DatePicker showTime format="DD/MM/YYYY HH:mm:ss" />
                      </Form.Item>
                      <FormItemDepend dependencies={["time"]}>
                        {({ getFieldValue }) => {
                          const time = getFieldValue("time");
                          return (
                            time?.format("YYYY-MM-DD HH:mm:ss") !==
                              initialValues.time?._i && (
                              <CancelSave
                                onCancel={() => onResetField("time")}
                                onSave={() =>
                                  dispatchCustom(
                                    "time",
                                    time.format("YYYY-MM-DD HH:mm:ss")
                                  )
                                }
                              />
                            )
                          );
                        }}
                      </FormItemDepend>
                    </>
                  }
                />
                <CustomRow
                  title="Consultant"
                  label={
                    <>
                      <FormSelect
                        name="interviewer"
                        options={users}
                        mode="multiple"
                      />
                      <FormItemDepend dependencies={["interviewer"]}>
                        {({ getFieldValue }) => {
                          const interviewer = getFieldValue("interviewer");
                          return (
                            JSON.stringify(interviewer) !==
                              JSON.stringify(initialValues.interviewer) && (
                              <CancelSave
                                onCancel={() => onResetField("interviewer")}
                                onSave={() =>
                                  dispatchCustom("interviewer", interviewer)
                                }
                              />
                            )
                          );
                        }}
                      </FormItemDepend>
                    </>
                  }
                />
              </Col>
              <Col span={12}>
                <Comments
                  name="content"
                  data={timeline?.comments}
                  form={form}
                  callBack={(name, value) => postComment(name, value)}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Spin>
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

const FormItemDepend = styled(Form.Item)`
  margin: 0;
  .ant-form-item-control-input {
    min-height: 0;
  }
`;

export default ModalTimelineActivity;
