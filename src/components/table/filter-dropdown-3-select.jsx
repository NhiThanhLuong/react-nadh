import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
// import PropTypes from "prop-types";

import CustomSearch from "./custom-search";
import SelectSearch from "./type_search_filter/select-search";
import { deleteKeyNull } from "ultis/func";
import { Col } from "antd";

const FilterDropdown3Select = ({
  keyIdFilter,
  keyTypeFilter,
  keySearch1,
  keySearch2,
  keySearch3,
  placeholder1,
  placeholder2,
  placeholder3,
  paramsRouter,
  setSearchParams,
  resetPage,
  options1,
  options2,
  options3,
  getOptions2,
  getOptions3,
}) => {
  const [value1, setValue1] = useState(+paramsRouter[keySearch1] || null);
  const [value2, setValue2] = useState(+paramsRouter[keySearch2] || null);
  const [value3, setValue3] = useState(+paramsRouter[keySearch3] || null);

  useEffect(() => {
    value1 &&
      getOptions2({
        parent_id: value1,
        type: 2,
      });
    value2 &&
      getOptions3({
        parent_id: value2,
        type: 3,
      });
    setValue1(+paramsRouter[keySearch1] || null);
    setValue2(+paramsRouter[keySearch2] || null);
    setValue3(+paramsRouter[keySearch3] || null);
  }, [
    paramsRouter[keySearch1],
    paramsRouter[keySearch2],
    paramsRouter[keySearch3],
  ]);

  const onChangeKeySearch1 = value => {
    setValue1(value);
    setValue2(null);
    setValue3(null);
    getOptions2({
      parent_id: value,
      type: 2,
    });
  };

  const onChangeKeySearch2 = value => {
    setValue2(value);
    setValue3(null);
    getOptions3({
      parent_id: value,
      type: 3,
    });
  };

  const onSearch = () => {
    resetPage();
    let params = {};
    if (value1 && value2 && value3)
      params = {
        [keyIdFilter]: value3,
        [keyTypeFilter]: 3,
      };
    else if (value1 && value2)
      params = {
        [keyIdFilter]: value2,
        [keyTypeFilter]: 2,
      };
    else if (value1)
      params = {
        [keyIdFilter]: value1,
        [keyTypeFilter]: 1,
      };

    const extraParams = {
      [keySearch1]: value1,
      [keySearch2]: value2,
      [keySearch3]: value3,
    };
    !value2 && delete paramsRouter[keySearch2];
    !value3 && delete paramsRouter[keySearch3];
    deleteKeyNull(extraParams);

    setSearchParams(
      createSearchParams({
        ...paramsRouter,
        ...params,
        ...extraParams,
      })
    );
    // !value2 && delete paramsRouter[keySearch2];
    // !value3 && delete paramsRouter[keySearch3];
    // deleteKeyNull(params);
    // setSearchParams(
    //   createSearchParams({
    //     ...paramsRouter,
    //     ...params,
    //   })
    // );
  };
  const onReset = () => {
    resetPage();
    setValue1(null);
    setValue2(null);
    setValue3(null);
    delete paramsRouter[keySearch1];
    delete paramsRouter[keySearch2];
    delete paramsRouter[keySearch3];
    delete paramsRouter[keyIdFilter];
    delete paramsRouter[keyTypeFilter];
    setSearchParams(createSearchParams(paramsRouter));
  };

  return (
    <CustomSearch onSearch={onSearch} onReset={onReset} value={value1}>
      <Col span={24}>
        <SelectSearch
          placeholder={placeholder1}
          onChange={onChangeKeySearch1}
          options={options1}
          value={value1}
        />
      </Col>
      <Col span={24}>
        <SelectSearch
          isDisabled={!value1}
          placeholder={placeholder2}
          onChange={onChangeKeySearch2}
          options={options2}
          value={value2}
        />
      </Col>
      <Col span={24}>
        <SelectSearch
          isDisabled={!value2}
          placeholder={placeholder3}
          onChange={val => setValue3(val)}
          options={options3}
          value={value3}
        />
      </Col>
    </CustomSearch>
  );
};

FilterDropdown3Select.propTypes = {};

export default FilterDropdown3Select;
