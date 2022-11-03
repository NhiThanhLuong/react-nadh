import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";

// import PropTypes from 'prop-types'
import CustomSearch from "./custom-search";
import InputSearch from "./type_search_filter/input-search";

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
    <CustomSearch value={value} onSearch={onSearch} onReset={onReset}>
      <InputSearch
        value={value}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
      />
    </CustomSearch>
  );
};

FilterDropdownText.propTypes = {};

export default FilterDropdownText;
