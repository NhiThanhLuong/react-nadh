import { Checkbox, Col, Form, Input, Row } from "antd";
import { postContactPerson } from "features/clientSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "ultis/validate";

const FormContactPerson = ({ isAdd, client_id }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const pic_item = useSelector(state => state.client.pic_item);

  useEffect(() => {
    if (isAdd) form.resetFields();
    else
      form.setFieldsValue({
        ...pic_item,
        current: !!pic_item.current,
      });
  }, [pic_item, isAdd]);

  const onFinish = values => {
    const params = {
      ...values,
      client_id,
      role: 1,
    };
    if (isAdd) {
      dispatch(postContactPerson(params));
    } else {
      dispatch(postContactPerson(params));
    }
  };

  return (
    <Form form={form} layout="vertical" id="contact_person" onFinish={onFinish}>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Form.Item name="name" label="Name" rules={validator("required")}>
            <Input placeholder="Please Input Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="title" label="Title" rules={validator("required")}>
            <Input placeholder="Please Input Title" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="current"
            label="Current Contact"
            valuePropName="checked"
          >
            <Checkbox>Current Contact</Checkbox>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[...validator("email"), ...validator("required")]}
          >
            <Input placeholder="Please Input Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="telephone"
            label="Telephone"
            rules={validator("number")}
          >
            <Input placeholder="Please Input Telephone" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mobile_phone"
            label="Mobile Phone"
            rules={validator("number")}
          >
            <Input placeholder="Please Input Mobile Phone" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="fax" label="Fax">
            <Input placeholder="Please Input Fax" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="department" label="Department">
            <Input placeholder="Please Input Department" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="jobs_count" label="Job(s)">
            <Input placeholder="Please Input Job" disabled />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormContactPerson;
