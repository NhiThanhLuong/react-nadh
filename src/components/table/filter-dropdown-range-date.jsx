import { Col, DatePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { createSearchParams } from "react-router-dom";
import { deleteKeyNull } from "ultis/func";
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
    setTimeFrom(
      paramsRouter[keySearchFrom] ? moment(paramsRouter[keySearchFrom]) : null
    );
    setTimeTo(
      paramsRouter[keySearchTo] ? moment(paramsRouter[keySearchTo]) : null
    );
  }, [paramsRouter[keySearchFrom], paramsRouter[keySearchTo]]);

  const onSearch = () => {
    resetPage();
    const params = {
      [keySearchFrom]: timeFrom,
      [keySearchTo]: timeTo,
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
    delete paramsRouter[keySearchFrom];
    delete paramsRouter[keySearchTo];
    setSearchParams(createSearchParams(paramsRouter));
  };

  const onChangeFrom = (_, dateString) => {
    setTimeFrom(dateString);
  };

  const onChangeTo = (_, dateString) => {
    setTimeTo(dateString);
  };

  return (
    <CustomSearch
      widthCard={400}
      onSearch={onSearch}
      onReset={onReset}
      disabled={!timeFrom && !timeTo}
    >
      <Col span={12}>
        <DatePicker
          className="w-full"
          placeholder="From"
          value={timeFrom ? moment(timeFrom) : null}
          disabledDate={current =>
            current && current.valueOf() > moment(timeTo)
          }
          onChange={onChangeFrom}
        />
      </Col>
      <Col span={12}>
        <DatePicker
          className="w-full"
          placeholder="To"
          value={timeTo ? moment(timeTo) : null}
          disabledDate={current =>
            current && current.valueOf() < moment(timeFrom)
          }
          onChange={onChangeTo}
        />
      </Col>
    </CustomSearch>
  );
};

export default FilterDropdownRangeDate;
