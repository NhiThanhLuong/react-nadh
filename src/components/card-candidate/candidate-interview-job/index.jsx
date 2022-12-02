/* eslint-disable no-unused-vars */
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Dropdown } from "antd";
import {
  getObjAssessmentsCompare,
  viewFlowJob,
} from "features/candidatesSlice";
import { showModal } from "features/modalSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TYPE_MODAL } from "ultis/const";
import ModalCandidateAssessment from "./modal/candidate-assessment";

const { Panel } = Collapse;

const CandidateInterviewJob = ({ data, candidate_id }) => {
  const dispatch = useDispatch();

  return (
    <Card
      title={<Title>Interview Loop</Title>}
      extra={
        <Button ghost type="primary" icon={<PlusOutlined />}>
          Pick Job
        </Button>
      }
    >
      <Collapse>
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
                          onClick={() => {
                            dispatch(viewFlowJob(flow));
                            dispatch(
                              getObjAssessmentsCompare({
                                candidate_id,
                                job_id: flow.job_id,
                              })
                            );
                            dispatch(
                              showModal(TYPE_MODAL.candidate_assessment)
                            );
                          }}
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
            <span>{flow.job.job_id}</span>
          </Panel>
        ))}
      </Collapse>
      <ModalCandidateAssessment />
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
