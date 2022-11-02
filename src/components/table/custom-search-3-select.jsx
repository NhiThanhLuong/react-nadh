import { Card, Select, Button, Row, Col } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

const CustomSearch3Select = ({
  placeholder1,
  placeholder2,
  placeholder3,
  onSearch,
  onReset,
  onChange1,
  onChange2,
  onChange3,
  value1,
  value2,
  value3,
  options1,
  options2,
  options3,
}) => {
  return (
    <Card
      size="small"
      style={{
        width: "220px",
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
            disabled={!value1}
            onClick={onSearch}
            type="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </Col>
        <Col span={24}>
          <Select
            notFoundContent={<p>Not Found</p>}
            allowClear
            showSearch
            optionFilterProp="label"
            onChange={onChange1}
            placeholder={`Select ${placeholder1}`}
            value={value1}
            style={{
              width: "100%",
            }}
          >
            {options1.map(({ key, label }) => (
              <Option key={key} value={key} label={label}>
                {label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Select
            disabled={!value1}
            allowClear
            showSearch
            optionFilterProp="label"
            onChange={onChange2}
            placeholder={`Select ${placeholder2}`}
            value={value2}
            style={{
              width: "100%",
            }}
          >
            {options2.map(({ key, label }) => (
              <Option key={key} value={key} label={label}>
                {label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Select
            disabled={!value2}
            allowClear
            showSearch
            optionFilterProp="label"
            onChange={onChange3}
            placeholder={`Select ${placeholder3}`}
            value={value3}
            style={{
              width: "100%",
            }}
          >
            {options3?.map(({ key, label }) => (
              <Option key={key} value={key} label={label}>
                {label}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

CustomSearch3Select.propTypes = {
  placeholder1: PropTypes.string.isRequired,
  placeholder2: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onChange1: PropTypes.func.isRequired,
  onChange2: PropTypes.func.isRequired,
  value1: PropTypes.string,
  value2: PropTypes.string,
  options1: PropTypes.array,
  options2: PropTypes.array,
};

export default CustomSearch3Select;
