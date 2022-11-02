import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";

// import PropTypes from 'prop-types'
import CustomSearch from "./custom-search";

const FilterDropdownText = ({
  paramsRouter,
  placeholder,
  keySearch,
  resetPage,
  setSearchParams,
}) => {
  const [value, setValue] = useState(paramsRouter[keySearch] || "");

  const onSearch = () => {
    resetPage();
    setSearchParams(
      createSearchParams({
        ...paramsRouter,
        [keySearch]: value,
      })
    );
  };
  const onReset = () => {
    resetPage();
    setValue("");
    delete paramsRouter[keySearch];
    setSearchParams(createSearchParams(paramsRouter));
  };

  useEffect(() => {
    setValue(paramsRouter[keySearch] || null);
  }, [paramsRouter[keySearch]]);

  return (
    <CustomSearch
      placeholder={placeholder}
      value={value}
      onSearch={onSearch}
      onChange={e => setValue(e.target.value)}
      onReset={onReset}
    />
  );
};

FilterDropdownText.propTypes = {};

export default FilterDropdownText;
