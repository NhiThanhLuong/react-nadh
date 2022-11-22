/* eslint-disable no-unused-vars */
import { Col, DatePicker } from "antd";
import { useEffect, useState } from "react";
import CustomSearch from "./custom-search";

const FilterDropdownRangeDate = ({
  paramsRouter,
  resetPage,
  setSearchParams,
  keySearchFrom,
  keySearchTo,
}) => {
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);

  useEffect(() => {
    setTimeFrom(paramsRouter[keySearchFrom]);
    setTimeTo(paramsRouter[keySearchTo]);
  }, [paramsRouter[keySearchFrom], paramsRouter[keySearchTo]]);

  const onChangeFrom = (_, dateString) => {
    setTimeFrom(dateString);
    console.log(dateString);
  };

  const onChangeTo = (_, dateString) => {
    setTimeTo(dateString);
  };

  return (
    <CustomSearch widthCard={400}>
      <Col span={12}>
        <DatePicker
          className="w-full"
          placeholder="From"
          onChange={onChangeFrom}
        />
      </Col>
      <Col span={12}>
        <DatePicker className="w-full" placeholder="To" onChange={onChangeTo} />
      </Col>
    </CustomSearch>
  );
};

export default FilterDropdownRangeDate;
