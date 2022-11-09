/* eslint-disable no-unused-vars */
// import React from 'react'
// import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinusCircle } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  Form,
  Input,
  Row,
  Col,
  Card,
  Select,
  Radio,
  Button,
  Divider,
  InputNumber,
} from "antd";
import {
  candidate_priority_status,
  DAYS_RANGE,
  MONTHS,
  GENDERS,
  MARITAL_STATUS,
  RELOCATING_WILLINGNESS,
} from "ultis/const";
import {
  pad2,
  formatDate,
  years,
  formatDDMMYYYY,
  isEmpty,
  get_array_obj_key_label_from_array_key,
  format_day_month_year_to_date,
  getPropertyKeyLabelObj,
} from "ultis/func";
import validator from "ultis/validate";
import { fetchPostCandidate } from "features/candidatesSlice";
import { fetchDegrees } from "features/degreeSlice";
import {
  fetchSoftSkills,
  putSoftSkillDetailCandidate,
} from "features/skillSlice";
import { fetchCities, fetchDistricts } from "features/locationSlice";

const { Item } = Form;
const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    // number: "${label} is not a valid number!",
  },
  //   number: {
  //     range: "${label} must be between ${min} and ${max}",
  //   },
};

const AddCandidate = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [dayBirth, setDayBirth] = useState(null);
  const [monBirth, setMonBirth] = useState(null);
  const [yearBirth, setYearBirth] = useState(null);

  const [fieldValues, setFieldValues] = useState({});

  const {
    location: { countries, cities, districts },
    nationality: { nationalities },
    position: { positions },
    degree: { degrees },
  } = useSelector(state => state);

  const onValuesChange = (changedValues, allValues) => {
    setFieldValues(prevState => ({ ...prevState, ...changedValues }));

    ;
    console.log("allValues", allValues);
  };

  const onFinish = values => {
    console.log("values", values);
    console.log("fieldValues", fieldValues);

    if (fieldValues.addresses) fieldValues.addresses = form.getFieldsValue().addresses.map(item => {
      if (isEmpty(item.city)) delete item.city
      if (isEmpty(item.district)) delete item.district
      return item
    })

    if (fieldValues.nationality)
      fieldValues.nationality = get_array_obj_key_label_from_array_key(
        nationalities,
        fieldValues.nationality
      );

    if (
      fieldValues.day_of_birth ||
      fieldValues.month_of_birth ||
      fieldValues.year_of_birth
    ) {
      const { day_of_birth, month_of_birth, year_of_birth } =
        form.getFieldsValue();
      fieldValues.dob = format_day_month_year_to_date(
        day_of_birth,
        month_of_birth,
        year_of_birth
      );
      delete fieldValues.day_of_birth ||
        delete fieldValues.month_of_birth ||
        delete fieldValues.year_of_birth;
    }

    if (fieldValues.emails) {
      const { emails } = form.getFieldsValue();
      fieldValues.emails = emails;
    }

    if (fieldValues.phones) {
      const { phones } = form.getFieldsValue();
      fieldValues.phones = phones.map(item => ({
        ...item,
        current: -1,
        phone_code: {
          key: 1280,
          //   label: "Viet Nam",
          //   extra: { code: "VN", dial_code: "+84" },
        },
      }));
    }

    if (fieldValues.prefer_position) {
      fieldValues.prefer_position.positions =
        get_array_obj_key_label_from_array_key(
          positions,
          fieldValues.prefer_position.positions
        );
    }

    dispatch(
      fetchPostCandidate({
        relocating_willingness: 1,
        type: 3,
        addresses: [],
        current_emails: [],
        ...fieldValues,
      })
    );
    setFieldValues(() => ({}));
  };

  const onChangeBirthDay = () => {
    form.validateFields(["day_of_birth", "month_of_birth", "year_of_birth"]);
  };

  const onChangeCountry = (_,option, key) => {
    const addresses = form.getFieldValue("addresses")
    addresses[key].country = getPropertyKeyLabelObj(option)
    addresses[key].city = {};
    addresses[key].district= {};
  };

  const onChangeCity = (_,option, key) => {
    const addresses = form.getFieldValue("addresses")
    addresses[key].city = getPropertyKeyLabelObj(option)
    addresses[key].district= {};
  };

  const onChangeDistrict = (_, option, key) => {
    const addresses = form.getFieldValue("addresses")
    console.log(option);
    addresses[key].district = getPropertyKeyLabelObj(option)
  };

  const onDropdownCity = (key) => {
    const addresses = form.getFieldValue("addresses")
    dispatch(fetchCities({
      parent_id: addresses[key].country.key
    }))
  } 

  const onDropdownDistrict = (key) => {
    const addresses = form.getFieldValue("addresses")
    dispatch(fetchDistricts({
      parent_id: addresses[key].city.key
    }))
  } 

  const onSearchNationality = value => {
    // setNationalitySearch(() => value);
    // dispatch(
    //   fetchNationality({
    //     value,
    //   })
    // );
  };

  const onAddNationality = () => {
    // dispatch(postNationality(nationalitySearch));
  };

  const onSearchPosition = value => {
    // setPositionSearch(() => value);
    // dispatch(
    //   fetchPosition({
    //     value,
    //   })
    // );
  };

  const onAddPosition = () => {
    // dispatch(postPosition(positionSearch));
  };

  return (
    <div style={{ marginTop: 100 }}>
      <Form
        form={form}
        onValuesChange={onValuesChange}
        validateMessages={validateMessages}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        layout="vertical"
        initialValues={{
          relocating_willingness: 1,
          emails: [null],
          phones: [null],
          addresses: [null],
        }}
      >
        {/* Personal Information */}
        <Card
          title={<span style={{ color: "#465f7b" }}>Personal Information</span>}
          style={{ marginBottom: 16 }}
        >
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
                <Input
                  placeholder="Please enter the first name"
                  className="capitalize"
                />
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
                <Input
                  placeholder="Please enter the last name"
                  className="capitalize"
                />
              </Item>
            </Col>
          </Row>
          {/* Middle name & Primary status */}
          <Row gutter={(16, 16)}>
            <Col span={12}>
              <Item name="middle_name" label="Middle Name">
                <Input
                  placeholder="Please Input Middle Name"
                  className="capitalize"
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item name="priority_status" label="Primary status">
                <Select
                  placeholder="Select Primary Status"
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
                    <Item
                      name="day_of_birth"
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              value ||
                              (!getFieldValue("month_of_birth") &&
                                !getFieldValue("year_of_birth"))
                            ) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error("Please select Day!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Select
                        onChange={onChangeBirthDay}
                        placeholder="Date"
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        style={{
                          width: "100%",
                        }}
                      >
                        {DAYS_RANGE.map(day => (
                          <Option key={day} value={+day} label={pad2(day)}>
                            {pad2(day)}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item
                      name="month_of_birth"
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              value ||
                              (!getFieldValue("day_of_birth") &&
                                !getFieldValue("year_of_birth"))
                            ) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error("Please select Month")
                            );
                          },
                        }),
                      ]}
                    >
                      <Select
                        onChange={onChangeBirthDay}
                        placeholder="Month"
                        allowClear
                        showSearch
                        optionFilterProp="label"
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
                    </Item>
                  </Col>
                  <Col span={8}>
                    <Item
                      name="year_of_birth"
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              value ||
                              (!getFieldValue("day_of_birth") &&
                                !getFieldValue("month_of_birth"))
                            ) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error("Please select Year")
                            );
                          },
                        }),
                      ]}
                    >
                      <Select
                        onChange={onChangeBirthDay}
                        placeholder="Year"
                        allowClear
                        showSearch
                        optionFilterProp="label"
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
                    </Item>
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
            <Col span={12}>
              <Item name="source" label="Source">
                <Input placeholder="Please input source" />
              </Item>
            </Col>
          </Row>
          {/* Emails */}
          <Row gutter={(16, 16)}>
            <Col span={22}>
              <Item label="Email" required>
                <Form.List name="emails" label="Email" required>
                  {(fields, { add, remove }) => {
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
                                    message: "The input is not valid E-mail!",
                                  },
                                  {
                                    required: true,
                                    message: "Please input your E-mail!",
                                  },
                                ]}
                                style={{ margin: 0 }}
                              >
                                <Input
                                  placeholder="ex: abc@email.com"
                                  style={{
                                    width: "65%",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            {fields.length > 1 ? (
                              <FaMinusCircleRemove
                                onClick={() => remove(field.name)}
                              />
                            ) : null}
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
            <Col span={22}>
              <Item label="Mobile Phone" required>
                <Form.List name="phones" required>
                  {(fields, { add, remove }) => {
                    //   console.log(fields);
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
                                rules={[
                                  ...validator("number"),
                                  {
                                    required: true,
                                    message: "Please input mobile phone!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="ex: 0981345782"
                                  style={{
                                    width: "65%",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            {fields.length > 1 ? (
                              <FaMinusCircleRemove
                                onClick={() => remove(name)}
                              />
                            ) : null}
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
                            //   console.log(fields);
                            return (
                              <div>
                                {fields.map(({ key, name, ...restField }) => (
                                  <Row
                                    key={key}
                                    align="middle"
                                    style={{ marginBottom: 16 }}
                                  >
                                    <Col span={22}>
                                      <Row gutter={(16, 16)}>
                                        <Col span={8}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "country"]}
                                            style={{ margin: 0 }}
                                          >
                                            <Select
                                              placeholder="Country"
                                              allowClear
                                              showSearch
                                              optionFilterProp="label"
                                              style={{
                                                width: "100%",
                                              }}
                                              onChange={(value,option) =>
                                                onChangeCountry(value, option, key)
                                              }
                                            >
                                              {countries.map(country => (
                                                <Option
                                                  key={country.key}
                                                  value={country.key}
                                                  label={country.label}
                                                >
                                                  {country.label}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "city"]}
                                            style={{ margin: 0 }}
                                          >
                                            <Select
                                              placeholder="City"
                                              allowClear
                                              showSearch
                                              onDropdownVisibleChange={()=> onDropdownCity(key)}
                                              onChange={(value, option) => onChangeCity(value, option, key)}
                                              optionFilterProp="label"
                                              style={{
                                                width: "100%",
                                              }}
                                            >
                                              {cities.map(city => (
                                                <Option
                                                  key={city.key}
                                                  value={city.key}
                                                  label={city.label}
                                                >
                                                  {city.label}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "district"]}
                                            style={{ margin: 0 }}
                                          >
                                            <Select
                                              placeholder="District"
                                              onDropdownVisibleChange={()=> onDropdownDistrict(key)}
                                                onChange={(value, option) => onChangeDistrict(value, option,key)}
                                              allowClear
                                              showSearch
                                              optionFilterProp="label"
                                              style={{
                                                width: "100%",
                                              }}
                                            >
                                              {districts.map(district => (
                                                <Option
                                                  key={district.key}
                                                  value={district.key}
                                                  label={district.label}
                                                >
                                                  {district.label}
                                                </Option>
                                              ))}
                                            </Select>
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                      <Row style={{ marginTop: 8 }}>
                                        <Col span={24}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "address"]}
                                            style={{ margin: 0 }}
                                          >
                                            <Input placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower" />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <FaMinusCircleRemove
                                      style={{
                                        marginLeft: 16,
                                      }}
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
          {/* Nationality */}
          <Row gutter={(16, 16)}>
            <Col span={24}>
              <Item name="nationality" label="Nationality">
                <Select
                  mode="multiple"
                  placeholder="Select or add your nationality"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  style={{
                    width: "100%",
                  }}
                  onSearch={onSearchNationality}
                  dropdownRender={originNode => (
                    <>
                      {originNode}
                      <Divider dashed style={{ margin: 0 }} />
                      <AddSelect onClick={onAddNationality}>
                        <PlusOutlined />
                        Add nationality
                      </AddSelect>
                    </>
                  )}
                >
                  {nationalities.map(({ key, label }) => (
                    <Option key={key} value={+key} label={label}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          {/* Position */}
          <Row gutter={(16, 16)}>
            <Col span={24}>
              <Item name={["prefer_position", "positions"]} label="Position">
                <Select
                  mode="multiple"
                  placeholder="Select or add your position applied"
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  style={{
                    width: "100%",
                  }}
                  onSearch={onSearchPosition}
                  dropdownRender={originNode => (
                    <>
                      {originNode}
                      <Divider dashed style={{ margin: 0 }} />
                      <AddSelect onClick={onAddPosition}>
                        <PlusOutlined />
                        Add position
                      </AddSelect>
                    </>
                  )}
                >
                  {positions.map(({ key, label }) => (
                    <Option key={key} value={+key} label={label}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          {/* Highest education */}
          <Row gutter={(16, 16)}>
            <Col span={24}>
              <Item name="highest_education" label="Highest Education">
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="label"
                  style={{
                    width: "100%",
                  }}
                >
                  {degrees.map(({ key, label }) => (
                    <Option key={key} value={+key} label={label}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          {/* Industry years && management years */}
          <Row gutter={(16, 16)}>
            <Col span={12}>
              <Item
                name="industry_years"
                label="Industry Year of Services"
                rules={validator("number")}
              >
                <InputNumber
                  min={0}
                  max={60}
                  placeholder="0"
                  className="w-full"
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="management_years"
                label="Year of Management"
                rules={validator("number")}
              >
                <InputNumber
                  min={0}
                  max={60}
                  placeholder="0"
                  className="w-full"
                />
              </Item>
            </Col>
          </Row>
          {/* Direct Reports */}
          <Row gutter={(16, 16)}>
            <Col span={12}>
              <Item
                name="direct_reports"
                label="No. of Direct Reports"
                rules={validator("number")}
              >
                <InputNumber min={0} placeholder="0" className="w-full" />
              </Item>
            </Col>
          </Row>
        </Card>

        {isEmpty(fieldValues) ? null : (
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Create and Next
            </Button>
          </Row>
        )}
      </Form>
    </div>
  );
};

AddCandidate.propTypes = {};

const FaMinusCircleRemove = styled(FaMinusCircle)`
  cursor: pointer;
  color: red;
`;

const AddSelect = styled.div`
  padding: 4px 8px;
  cursor: pointer;
`;

export default AddCandidate;

// {
//   "first_name": "adfasdfasdfasf",
//   "last_name": "asdfasdfasdfdas",
//   "middle_name": "asddasdasdas",
//   "priority_status": -2,
//   "dob": "1963-02-02",
//   "relocating_willingness": -1,
//   "source": "asdfdsfdsafasdfas",
//   "industry_years": 3,
//   "management_years": 4,
//   "direct_reports": 5,
//   "nationality": [
//       {
//           "key": "602",
//           "label": "Afghan"
//       },
//       {
//           "key": "603",
//           "label": "Albanian"
//       }
//   ],
//   "prefer_position": {
//       "positions": [
//           {
//               "key": "2122",
//               "label": "account"
//           },
//           {
//               "key": "544",
//               "label": "Account Executive"
//           },
//           {
//               "key": 2132,
//               "label": "a"
//           },
//           {
//               "key": "507",
//               "label": "Accounts Payable Clerk"
//           }
//       ]
//   },
//   "highest_education": {
//       "key": "383",
//       "label": "Bachelor"
//   },
//   "phones": [
//       {
//           "number": 34455,
//           "current": -1,
//           "phone_code": {
//               "key": 1280
//           }
//       }
//   ],
//   "emails": [
//       "asdfdsafsafdasfs@gmail.com"
//   ],
//   "current_emails": [],
//   "addresses": [
//       {
//           "address": "asdfdasfasfasfasfasf",
//           "country": {
//               "key": "1280",
//               "label": "Viet Nam"
//           },
//           "city": {
//               "key": "2",
//               "label": "Ba Ria - Vung Tau"
//           },
//           "district": {
//               "key": "77",
//               "label": "Dat Do"
//           }
//       }
//   ],
//   "type": 3
// }
