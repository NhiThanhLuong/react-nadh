import { Card, Input, Button, Row, Col } from "antd";
import PropTypes from "prop-types";

const CustomSearch = ({ value, onSearch, onChange, onReset, placeholder }) => {
  return (
    <Card
      size="small"
      style={{
        width: "200px",
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
            disabled={!value}
            onClick={onSearch}
            type="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </Col>
        <Col span={24}>
          <Input
            onChange={onChange}
            placeholder={placeholder}
            type="text"
            value={value}
            style={{
              width: "100%",
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

CustomSearch.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CustomSearch;
