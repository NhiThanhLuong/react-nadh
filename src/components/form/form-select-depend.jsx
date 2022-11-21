import { Form } from "antd";
import FormSelect from "./form-select";

const FormSelectDepend = ({ name_parent, ...props }) => {
  return (
    <Form.Item dependencies={[name_parent]}>
      {({ getFieldValue }) => {
        const parent = getFieldValue(name_parent);
        return <FormSelect {...props} disabled={!parent} />;
      }}
    </Form.Item>
  );
};

export default FormSelectDepend;
