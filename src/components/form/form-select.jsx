// import PropTypes from 'prop-types'
import { PlusOutlined } from "@ant-design/icons";
import { Select, Divider } from "antd";
import { Item, AddSelect } from "styles/styled";

const { Option } = Select;

const FormSelect = ({
  name,
  label,
  required = false,
  rules,
  options,
  showSearch = true,
  isKeyLabel = true,
  dropdownRender,
  classNameOption,
  ...props
}) => {
  return (
    <Item name={name} label={label} rules={rules} required={required}>
      <Select
        showSearch={showSearch}
        {...props}
        style={{
          width: "100%",
        }}
        dropdownRender={
          dropdownRender
            ? originNode => (
                <>
                  {originNode}
                  <Divider dashed style={{ margin: 0 }} />
                  <AddSelect onClick={dropdownRender?.onAdd}>
                    <PlusOutlined />
                    {dropdownRender?.text}
                  </AddSelect>
                </>
              )
            : undefined
        }
      >
        {isKeyLabel
          ? options?.map(({ key, label }) => (
              <Option
                key={key}
                value={isNaN(+key) ? key : +key}
                label={label}
                className={classNameOption}
              >
                {label}
              </Option>
            ))
          : options?.map(item => (
              <Option key={item} value={item} label={item}>
                {item}
              </Option>
            ))}
      </Select>
    </Item>
  );
};

FormSelect.propTypes = {};

export default FormSelect;
