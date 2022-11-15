import { Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { formatDate } from "ultis/func";
import { FormWorkingHistory } from "components";
import { showModal } from "features/modalSlice";
import { getHistory } from "features/candidatesSlice";
import { TYPE_MODAL } from "ultis/const";

const WorkingHistoryCandidate = ({ dataSource }) => {
  const dispatch = useDispatch();
  const type_modal = useSelector(state => state.modal.type_modal);

  const columns = [
    {
      title: "Company",
      dataIndex: "organization",
      render: text => <span>{text?.label}</span>,
    },
    {
      title: "Position",
      dataIndex: "title",
      render: text => <span>{text?.label}</span>,
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      render: text =>
        text ? (
          <span>{`${formatDate(text).month}/${formatDate(text).year}`}</span>
        ) : (
          ""
        ),
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      render: text =>
        text ? (
          <span>{`${formatDate(text).month}/${formatDate(text).year}`}</span>
        ) : (
          "present"
        ),
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
    dispatch(showModal(TYPE_MODAL.working_history.edit));
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
      {/* <FormAddEducation /> */}

      <FormWorkingHistory
        open={
          type_modal === TYPE_MODAL.working_history.add.type ||
          type_modal === TYPE_MODAL.working_history.edit.type
        }
      />
    </>
  );
};

export default WorkingHistoryCandidate;
