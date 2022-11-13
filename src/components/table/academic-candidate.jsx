import { useMemo } from "react";
import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { formatDate } from "ultis/func";
import { FormAddEducation } from "components";
import { showModal } from "features/modalSlice";
import { getHistory } from "features/candidatesSlice";

const AcademicCandidate = ({ dataSource }) => {
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        title: "Current School",
        dataIndex: "status",
        render: text => (text === 1 ? <span>Is current school</span> : ""),
      },
      {
        title: "Start Year",
        dataIndex: "start_time",
        render: text => (text ? <span>{formatDate(text).year}</span> : ""),
      },
      {
        title: "Graduation Year",
        dataIndex: "end_time",
        render: text => (text ? <span>{formatDate(text).year}</span> : ""),
      },
      {
        title: "School",
        dataIndex: "organization",
        render: text => <span>{text?.label}</span>,
      },
      {
        title: "Major",
        dataIndex: "title",
        render: text => <span>{text?.label}</span>,
      },
      {
        title: "Degree",
        dataIndex: "degree",
        render: text => <span>{text?.label}</span>,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (_,record) => {
          return <EditOutlined style={{ cursor: "pointer" }} onClick={()=> onEdit(record.id)} />
        }
      },
    ],
    []
  );

  const onEdit = (id) => {
    dispatch(getHistory(id))
    dispatch(showModal());
  };

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      <FormAddEducation />
    </>
  );
};

export default AcademicCandidate;
