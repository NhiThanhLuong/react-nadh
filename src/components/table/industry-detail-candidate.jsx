// import PropTypes from 'prop-types'
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Checkbox } from "antd";

const IndustryDetailCandidate = ({
  dataSource,
  onDeleteItem,
  onChecked,
  ...props
}) => {
  const columns = [
    {
      title: "Primary",
      dataIndex: "primary",
      render: (text, __, index) => {
        return (
          <Checkbox
            defaultChecked={text * 1 === 1}
            checked={text ? text * 1 === 1 : undefined}
            onChange={e => onChecked(e.target.checked, index)}
          />
        );
      },
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
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      {...props}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

IndustryDetailCandidate.propTypes = {};

export default IndustryDetailCandidate;
