/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Row, Col, Card, Select, Radio, Button } from "antd";
import { FaMinusCircle } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDetailCandidate,
  fetchEditDetailCandidate,
} from "features/candidatesSlice";
import {
  candidate_priority_status,
  DAYS_RANGE,
  MONTHS,
  GENDERS,
  MARITAL_STATUS,
  RELOCATING_WILLINGNESS,
} from "ultis/const";
import { pad2, formatDate, years, formatDDMMYYYY } from "ultis/func";

const { Item } = Form;
const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const DetailCandidate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [form] = Form.useForm();

  const {
    candidates: { detailData, loading },
    location: { countries, cities },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchDetailCandidate(id));
    console.log("form values", form.getFieldsValue());
  }, []);

  const onFinish = values => {
    console.log(values);
    dispatch(
      fetchEditDetailCandidate({
        id: detailData.id,
        params: {
          overview_text_new: "aaaa",
        },
      })
    );
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log("changedValues", changedValues);
    console.log("allValues", allValues);
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          {!loading && !!detailData ? (
            <Form
              form={form}
              onValuesChange={onValuesChange}
              validateMessages={validateMessages}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              initialValues={{
                overview: detailData?.overview_text_new,
                first_name: detailData?.first_name,
                last_name: detailData?.last_name,
                priority_status: detailData?.priority_status,
                dob: detailData?.dob,
                gender: detailData?.gender,
                martial_status: detailData?.extra?.martial_status,
                relocating_willingness: detailData?.relocating_willingness,
                creator_full_name: detailData?.creator?.full_name,
                createdAt: formatDDMMYYYY(detailData?.createdAt),
                emails: detailData?.emails,
                phones: detailData?.phones,
              }}
            >
              <Button onClick={() => console.log(form.getFieldsValue())}>
                test
              </Button>
              <Card style={{ marginBottom: 16 }}>
                <Item name="overview" label="Overview">
                  <Input.TextArea placeholder="Overview" />
                </Item>
              </Card>
              <Card title="Personal Information" style={{ marginBottom: 16 }}>
                {/* First & Last Name */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <Item
                      name="first_name"
                      label="First Name"
                      required
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Please enter the first name" />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item
                      name="last_name"
                      label="Last Name"
                      required
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input placeholder="Please enter the last name" />
                    </Item>
                  </Col>
                </Row>
                {/* Middle name & Primary status */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <Item name="middle_name" label="Middle Name">
                      <Input placeholder="Please Input Middle Name" />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item name="priority_status" label="Primary status">
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        style={{
                          width: "100%",
                        }}
                      >
                        {candidate_priority_status.map(({ key, label }) => (
                          <Option key={key} value={+key} label={label}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                </Row>
                {/* Birthday */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <Item name="dob" label="Birthday">
                      <Row gutter={16}>
                        <Col span={8}>
                          <Item name="birth_year">
                            <Select
                              allowClear
                              showSearch
                              optionFilterProp="label"
                              defaultValue={+formatDate(detailData?.dob).day}
                              style={{
                                width: "100%",
                              }}
                            >
                              {DAYS_RANGE.map(day => (
                                <Option
                                  key={day}
                                  value={+day}
                                  label={pad2(day)}
                                >
                                  {pad2(day)}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col span={8}>
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            defaultValue={+formatDate(detailData?.dob).month}
                            style={{
                              width: "100%",
                            }}
                          >
                            {MONTHS.map(({ key, label }) => (
                              <Option key={key} value={key} label={label}>
                                {label}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col span={8}>
                          <Select
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            defaultValue={+formatDate(detailData?.dob).year}
                            style={{
                              width: "100%",
                            }}
                          >
                            {years().map(year => (
                              <Option key={year} value={year} label={year}>
                                {year}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                      </Row>
                    </Item>
                  </Col>
                </Row>
                {/* Gender & Marital status */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <Item name="gender" label="Gender">
                      <Radio.Group>
                        {GENDERS.map(({ key, label }) => (
                          <Radio key={key} value={key} label={label}>
                            {label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item name="martial_status" label="Marital Status">
                      <Radio.Group>
                        {MARITAL_STATUS.map(({ key, label }) => (
                          <Radio key={key} value={key} label={label}>
                            {label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Item>
                  </Col>
                </Row>
                {/* Ready to move */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <Item name="relocating_willingness" label="Ready to move">
                      <Select
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        style={{
                          width: "100%",
                        }}
                      >
                        {RELOCATING_WILLINGNESS.map(({ key, label }) => (
                          <Option key={key} value={+key} label={label}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={12}></Col>
                </Row>
                {/* Creator */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <Item name="creator_full_name" label="Created by">
                      <Input disabled />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Item name="createdAt" label="Created by">
                      <Input disabled />
                    </Item>
                  </Col>
                </Row>
                {/* Emails */}
                <Row gutter={(16, 16)}>
                  <Col span={22}>
                    <Item label="Email" required>
                      <Form.List name="emails" label="Email" required>
                        {(fields, { add, remove }) => {
                          console.log(fields);
                          return (
                            <div>
                              {fields.map(field => (
                                <Row
                                  key={field.key}
                                  align="middle"
                                  style={{ marginBottom: 16 }}
                                >
                                  <Col span={20}>
                                    <Form.Item
                                      {...field}
                                      rules={[
                                        {
                                          type: "email",
                                          message:
                                            "The input is not valid E-mail!",
                                        },
                                        {
                                          required: true,
                                          message: "Please input your E-mail!",
                                        },
                                      ]}
                                      style={{ margin: 0 }}
                                    >
                                      <Input
                                        style={{
                                          width: "65%",
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <FaMinusCircle
                                    color="red"
                                    onClick={() => remove(field.name)}
                                  />
                                </Row>
                              ))}
                              <Button
                                type="primary"
                                ghost
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => add()}
                                style={{
                                  width: "50%",
                                  height: 30,
                                  marginLeft: "30%",
                                  marginRight: "20%",
                                }}
                              >
                                Add Email
                              </Button>
                            </div>
                          );
                        }}
                      </Form.List>
                    </Item>
                  </Col>
                </Row>
                {/* Phone */}
                <Row gutter={(16, 16)}>
                  <Col>
                    <Item label="Mobile Phone" required>
                      <Form.List name="phones" label="Email" required>
                        {(fields, { add, remove }) => {
                          console.log(fields);
                          return (
                            <div>
                              {fields.map(({ key, name, ...restField }) => (
                                <Row
                                  key={key}
                                  align="middle"
                                  style={{ marginBottom: 16 }}
                                >
                                  <Col span={20}>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "number"]}
                                      style={{ margin: 0 }}
                                    >
                                      <Input
                                        style={{
                                          width: "65%",
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <FaMinusCircle
                                    color="red"
                                    onClick={() => remove(name)}
                                  />
                                </Row>
                              ))}
                              <Button
                                type="primary"
                                ghost
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => add()}
                                style={{
                                  width: "50%",
                                  height: 30,
                                  marginLeft: "30%",
                                  marginRight: "20%",
                                }}
                              >
                                Add Phone
                              </Button>
                            </div>
                          );
                        }}
                      </Form.List>
                    </Item>
                  </Col>
                </Row>
                {/* Address */}
                <Row gutter={(16, 16)}>
                  <Col span={24}>
                    <Item label="Address">
                      <Form.List name="addresses">
                        {(fields, { add, remove }) => {
                          console.log(fields);
                          return (
                            <div>
                              {fields.map(({ key, name, ...restField }) => (
                                <Row
                                  key={key}
                                  align="middle"
                                  style={{ marginBottom: 16 }}
                                >
                                  <Col span={22}>
                                    <Row>
                                      <Col span={8}>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "country", "key"]}
                                          style={{ margin: 0 }}
                                        >
                                          <Select
                                            allowClear
                                            showSearch
                                            optionFilterProp="label"
                                            style={{
                                              width: "100%",
                                            }}
                                          >
                                            {candidate_priority_status.map(
                                              ({ key, label }) => (
                                                <Option
                                                  key={key}
                                                  value={+key}
                                                  label={label}
                                                >
                                                  {label}
                                                </Option>
                                              )
                                            )}
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <FaMinusCircle
                                    color="red"
                                    onClick={() => remove(name)}
                                  />
                                </Row>
                              ))}
                              <Button
                                type="primary"
                                ghost
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => add()}
                                style={{
                                  width: "50%",
                                  height: 30,
                                  marginLeft: "30%",
                                  marginRight: "20%",
                                }}
                              >
                                Add Address
                              </Button>
                            </div>
                          );
                        }}
                      </Form.List>
                    </Item>
                  </Col>
                </Row>
              </Card>
              <Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Item>
            </Form>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

DetailCandidate.propTypes = {};

export default DetailCandidate;
