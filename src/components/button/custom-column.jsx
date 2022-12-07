/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Form, Menu } from "antd";
import { CUSTOM_COLUMNS } from "ultis/const";

const CustomColumn = () => {
  const menu = (
    <Menu
      onClick={e => {
        e.stopPropagation();
      }}
      items={CUSTOM_COLUMNS.jobs.map(item => ({
        key: item.title,
        label: (
          <Form.Item name={item.title} className="m-0" valuePropName="checked">
            <Checkbox disabled={item.disabled || false}>{item.label}</Checkbox>
          </Form.Item>
        ),
      }))}
    />
  );

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
