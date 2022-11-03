import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
// import PropTypes from 'prop-types'

import CustomSearchYearRange from "./custom-search-year-range";
import { deleteKeyNull } from "ultis/func";

const FilterDropdownRange = ({
  paramsRouter,
  keySearchFrom,
  keySearchTo,
  //   placeholder,
  resetPage,
  setSearchParams,
}) => {
  const [yearFrom, setYearFrom] = useState();
  const [yearTo, setYearTo] = useState();

  useEffect(() => {
    setYearFrom(paramsRouter[keySearchFrom]);
    setYearTo(paramsRouter[keySearchTo]);
  }, [paramsRouter[keySearchFrom], paramsRouter[keySearchTo]]);

  const onSearch = () => {
    resetPage();
    const params = {
      [keySearchFrom]: yearFrom,
      [keySearchTo]: yearTo,
    };
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
    setYearFrom();
    setYearTo();
    delete paramsRouter[keySearchFrom];
    delete paramsRouter[keySearchTo];
    setSearchParams(createSearchParams(paramsRouter));
  };

  return (
    <CustomSearchYearRange
      yearFrom={yearFrom}
      onChangeFrom={value => setYearFrom(value)}
      yearTo={yearTo}
      onChangeTo={value => setYearTo(value)}
      onSearch={onSearch}
      onReset={onReset}
    />
  );
};

FilterDropdownRange.propTypes = {};

export default FilterDropdownRange;
