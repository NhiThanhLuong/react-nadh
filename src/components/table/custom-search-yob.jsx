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

const CustomSearchYob = ({
  onSearch,
  onReset,
  yobFrom,
  onChangeFrom,
  yobTo,
  onChangeTo,
}) => {
  const isDisableSearch = validation(yobFrom, yobTo);
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
            value={yobFrom}
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
            value={yobTo}
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

CustomSearchYob.propTypes = {
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
};

export default CustomSearchYob;
