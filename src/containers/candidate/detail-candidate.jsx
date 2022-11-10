/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { FaMinusCircle } from "react-icons/fa";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  fetchDetailCandidate,
  fetchEditDetailCandidate,
} from "features/candidatesSlice";
import {
  fetchCities,
  fetchDistricts,
  fetchLocations,
} from "features/locationSlice";
import { fetchNationality, postNationality } from "features/nationalitySlice";
import { fetchPosition, postPosition } from "features/positionSlice";
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
import { fetchDegrees } from "features/degreeSlice";
import {
  fetchSoftSkills,
  putSoftSkillDetailCandidate,
} from "features/skillSlice";

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

const DetailCandidate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [form] = Form.useForm();

  const [nationalitySearch, setNationalitySearch] = useState();
  const [positionSearch, setPositionSearch] = useState();
  const [fieldValues, setFieldValues] = useState({});

  const {
    candidates: { detailData, loading },
    location: { countries, cities, districts },
    nationality: { nationalities },
    position: { positions },
    degree: { degrees },
    skill: { softSkills },
  } = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchDetailCandidate(id));
    dispatch(
      fetchLocations({
        type: 4,
      })
    );
    dispatch(fetchNationality());
    dispatch(fetchPosition());
    dispatch(fetchDegrees());
    dispatch(fetchSoftSkills());
  }, []);

  const { day_of_birth, month_of_birth, year_of_birth, emails, phones } =
    form.getFieldsValue();

  const onFinish = values => {
    console.log("values", values);

    if (fieldValues.addresses)
      fieldValues.addresses = form.getFieldsValue().addresses.map(item => {
        if (item.city && isEmpty(item.city)) delete item.city;
        if (item.district && isEmpty(item.district)) delete item.district;
        return item;
      });

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
      fieldValues.emails = emails;
    }

    if (fieldValues.phones) {
      fieldValues.phones = phones.map(item => ({
        ...item,
        current: -1,
        phone_code: {
          key: 1280,
          label: "Viet Nam",
          extra: { code: "VN", dial_code: "+84" },
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

    if (fieldValues.highest_education)
      fieldValues.highest_education = form.getFieldsValue().highest_education;

    dispatch(
      fetchEditDetailCandidate({
        id: detailData.id,
        params: fieldValues,
      })
    );
    setFieldValues(() => ({}));
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (changedValues, allValues) => {
    setFieldValues(prevState => ({ ...prevState, ...changedValues }));
  };

  const onChangeBirthDay = () => {
    form.validateFields(["day_of_birth", "month_of_birth", "year_of_birth"]);
  };

  const onSearchNationality = value => {
    setNationalitySearch(() => value);
    dispatch(
      fetchNationality({
        value,
      })
    );
  };

  const onSearchPosition = value => {
    setPositionSearch(() => value);
    dispatch(
      fetchPosition({
        value,
      })
    );
  };

  const onChangeEducation = (_, option) => {
    form.setFieldsValue({
      highest_education: getPropertyKeyLabelObj(option),
    });
  };

  const onChangeCountry = (_, option, key) => {
    const addresses = form.getFieldValue("addresses");
    addresses[key].country = getPropertyKeyLabelObj(option);
    addresses[key].city = {};
    addresses[key].district = {};
  };

  const onChangeCity = (_, option, key) => {
    const addresses = form.getFieldValue("addresses");
    addresses[key].city = getPropertyKeyLabelObj(option);
    addresses[key].district = {};
  };

  const onChangeDistrict = (_, option, key) => {
    const addresses = form.getFieldValue("addresses");
    addresses[key].district = getPropertyKeyLabelObj(option);
  };

  const onDropdownCity = key => {
    const addresses = form.getFieldValue("addresses");
    dispatch(
      fetchCities({
        parent_id: +addresses[key].country.key,
      })
    );
  };

  const onDropdownDistrict = key => {
    const addresses = form.getFieldValue("addresses");
    dispatch(
      fetchDistricts({
        parent_id: addresses[key].city.key,
      })
    );
  };

  const onAddNationality = () => {
    dispatch(postNationality(nationalitySearch));
  };

  const onAddPosition = () => {
    dispatch(postPosition(positionSearch));
  };

  const onChangeSoftSkill = value => {
    const values = get_array_obj_key_label_from_array_key(softSkills, value);

    dispatch(
      putSoftSkillDetailCandidate({
        id: detailData?.id,
        params: {
          soft_skills: values,
        },
      })
    );
  };

  const onResetFields = () => {
    form.resetFields();
    setFieldValues(() => ({}));
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          {!loading && detailData?.candidate_id === id ? (
            <>
              <RowTitle>
                <Link to="/candidates">Candidates List /</Link>
                <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  {id} - {detailData.full_name}
                </span>
              </RowTitle>
              <Form
                form={form}
                onValuesChange={onValuesChange}
                validateMessages={validateMessages}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                initialValues={{
                  overview_text_new: detailData?.overview_text_new,
                  first_name: detailData?.first_name,
                  last_name: detailData?.last_name,
                  middle_name: detailData?.middle_name,
                  priority_status: detailData?.priority_status,
                  day_of_birth: detailData?.dob
                    ? +formatDate(detailData?.dob).day
                    : null,
                  month_of_birth: detailData?.dob
                    ? +formatDate(detailData?.dob).month
                    : null,
                  year_of_birth: detailData?.dob
                    ? +formatDate(detailData?.dob).year
                    : null,
                  dob: detailData?.dob,
                  gender: detailData?.gender,
                  martial_status: detailData?.extra?.martial_status,
                  relocating_willingness: detailData?.relocating_willingness,
                  source: detailData?.source,
                  creator_full_name: detailData?.creator?.full_name,
                  createdAt: formatDDMMYYYY(detailData?.createdAt),
                  emails: detailData?.emails,
                  phones: detailData?.phones,
                  addresses: detailData?.addresses.length
                    ? detailData?.addresses
                    : [null],
                  nationality: detailData?.nationality,
                  prefer_position: detailData?.prefer_position,
                  highest_education: detailData?.highest_education,
                  industry_years: detailData?.industry_years || 0,
                  management_years: detailData?.management_years || 0,
                  direct_reports: detailData?.direct_reports || 0,
                  soft_skills: detailData?.soft_skills || [],
                  functions_skills: detailData?.functions_skills || [],
                }}
              >
                <Button onClick={() => console.log(form.getFieldsValue())}>
                  Log field values
                </Button>
                {/* Overview */}
                <Card
                  title={<span style={{ color: "#465f7b" }}>Overview</span>}
                  style={{ marginBottom: 16 }}
                >
                  <Item name="overview_text_new">
                    <Input.TextArea placeholder="Overview" />
                  </Item>
                </Card>
                {/* Personal Information */}
                <Card
                  title={
                    <span style={{ color: "#465f7b" }}>
                      Personal Information
                    </span>
                  }
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
                  {/* Creator */}
                  <Row gutter={(16, 16)}>
                    <Col span={12}>
                      <Item name="creator_full_name" label="Created by">
                        <Input disabled className="capitalize" />
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item name="createdAt" label="Created on">
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
                                            message:
                                              "Please input your E-mail!",
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
                        <Form.List name="phones" label="Email" required>
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
                                        rules={validator("number")}
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
                                              onChange={(value, option) =>
                                                onChangeCountry(
                                                  value,
                                                  option,
                                                  key
                                                )
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
                                              onDropdownVisibleChange={() =>
                                                onDropdownCity(key)
                                              }
                                              onChange={(value, option) =>
                                                onChangeCity(value, option, key)
                                              }
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
                                              onDropdownVisibleChange={() =>
                                                onDropdownDistrict(key)
                                              }
                                              onChange={(value, option) =>
                                                onChangeDistrict(
                                                  value,
                                                  option,
                                                  key
                                                )
                                              }
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
                      <Item
                        name={["prefer_position", "positions"]}
                        label="Position"
                      >
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
                          onChange={onChangeEducation}
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
                        <InputNumber
                          min={0}
                          placeholder="0"
                          className="w-full"
                        />
                      </Item>
                    </Col>
                  </Row>
                </Card>
                {/* Skills And Industry */}
                <Card
                  title={
                    <span style={{ color: "#465f7b" }}>
                      Skills And Industry
                    </span>
                  }
                  style={{ marginBottom: 16 }}
                >
                  {/* Soft skills and Functions Skills */}
                  <Row gutter={(16, 16)}>
                    <Col span={12}>
                      <Item name="soft_skills" label="Soft skills">
                        <Select
                          mode="multiple"
                          placeholder="Select your soft skills"
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          style={{
                            width: "100%",
                          }}
                          onChange={onChangeSoftSkill}
                        >
                          {softSkills.map(({ key, label }) => (
                            <Option key={key} value={+key} label={label}>
                              {label}
                            </Option>
                          ))}
                        </Select>
                      </Item>
                    </Col>
                    <Col span={12}>
                      {/* <Item
                      name="functions_skills"
                      label="Job functions skills"
                    >
                        <Select
                        mode="multiple"
                        placeholder="Select your job functions skills"
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        style={{
                          width: "100%",
                        }}
                        // onChange={onChangeSoftSkill}
                      >
                        {softSkills.map(({ key, label }) => (
                          <Option key={key} value={+key} label={label}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </Item> */}
                    </Col>
                  </Row>
                </Card>
                {/* Cancel & Save */}
                {isEmpty(fieldValues) ? null : (
                  <RowSubmit justify="end">
                    <Button style={{ marginRight: 16 }} onClick={onResetFields}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </RowSubmit>
                )}
              </Form>
            </>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

DetailCandidate.propTypes = {};

const FaMinusCircleRemove = styled(FaMinusCircle)`
  cursor: pointer;
  color: red;
`;

const AddSelect = styled.div`
  padding: 4px 8px;
  cursor: pointer;
`;

const RowSubmit = styled(Row)`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 8px 80px;
  background-color: #e9e9e9;
`;

const RowTitle = styled(Row)`
  position: sticky;
  top: 105px;
  left: 0px;
  z-index: 10;
  line-height: 3;
  font-size: 14px;
  background-color: rgb(244, 244, 244);
  a {
    color: rgba(0, 0, 0, 0.45);
    &:hover {
      color: rgb(24, 144, 255);
      transition: color 0.25 ease;
    }
  }
  span {
    text-transform: uppercase;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.65);
  }
`;

export default DetailCandidate;
