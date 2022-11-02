/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item
          </a>
        ),
      },
    ]}
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
