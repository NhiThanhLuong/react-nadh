/* eslint-disable no-unused-vars */
import { EyeOutlined } from "@ant-design/icons";
import { Col, Drawer, Row, Table, Typography } from "antd";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { candidate_flow_status } from "ultis/const";
import {
  get_array_obj_key_label_from_array_id,
  get_obj_key_label_from_id,
} from "ultis/func";

const CandidateListTable = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  const filterID = useSelector(state => state.job.filterIdCandidateList);

  const dataFilter =
    filterID === 0
      ? data
      : data.filter(({ previous_status }) =>
          previous_status.includes(filterID)
        );

  const columns = [
    {
      title: "Candidate ID",
      dataIndex: "candidate_id",
    },
    {
      title: "Name",
      dataIndex: "full_name",
      render: text => <span className="capitalize">{text}</span>,
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
      dataIndex: "previous_status",
      render: text => {
        const arr_text = get_array_obj_key_label_from_array_id(
          candidate_flow_status,
          text
        ).map(({ label }) => label);
        return <span>{arr_text.join(" -> ")}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: text => {
        return (
          <span>
            {get_obj_key_label_from_id(candidate_flow_status, text)?.label}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => onView(record)}
        />
      ),
    },
  ];

  const dataSource = useMemo(
    () =>
      dataFilter.map(item => ({
        candidate_id: item.candidate.candidate_id,
        full_name: item.candidate.full_name,
        highest_education: item.candidate.highest_education?.label || "",
        position: item.candidate.histories[0]?.title.label || "",
        previous_status: item.previous_status,
        status: item.status,
      })),
    [dataFilter]
  );

  const onView = record => {
    setOpen(true);
    setInfo(record);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
      <Drawer
        open={open}
        closable={false}
        width={450}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
      >
        <Typography.Title level={3}>Candidate Detail</Typography.Title>
        <RowViewDetail title="ID" label={info.candidate_id} />
        <RowViewDetail
          title="Fullname"
          label={info.full_name}
          classNameRow="capitalize"
        />
        <RowViewDetail title="Create at" label={info.candidate_id} />
        <RowViewDetail
          title="Status"
          label={
            get_obj_key_label_from_id(candidate_flow_status, info.status)?.label
          }
        />
        <RowViewDetail
          title="Highest Education"
          label={info.highest_education}
        />
        <RowViewDetail title="Current Job" label={info.position} />
      </Drawer>
    </>
  );
};

const RowViewDetail = ({ title, label, classNameRow }) => (
  <Row className={`mb-0.5 ${classNameRow || ""}`}>
    <Col span={8}>
      <Typography.Text className="font-medium">{title}</Typography.Text>
    </Col>
    <Col span={16}>{label}</Col>
  </Row>
);

export default CandidateListTable;
