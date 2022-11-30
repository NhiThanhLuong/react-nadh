/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Menu } from "antd";
import React from "react";

const columns = {
  jobs: [
    {
      title: "job_id",
      label: "ID",
    },
    {
      title: "title",
      label: "Title",
    },
    {
      title: "quantity",
      label: "Quantity",
    },
    {
      title: "target_date",
      label: "Open Date",
    },
    {
      title: "end_date",
      label: "Expire Date",
    },
    {
      title: "status",
      label: "Status",
    },
    {
      title: "client",
      label: "Client",
    },
    {
      title: "search_consultants",
      label: "Search Consultant",
    },
    {
      title: "candidate_flows_status",
      label: "Activity",
    },
    {
      title: "experience_level",
      label: "Experience level",
    },
    {
      title: "mapping_by",
      label: "Mapping by",
    },
    {
      title: "location",
      label: "City",
    },
    {
      title: "industry",
      label: "Industry",
    },
    {
      title: "industry_year",
      label: "Year of services",
    },
    {
      title: "salary",
      label: "Salary Range",
    },
    {
      title: "action",
      label: "Action",
    },
  ],
};

const menu = (
  <Menu
    items={columns.jobs.map(item => ({
      key: item.title,
      label: <Checkbox>{item.label}</Checkbox>,
    }))}
  />
);

const CustomColumn = () => {
  return (
    <Dropdown overlay={menu}>
      <Button type="primary" ghost>
        Custom Column
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

CustomColumn.propTypes = {};

export default CustomColumn;
