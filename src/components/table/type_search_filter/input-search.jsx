// import PropTypes from 'prop-types'
import { Col, Input } from "antd";

const InputSearch = ({ onChange, placeholder, value }) => {
  return (
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
  );
};

InputSearch.propTypes = {};

export default InputSearch;
