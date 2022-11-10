// import PropTypes from 'prop-types'
import { Form, Input } from "antd";

const FormTextInput = ({ placeholder, inputClassName, ...props }) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={placeholder} className={inputClassName} />
    </Form.Item>
  );
};

FormTextInput.propTypes = {};

export default FormTextInput;
