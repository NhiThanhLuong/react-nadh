import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { formatDate } from "ultis/func";
import { FormAcademic } from "components";
import { showModal } from "features/modalSlice";
import { getHistory } from "features/candidatesSlice";
import { TYPE_MODAL } from "ultis/const";

const AcademicCandidate = ({ dataSource }) => {
  const dispatch = useDispatch();
  const type_modal = useSelector(state => state.modal.type_modal);
  const columns = [
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
      render: (_, record) => {
        return (
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(record.id)}
          />
        );
      },
    },
  ];

  const onEdit = id => {
    dispatch(getHistory(id));
    dispatch(showModal(TYPE_MODAL.academic_history.edit));
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

      <FormAcademic
        open={
          type_modal === TYPE_MODAL.academic_history.add.type ||
          type_modal === TYPE_MODAL.academic_history.edit.type
        }
      />
    </>
  );
};

export default AcademicCandidate;
