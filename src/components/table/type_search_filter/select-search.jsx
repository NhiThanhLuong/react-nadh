import React from "react";
// import PropTypes from 'prop-types'
import { Select } from "antd";

const { Option } = Select;

const SelectSearch = ({
  mode,
  onChange,
  placeholder,
  options,
  value,
  isDisabled,
  classNameOption = "capitalize",
}) => {
  return (
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
        <Option
          key={key}
          value={+key || key}
          label={label}
          className={classNameOption}
        >
          {label}
        </Option>
      ))}
    </Select>
  );
};

SelectSearch.propTypes = {};

export default SelectSearch;
