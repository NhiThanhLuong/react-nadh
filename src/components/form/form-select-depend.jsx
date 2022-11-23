import { Form } from "antd";
import FormSelect from "./form-select";

const FormSelectDepend = ({ name_parent, ...props }) => {
  return (
    <Form.Item dependencies={[name_parent]} className="m-0">
      {({ getFieldValue }) => {
        const parent = getFieldValue(name_parent);
        return <FormSelect {...props} disabled={!parent} />;
      }}
    </Form.Item>
  );
};

export default FormSelectDepend;
