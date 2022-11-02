/* eslint-disable no-unused-vars */
import { Card, Button, Row, Col, InputNumber } from "antd";
import PropTypes from "prop-types";

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
    <Card
      size="small"
      style={{
        width: "400px",
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button onClick={onReset} size="small" style={{ width: "100%" }}>
            Reset
          </Button>
        </Col>
        <Col span={12}>
          <Button
            disabled={isDisableSearch}
            onClick={onSearch}
            type="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </Col>
        <Col span={12}>
          <InputNumber
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
      </Row>
    </Card>
  );
};

CustomSearchYearRange.propTypes = {
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
};

export default CustomSearchYearRange;
