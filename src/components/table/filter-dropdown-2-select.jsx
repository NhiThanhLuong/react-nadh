import { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";
// import PropTypes from 'prop-types'

import CustomSearch from "./custom-search";
import SelectSearch from "./type_search_filter/select-search";

const FilterDropdown2Select = () => {
  const [country, setCountry] = useState(
    parseInt(paramsRouter.country) || null
  );
  const [city, setCity] = useState(parseInt(paramsRouter.city) || null);

  const onChangeCountry = value => {
    setCountry(value);
    if (!value) setCity(null);
    dispatch(
      fetchCities({
        parent_id: value,
      })
    );
  };

  const onSearch = () => {
    resetPage();
    const params = {
      country,
      city,
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
    setCountry(null);
    setCity(null);
    delete paramsRouter.country;
    delete paramsRouter.city;
    setSearchParams(createSearchParams(paramsRouter));
  };

  useEffect(() => {
    setCountry(parseInt(paramsRouter.country) || null);
    setCity(parseInt(paramsRouter.city) || null);
  }, [paramsRouter.country, paramsRouter.city]);
  return (
    <CustomSearch onSearch={onSearch} onReset={onReset} value={value}>
      <SelectSearch
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        mode={isMutiple ? "multiple" : undefined}
        value={value}
      />
      <SelectSearch
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        mode={isMutiple ? "multiple" : undefined}
        value={value}
      />
    </CustomSearch>
  );
};

FilterDropdown2Select.propTypes = {};

export default FilterDropdown2Select;
