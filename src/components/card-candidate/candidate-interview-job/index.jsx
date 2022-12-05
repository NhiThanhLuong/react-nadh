/* eslint-disable no-unused-vars */
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Dropdown, Timeline } from "antd";
import {
  getObjAssessmentsCompare,
  viewFlowJob,
} from "features/candidatesSlice";
import { dataModal, showModal } from "features/modalSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { candidate_flow_status, TYPE_MODAL } from "ultis/const";
import { get_obj_key_label_from_id } from "ultis/func";
import ModalCandidateAssessment from "./modal/candidate-assessment";
import ModalTimelineActivity from "./modal/timeline-activity";

const { Panel } = Collapse;

const CandidateInterviewJob = ({ data, candidate_id }) => {
  const dispatch = useDispatch();

  const showModalCandidateAssessment = flow => {
    dispatch(viewFlowJob(flow));
    dispatch(
      getObjAssessmentsCompare({
        candidate_id,
        job_id: flow.job_id,
      })
    );
    dispatch(showModal(TYPE_MODAL.candidate_assessment));
  };

  const showModalTimelineActivity = (job_id, timeline_id) => {
    dispatch(showModal(TYPE_MODAL.candidate_interview_job_timeline));
    dispatch(
      dataModal({
        job_id,
        timeline_id,
      })
    );
    // dispatch(viewFlowJob(flow));
  };

  return (
    <Card
      title={<Title>Interview Loop</Title>}
      extra={
        <Button ghost type="primary" icon={<PlusOutlined />}>
          Pick Job
        </Button>
      }
    >
      <Collapse accordion>
        {data.map(flow => (
          <Panel
            key={flow.job_id}
            header={
              <div>
                <p className="font-medium">
                  {flow.job.job_id} - {flow.job.title.label}
                </p>
                <p className="text-gray-600 text-xs font-medium">
                  {flow.job.client.name} - {flow.job.client.client_id}
                </p>
              </div>
            }
            extra={
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <span
                          onClick={() => showModalCandidateAssessment(flow)}
                          role="presentation"
                        >
                          Candidate Assessment
                        </span>
                      ),
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <span
                  role="presentation"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <MoreOutlined />
                </span>
              </Dropdown>
            }
          >
            <Timeline>
              {flow.flow?.map(item => (
                <Timeline.Item
                  key={item?.id}
                  color="green"
                  onClick={() => showModalTimelineActivity(flow.id, item.id)}
                >
                  <p className="font-semibold">
                    {
                      get_obj_key_label_from_id(
                        candidate_flow_status,
                        item.current_status
                      ).label
                    }
                  </p>
                  <p>{item?.createdAt}</p>
                  <p>{item?.comments.length} comments</p>
                </Timeline.Item>
              ))}
            </Timeline>
          </Panel>
        ))}
      </Collapse>
      <ModalCandidateAssessment />
      <ModalTimelineActivity />
    </Card>
  );
};

const Title = styled.p`
  color: #465f7b;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`;

export default CandidateInterviewJob;
