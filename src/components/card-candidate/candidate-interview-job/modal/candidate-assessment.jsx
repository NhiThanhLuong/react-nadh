import { Col, Modal, Row } from "antd";
import { hideModal } from "features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { TYPE_MODAL } from "ultis/const";
import { get_text_obj_industry } from "ultis/func";

const ModalCandidateAssessment = () => {
  const dispatch = useDispatch();

  const detailData = useSelector(state => state.candidates.detailData);
  const flow = useSelector(state => state.candidates.flow);
  const assessmentCompare = useSelector(
    state => state.candidates.assessmentCompare
  );

  const type_modal = useSelector(state => state.modal.type_modal);

  return (
    <Modal
      open={type_modal === TYPE_MODAL.candidate_assessment.type}
      onCancel={() => dispatch(hideModal())}
      destroyOnClose
      title={<span>Candidate Assessment</span>}
      footer={null}
      width={900}
    >
      <Row gutter={16}>
        <Col span={6}></Col>
        <Col span={8}>
          <div className="font-medium">
            <span>CANDIDATE: </span>
            <span>
              {detailData.candidate_id} - {detailData.full_name}
            </span>
          </div>
        </Col>
        <Col span={2}>Or</Col>
        <Col span={8}>
          <span className="font-medium">
            JOB: {flow.job?.job_id} - {flow.job?.title.label}
          </span>
        </Col>
      </Row>
      <CustomRow
        title="Industry Year of Services"
        label1={detailData.industry_years}
        label2={assessmentCompare.job?.industry_experience}
      />
      <CustomRow
        title="Year of Management"
        label1={detailData.management_years}
        label2={assessmentCompare.job?.role_experience}
      />
      <CustomRow
        title="Industry"
        label1={detailData.business_line.map((item, idx) => (
          <p key={idx} className="mb-0.5">
            {get_text_obj_industry(item)}
          </p>
        ))}
        label2={assessmentCompare.job?.industry.map((item, idx) => (
          <p key={idx} className="mb-0.5">
            {get_text_obj_industry(item)}
          </p>
        ))}
      />
    </Modal>
  );
};

const CustomRow = ({ title, label1, label2 }) => (
  <Row gutter={16} className="mb-1">
    <Col span={6}>
      <span className="font-medium">{title}</span>
    </Col>
    <Col span={8}>{label1}</Col>
    <Col span={2}>Vs.</Col>
    <Col span={8}>{label2}</Col>
  </Row>
);

export default ModalCandidateAssessment;
