/* eslint-disable no-unused-vars */
import { Table } from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const CandidateListTable = () => {
  const detailData = useSelector(state => state.job.detailData);

  const columns = [
    {
      title: "Candidate ID",
      dataIndex: "candidate_id",
    },
    {
      title: "Name",
      dataIndex: "full_name",
    },
    {
      title: "Highest Degree",
      dataIndex: "highest_education",
    },
    {
      title: "Recent Position",
      dataIndex: "position",
    },
    {
      title: "Previous Status",
      dataIndex: "prev_status",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data = useMemo(
    () =>
      detailData.candidate_flows.map(item => ({
        candidate_id: item.candidate.candidate_id,
        full_name: item.candidate.full_name,
        highest_education: item.candidate.highest_education?.label || "",
        position: item.candidate.histories[0]?.label || "",
      })),
    [detailData]
  );

  return <Table columns={columns} dataSource={data} />;
};

export default CandidateListTable;
