/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
// import PropTypes from "prop-types";

import CustomSearch from "./custom-search";
import SelectSearch from "./type_search_filter/select-search";
import { deleteKeyNull } from "ultis/func";
import { Col } from "antd";

const FilterDropdown2Select = ({
  keySearch1,
  keySearch2,
  placeholder1,
  placeholder2,
  paramsRouter,
  setSearchParams,
  resetPage,
  options1,
  options2,
  getOptions2,
}) => {
  const [value1, setValue1] = useState(+paramsRouter[keySearch1] || null);
  const [value2, setValue2] = useState(+paramsRouter[keySearch2] || null);

  useEffect(() => {
    setValue1(+paramsRouter[keySearch1] || null);
    setValue2(+paramsRouter[keySearch2] || null);
  }, [paramsRouter[keySearch1], paramsRouter[keySearch2]]);

  const onChangeKeySearch1 = async value => {
    setValue2(null);
    getOptions2(value);
    setValue1(() => value);
  };

  const onSearch = () => {
    resetPage();
    const params = {
      [keySearch1]: value1,
      [keySearch2]: value2,
    };
    !value2 && delete paramsRouter[keySearch2];
    deleteKeyNull(params);
    setSearchParams(
      createSearchParams({
        ...paramsRouter,
        ...params,
      })
    );
  };
  const onReset = () => {
    resetPage();
    setValue1(null);
    setValue2(null);
    delete paramsRouter[keySearch1];
    delete paramsRouter[keySearch2];
    setSearchParams(createSearchParams(paramsRouter));
  };

  return (
    <CustomSearch onSearch={onSearch} onReset={onReset} disabled={!value1}>
      <Col span={24}>
        <SelectSearch
          placeholder={placeholder1}
          onChange={onChangeKeySearch1}
          options={options1}
          // mode={isMutiple ? "multiple" : undefined}
          value={value1}
        />
      </Col>
      <Col span={24}>
        <SelectSearch
          isDisabled={!value1}
          placeholder={placeholder2}
          onChange={val => setValue2(val)}
          options={options2}
          // mode={isMutiple ? "multiple" : undefined}
          value={value2}
        />
      </Col>
    </CustomSearch>
  );
};

FilterDropdown2Select.propTypes = {};

export default FilterDropdown2Select;
