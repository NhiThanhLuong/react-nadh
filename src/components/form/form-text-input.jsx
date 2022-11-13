// import PropTypes from 'prop-types'
import {  Input } from "antd";
import { Item } from "styles/styled";

const FormTextInput = ({ placeholder, inputClassName, ...props }) => {
  return (
    <Item {...props}>
      <Input placeholder={placeholder} className={inputClassName} />
    </Item>
  );
};

FormTextInput.propTypes = {};

export default FormTextInput;
