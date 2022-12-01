import { Col, InputNumber } from "antd";
import PropTypes from "prop-types";
import CustomSearch from "./custom-search";

const validation = (yearFrom, yearTo) => {
  if (!yearFrom && !yearTo) return {};
  if (!yearFrom || !yearTo) return;
  if (yearFrom >= yearTo) {
    return {
      er1: "Must be lower than to's value",
      er2: "Must be higher than from's value",
    };
  }
};

const CustomSearchYearRange = ({
  onSearch,
  onReset,
  yearFrom,
  onChangeFrom,
  yearTo,
  onChangeTo,
}) => {
  const isDisableSearch = validation(yearFrom, yearTo);
  return (
    <CustomSearch
      onReset={onReset}
      onSearch={onSearch}
      disabled={isDisableSearch}
      widthCard={400}
    >
      <Col span={12}>
        <InputNumber
          min={0}
          value={yearFrom}
          onChange={onChangeFrom}
          placeholder="From"
          type="number"
          style={{
            width: "100%",
          }}
        />
        <p style={{ color: "#b91c1c", fontWeight: "500" }}>
          {isDisableSearch && isDisableSearch.er1}
        </p>
      </Col>
      <Col span={12}>
        <InputNumber
          min={0}
          value={yearTo}
          onChange={onChangeTo}
          placeholder="To"
          type="number"
          style={{
            width: "100%",
          }}
        />
        <p style={{ color: "#b91c1c", fontWeight: "500" }}>
          {isDisableSearch && isDisableSearch.er2}
        </p>
      </Col>
    </CustomSearch>
  );
};

CustomSearchYearRange.propTypes = {
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
};

export default CustomSearchYearRange;
