import { EyeOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";

const ContactPerson = ({ data, onEdit }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: text => <span className="capitalize">{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Current Contact",
      dataIndex: "current",
      render: isCurrent => isCurrent && "Current contact",
    },
    {
      title: "Mobile",
      dataIndex: "mobile_phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Job(s)",
      dataIndex: "jobs_count",
    },
    {
      title: "Action",
      render: (_, record) => (
        <EyeOutlined
          style={{ cursor: "pointer" }}
          onClick={() => onEdit(record.id)}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 800,
      }}
    />
  );
};

export default ContactPerson;
