import { Card, Button, Row, Col } from "antd";
import PropTypes from "prop-types";

const CustomSearch = ({
  value,
  onSearch,
  // onChange,
  onReset,
  // placeholder,
  children,
}) => {
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
            disabled={!value || value.length === 0}
            onClick={onSearch}
            type="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </Col>
        {children}
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
