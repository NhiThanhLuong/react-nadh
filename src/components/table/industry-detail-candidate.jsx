/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types'
import { useMemo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Checkbox } from "antd";

const IndustryDetailCandidate = ({ dataSource, onDeleteItem, onChecked }) => {
  const columns = useMemo(
    () => [
      {
        title: "Primary",
        dataIndex: "primary",
        render: (text, __, index) => (
          <Checkbox
            defaultChecked={text === 1}
            onChange={() => onChecked(text, __, index)}
          />
        ),
      },
      {
        title: "Industry",
        dataIndex: "industry",
        render: text => <span>{text?.label}</span>,
      },
      {
        title: "Sector",
        dataIndex: "sector",
        render: text => <span>{text?.label}</span>,
      },
      {
        title: "Category",
        dataIndex: "category",
        render: text => <span>{text?.label}</span>,
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record, index) => (
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDeleteItem(text, record, index)}
          />
        ),
      },
    ],
    []
  );

  return <Table columns={columns} dataSource={dataSource} />;
};

IndustryDetailCandidate.propTypes = {};

export default IndustryDetailCandidate;
