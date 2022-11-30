import { Col } from "antd";
import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
// import PropTypes from 'prop-types'

import CustomSearch from "./custom-search";
import SelectSearch from "./type_search_filter/select-search";

const getArr = text => {
  try {
    return JSON.parse("[" + text + "]");
  } catch {
    return text.split(",");
  }
};

const FilterDropdownSelect = ({
  paramsRouter,
  keySearch,
  placeholder,
  resetPage,
  setSearchParams,
  options,
  isMutiple,
}) => {
  const [value, setValue] = useState(
    isMutiple
      ? paramsRouter[keySearch]
        ? getArr(paramsRouter[keySearch])
        : []
      : +paramsRouter[keySearch] || paramsRouter[keySearch] || null
  );

  const onChange = val => {
    setValue(val);
  };
  const onSearch = () => {
    resetPage();
    setSearchParams(
      createSearchParams({
        ...paramsRouter,
        [keySearch]: isMutiple ? value + "" : value,
      })
    );
  };
  const onReset = () => {
    resetPage();
    isMutiple ? setValue([]) : setValue(null);
    delete paramsRouter[keySearch];
    setSearchParams(createSearchParams(paramsRouter));
  };

  useEffect(() => {
    isMutiple
      ? setValue(paramsRouter[keySearch] ? getArr(paramsRouter[keySearch]) : [])
      : setValue(+paramsRouter[keySearch] || null);
  }, [paramsRouter[keySearch]]);

  return (
    <CustomSearch
      onSearch={onSearch}
      onReset={onReset}
      disabled={!value || value.length === 0}
    >
      <Col span={24}>
        <SelectSearch
          placeholder={placeholder}
          onChange={onChange}
          options={options}
          mode={isMutiple ? "multiple" : undefined}
          value={value}
        />
      </Col>
    </CustomSearch>
  );
};

FilterDropdownSelect.propTypes = {};

export default FilterDropdownSelect;
