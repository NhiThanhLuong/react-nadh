import React from "react";
// import PropTypes from 'prop-types'
import { Col, Select } from "antd";

const { Option } = Select;

const SelectSearch = ({
  mode,
  onChange,
  placeholder,
  options,
  value,
  isDisabled,
}) => {
  return (
    <Col span={24}>
      <Select
        disabled={isDisabled}
        mode={mode}
        allowClear
        showSearch
        optionFilterProp="label"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        style={{
          width: "100%",
        }}
      >
        {options.map(({ key, label }) => (
          <Option key={key} value={+key} label={label}>
            {label}
          </Option>
        ))}
      </Select>
    </Col>
  );
};

SelectSearch.propTypes = {};

export default SelectSearch;
