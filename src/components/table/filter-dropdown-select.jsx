import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
// import PropTypes from 'prop-types'

import CustomSearchSelect from "./custom-search-select";

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
        ? JSON.parse("[" + paramsRouter[keySearch] + "]")
        : []
      : +paramsRouter[keySearch] || null
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
      ? setValue(
          paramsRouter[keySearch]
            ? JSON.parse("[" + paramsRouter[keySearch] + "]")
            : []
        )
      : setValue(+paramsRouter[keySearch] || null);
  }, [paramsRouter[keySearch]]);

  return (
    <CustomSearchSelect
      placeholder={placeholder}
      onSearch={onSearch}
      onChange={onChange}
      onReset={onReset}
      options={options}
      value={value}
      mode={isMutiple ? "multiple" : undefined}
    />
  );
};

FilterDropdownSelect.propTypes = {};

export default FilterDropdownSelect;
