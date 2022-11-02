import { Card, Select, Button, Row, Col } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

const CustomSearchSelect = ({
  placeholder,
  onSearch,
  onReset,
  onChange,
  value,
  options,
  mode,
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
            mode={mode}
            allowClear
            showSearch
            optionFilterProp="label"
            onChange={onChange}
            placeholder={`Select ${placeholder}`}
            value={value}
            style={{
              width: "100%",
            }}
          >
            {options.map(({ key, label }) => (
              <Option key={key} value={+key} label={label}>
                {label}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

CustomSearchSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.array,
  mode: PropTypes.string,
};

export default CustomSearchSelect;
