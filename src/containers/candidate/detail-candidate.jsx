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
  TreeSelect,
} from "antd";
import { FaMinusCircle } from "react-icons/fa";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  fetchDetailCandidate,
  fetchEditDetailCandidate,
  putEditDetailCandidateNotLoading,
  putIndustryDetailCandidate,
  putLanguageDetailCandidate,
  resetHistory,
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
  TYPE_MODAL,
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
  deleteKeyNull,
  get_params_payload_id_from_industry_form_arr,
} from "ultis/func";
import validator from "ultis/validate";
import { fetchDegrees } from "features/degreeSlice";
import {
  fetchFunctionSoftSkills,
  fetchSoftSkills,
  putSoftSkillDetailCandidate,
} from "features/skillSlice";
import {
  AcademicCandidate,
  CertificateCandidate,
  FormSelect,
  FormTextInput,
  IndustryDetailCandidate,
} from "components";
import { fetchLanguages } from "features/languageSlice";
import {
  fetchCategory,
  fetchIndustries,
  fetchSectors,
} from "features/categorySlice";
import { AddSelect, Item } from "styles/styled";
import { useCallback } from "react";
import { showModal } from "features/modalSlice";

// const { Item  } = Form;
const { Option } = Select;
const { TreeNode } = TreeSelect;

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
  const [isChange, setIsChange] = useState(false);

  const detailData = useSelector(state => state.candidates.detailData);
  const loading = useSelector(state => state.candidates.loading);
  const isDetailLoading = useSelector(
    state => state.candidates.isDetailLoading
  );

  const softSkills = useSelector(state => state.skill.softSkills);
  const functionSkills = useSelector(state => state.skill.functionSkills);

  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);
  const districts = useSelector(state => state.location.districts);

  const nationalities = useSelector(state => state.location.nationalities);
  const positions = useSelector(state => state.location.positions);
  const degrees = useSelector(state => state.location.degrees);

  const languages = useSelector(state => state.location.languages);
  const loadingLanguage = useSelector(state => state.location.loading);

  const industries = useSelector(state => state.location.industries);
  const sectors = useSelector(state => state.location.sectors);
  const categories = useSelector(state => state.location.categories);

  const isHiddenCancelSave = () => {
    if (isEmpty(fieldValues)) return true;
    return Object.keys(fieldValues).every(item => item === "soft_skills");
  };

  const {
    day_of_birth,
    month_of_birth,
    year_of_birth,
    emails,
    phones,
    industry_id,
    sector_id,
    category_id,
  } = form.getFieldsValue();

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
    dispatch(fetchFunctionSoftSkills());
    dispatch(fetchLanguages());
    dispatch(
      fetchIndustries({
        type: 1,
      })
    );
  }, []);

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

    // if (fieldValues.industry_id) {
    //   fieldValues.business_line;
    // }

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

  const onValuesChange = changedValues => {
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

  const onDropdownCity = (open, key) => {
    const addresses = form.getFieldValue("addresses");
    open &&
      addresses[key]?.country.key &&
      dispatch(
        fetchCities({
          parent_id: +addresses[key].country.key,
        })
      );
  };

  const onDropdownDistrict = (open, key) => {
    const addresses = form.getFieldValue("addresses");
    open &&
      addresses[key]?.city.key &&
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

  const onSearchLanguage = value => {
    dispatch(
      fetchLanguages({
        value,
      })
    );
  };

  const onSelectLanguage = (_, option) => {
    dispatch(
      putLanguageDetailCandidate({
        id: detailData.id,
        params: {
          languages: [...detailData.languages, getPropertyKeyLabelObj(option)],
        },
      })
    );
  };

  const onDeleteLanguage = key => {
    dispatch(
      putLanguageDetailCandidate({
        id: detailData.id,
        params: {
          languages: detailData.languages.filter(item => item.key !== key),
        },
      })
    );
    // setListLanguages(prevState => prevState.filter(item => item.key !== key));
  };

  const onChangeIndustry = () => {
    form.setFieldsValue({
      sector_id: null,
      category_id: null,
    });
  };

  const onChangeSector = () => {
    form.setFieldsValue({
      category_id: null,
    });
  };

  const onDropdownSector = open => {
    open &&
      dispatch(
        fetchSectors({
          parent_id: industry_id,
          type: 2,
        })
      );
  };

  const onDropdownCategory = open => {
    open &&
      dispatch(
        fetchCategory({
          parent_id: sector_id,
          type: 3,
        })
      );
  };

  const onResetIndustry = () => {
    form.setFieldsValue({
      industry_id: null,
      sector_id: null,
      category_id: null,
    });
    setIsChange(!isChange);
  };

  const onSaveIndustry = () => {
    const initBusinessLine = get_params_payload_id_from_industry_form_arr(
      detailData.business_line
    );
    const newBusinessLine = [
      ...initBusinessLine,
      deleteKeyNull({
        industry_id,
        sector_id,
        category_id,
      }),
    ];

    dispatch(
      putIndustryDetailCandidate({
        id: detailData.id,
        params: {
          business_line: newBusinessLine,
        },
      })
    );
    onResetIndustry();
  };

  const onDeleteIndustryItem = (_, __, index) => {
    const newBusinessLine = get_params_payload_id_from_industry_form_arr(
      detailData.business_line.filter((_, id) => id !== index)
    );
    dispatch(
      putIndustryDetailCandidate({
        id: detailData.id,
        params: {
          business_line: newBusinessLine,
        },
      })
    );
  };

  const onCheckedPrimaryIndustry = useCallback(
    (checked, index) => {
      const newBusinessLine = detailData.business_line.map((item, id) => {
        if (id === index)
          return {
            ...item,
            primary: checked ? 1 : -1,
          };
        return item;
      });
      dispatch(
        putEditDetailCandidateNotLoading({
          id: detailData.id,
          params: {
            business_line:
              get_params_payload_id_from_industry_form_arr(newBusinessLine),
          },
        })
      );
    },
    [detailData]
  );

  const onAddEducation = () => {
    dispatch(resetHistory());
    dispatch(showModal(TYPE_MODAL.academic_history.add));
  };

  const onAddCertificate = () => {
    dispatch(resetHistory());
    dispatch(showModal(TYPE_MODAL.certificate_history.add));
  };

  const onSearchFunctionSkill = value => {
    dispatch(
      fetchFunctionSoftSkills(
        value
          ? {
              children_name: value,
            }
          : {}
      )
    );
  };

  const onResetFields = () => {
    form.resetFields();
    setFieldValues(() => ({}));
  };

  return (
    <Row style={{ marginTop: "90px" }}>
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
                  <span style={{ color: "#465f7b" }}>Personal Information</span>
                }
                style={{ marginBottom: 16 }}
              >
                {/* First & Last Name */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <FormTextInput
                      name="first_name"
                      label="First Name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      placeholder="Please enter the first name"
                      inputClassName="capitalize"
                    />
                  </Col>
                  <Col span={12}>
                    <FormTextInput
                      name="last_name"
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      placeholder="Please enter the last name"
                      inputClassName="capitalize"
                    />
                  </Col>
                </Row>
                {/* Middle name & Primary status */}
                <Row gutter={(16, 16)}>
                  <Col span={12}>
                    <FormTextInput
                      ame="middle_name"
                      label="Middle Name"
                      placeholder="Please Input Middle Name"
                      inputClassName="capitalize"
                    />
                  </Col>
                  <Col span={12}>
                    {/* <Item name="priority_status" label="Primary status">
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
                    </Item> */}
                    <FormSelect
                      name="priority_status"
                      label="Primary status"
                      optionFilterProp="label"
                      options={candidate_priority_status}
                    />
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
                    {/* <Item name="relocating_willingness" label="Ready to move">
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
                    </Item> */}
                    <FormSelect
                      name="relocating_willingness"
                      label="Ready to move"
                      allowClear
                      optionFilterProp="label"
                      options={RELOCATING_WILLINGNESS}
                    />
                  </Col>
                  <Col span={12}>
                    <FormTextInput
                      name="source"
                      label="Source"
                      placeholder="Please input source"
                    />
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
                      <Form.List name="phones" label="Email" required>
                        {(fields, { add, remove }) => {
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
                        {(fields, { add, remove }) => (
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
                                          onDropdownVisibleChange={open =>
                                            onDropdownCity(open, key)
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
                                          onDropdownVisibleChange={open =>
                                            onDropdownDistrict(open, key)
                                          }
                                          onChange={(value, option) =>
                                            onChangeDistrict(value, option, key)
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
                                      <FormTextInput
                                        {...restField}
                                        name={[name, "address"]}
                                        style={{ margin: 0 }}
                                        placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
                                      />
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
                        )}
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
                        filterOption={false}
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
                        {nationalities?.map(({ key, label }) => (
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
                        {positions?.map(({ key, label }) => (
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
                        {degrees?.map(({ key, label }) => (
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
              {/* Skills And Industry */}
              <Card
                title={
                  <span style={{ color: "#465f7b" }}>Skills And Industry</span>
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
                    <Item name="functions_skills" label="Job functions skills">
                      <TreeSelect
                        multiple
                        placeholder="Select your job functions skills"
                        allowClear
                        showSearch
                        filterTreeNode={false}
                        // optionFilterProp="label"
                        treeDefaultExpandAll
                        style={{
                          width: "100%",
                        }}
                        onSearch={onSearchFunctionSkill}
                      >
                        {functionSkills.map(({ key, label, children }) => (
                          <TreeNode
                            disabled
                            key={key}
                            value={+key}
                            title={label}
                          >
                            {children.map(({ key, label }) => (
                              <TreeNode key={key} value={+key} title={label}>
                                {label}
                              </TreeNode>
                            ))}
                          </TreeNode>
                        ))}
                      </TreeSelect>
                    </Item>
                  </Col>
                </Row>
                {/* Languages */}
                <Row gutter={(16, 16)}>
                  <Col span={24}>
                    <Item label="Languages">
                      <Select
                        placeholder="Select "
                        showSearch
                        optionFilterProp="label"
                        onSearch={onSearchLanguage}
                        onSelect={onSelectLanguage}
                        style={{
                          width: "100%",
                        }}
                      >
                        {languages?.map(({ key, label }) => (
                          <Option
                            key={key}
                            value={key}
                            label={label}
                            disabled={detailData?.languages.find(
                              item => item.key === key
                            )}
                          >
                            {label}
                          </Option>
                        ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col span={24} style={{ paddingLeft: 24 }}>
                    <Item label="List of Languages">
                      <Row>
                        {!loadingLanguage &&
                          detailData?.languages.map(({ key, label }) => (
                            <Col key={key} span={12}>
                              <span>
                                {label}{" "}
                                <DeleteOutlined
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => onDeleteLanguage(key)}
                                />
                              </span>
                            </Col>
                          ))}
                      </Row>
                    </Item>
                  </Col>
                </Row>
                {/* Industry */}
                <Row gutter={(16, 16)} style={{ marginBottom: 16 }}>
                  <Col span={24}>
                    <Item label="Industry" style={{ margin: 0 }}>
                      <Row gutter={(16, 16)}>
                        <Col span={8}>
                          <Item name="industry_id" style={{ margin: 0 }}>
                            <Select
                              placeholder="Select your industry"
                              showSearch
                              allowClear
                              optionFilterProp="label"
                              onChange={onChangeIndustry}
                              style={{
                                width: "100%",
                              }}
                            >
                              {industries?.map(({ key, label }) => (
                                <Option key={key} value={+key} label={label}>
                                  {label}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col span={8}>
                          <Item name="sector_id" style={{ margin: 0 }}>
                            <Select
                              placeholder="Select your sector"
                              showSearch
                              allowClear
                              optionFilterProp="label"
                              onChange={onChangeSector}
                              onDropdownVisibleChange={onDropdownSector}
                              disabled={!industry_id}
                              style={{
                                width: "100%",
                              }}
                            >
                              {sectors?.map(({ key, label }) => (
                                <Option key={key} value={+key} label={label}>
                                  {label}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                        <Col span={8}>
                          <Item name="category_id" style={{ margin: 0 }}>
                            <Select
                              placeholder="Select your category"
                              showSearch
                              allowClear
                              optionFilterProp="label"
                              onDropdownVisibleChange={onDropdownCategory}
                              disabled={!sector_id}
                              style={{
                                width: "100%",
                              }}
                            >
                              {categories?.map(({ key, label }) => (
                                <Option key={key} value={+key} label={label}>
                                  {label}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </Col>
                      </Row>
                    </Item>
                  </Col>
                </Row>
                {!!industry_id && (
                  <Row justify="end" style={{ marginBottom: 16 }}>
                    <Button
                      style={{ marginRight: 16 }}
                      danger
                      onClick={onResetIndustry}
                    >
                      Cancel
                    </Button>
                    <Button type="primary" onClick={onSaveIndustry}>
                      Save Industry
                    </Button>
                  </Row>
                )}
                {!isDetailLoading && (
                  <IndustryDetailCandidate
                    dataSource={detailData.business_line}
                    onDeleteItem={onDeleteIndustryItem}
                    onChecked={onCheckedPrimaryIndustry}
                  />
                )}
              </Card>
              {/* Education */}
              <Card
                title={<span style={{ color: "#465f7b" }}>Education</span>}
                style={{ marginBottom: 16 }}
              >
                <Row gutter={(16, 16)}>
                  {/* Academic */}
                  <Col span={24} style={{ marginBottom: 8 }}>
                    <Row align="middle" justify="space-between">
                      <span style={{ fontWeight: 500 }}>ACADEMIC</span>
                      <Button type="primary" ghost onClick={onAddEducation}>
                        Add Education
                      </Button>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <AcademicCandidate
                      dataSource={detailData.histories.filter(
                        ({ type }) => type === 1
                      )}
                    />
                  </Col>
                  <Col span={24} style={{ marginBottom: 8 }}>
                    <Row align="middle" justify="space-between">
                      <span style={{ fontWeight: 500 }}>CERTIFICATE</span>
                      <Button type="primary" ghost onClick={onAddCertificate}>
                        Add Certificate
                      </Button>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <CertificateCandidate
                      dataSource={detailData.histories.filter(
                        ({ type }) => type === 3
                      )}
                    />
                  </Col>
                </Row>
              </Card>
              {/* Cancel & Save */}
              {isHiddenCancelSave() ? null : (
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
  );
};

DetailCandidate.propTypes = {};

const FaMinusCircleRemove = styled(FaMinusCircle)`
  cursor: pointer;
  color: red;
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
