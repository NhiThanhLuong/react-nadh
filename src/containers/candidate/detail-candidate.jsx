/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Input, Row, Col, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  fetchDetailCandidate,
  fetchEditDetailCandidate,
  resetHistory,
} from "features/candidatesSlice";
import {
  fetchCities,
  fetchDistricts,
  fetchLocations,
} from "features/locationSlice";
import { fetchNationality, postNationality } from "features/nationalitySlice";
import { fetchPosition, postPosition } from "features/positionSlice";
import { KEYS_FIELDS_NOT_PUSH_PARAMS, TYPE_MODAL } from "ultis/const";
import {
  formatDate,
  formatDDMMYYYY,
  isEmpty,
  get_array_obj_key_label_from_array_key,
  format_day_month_year_to_date,
  getPropertyKeyLabelObj,
  delete_key_object,
  getPropertyKeyLabel,
} from "ultis/func";
import { fetchDegrees } from "features/degreeSlice";
import { fetchFunctionSoftSkills, fetchSoftSkills } from "features/skillSlice";
import {
  AcademicCandidate,
  CertificateCandidate,
  FormCkeditor,
  PersonalInformation,
  RemunerationAndRewards,
  SkillAndIndustry,
  UploadFile,
  WorkingHistoryCandidate,
} from "components";
import { fetchLanguages } from "features/languageSlice";
import { fetchIndustries } from "features/categorySlice";
import { showModal } from "features/modalSlice";
import { fetchCurrency } from "features/currencySlice";
import { Item, RowTitle } from "styles/styled";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const DetailCandidate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [form] = Form.useForm();

  const [nationalitySearch, setNationalitySearch] = useState();
  const [positionSearch, setPositionSearch] = useState();
  const [fieldValues, setFieldValues] = useState({});

  const detailData = useSelector(state => state.candidates.detailData);
  const loading = useSelector(state => state.candidates.loading);

  const nationalities = useSelector(state => state.nationality.nationalities);
  const positions = useSelector(state => state.position.positions);

  const isHiddenCancelSave = () => {
    if (isEmpty(fieldValues)) return true;
    // return Object.keys(fieldValues).every(item => item === "soft_skills");
  };

  const {
    day_of_birth,
    month_of_birth,
    year_of_birth,
    emails,
    phones,
    addresses,
    salary_from,
    salary_to,
    notice_days,
    currency,
    current_salary,
    car_allowance,
    car_allowance_text,
    car_parking,
    car_parking_text,
    health_cover,
    health_cover_text,
    laptop,
    laptop_text,
    lunch_check,
    lunch_check_text,
    no_holiday,
    over_thirteen,
    over_thirteen_text,
    overtime_hour,
    pension_scheme,
    phone,
    phone_text,
    share_option,
    share_option_text,
    working_hour,
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
    dispatch(fetchCurrency());
  }, []);

  const onFinish = values => {
    console.log("values", values);

    if (fieldValues.addresses)
      fieldValues.addresses = addresses.map(item => {
        if (item.city && isEmpty(item.city)) delete item.city;
        if (item.district && isEmpty(item.district)) delete item.district;
        return item;
      });

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

    fieldValues.remuneration = {
      ...fieldValues.remuneration,
      notice_days:
        fieldValues.notice_days !== undefined
          ? fieldValues.notice_days
          : notice_days,

      currency:
        fieldValues.currency === undefined ? currency : fieldValues.currency,

      current_salary:
        fieldValues.current_salary === undefined
          ? current_salary
          : fieldValues.current_salary,
      benefit: {
        car_parking:
          fieldValues.car_parking !== undefined
            ? fieldValues.car_parking
            : car_parking,
        health_cover:
          fieldValues.health_cover !== undefined
            ? fieldValues.health_cover
            : health_cover,
        laptop: fieldValues.laptop !== undefined ? fieldValues.laptop : laptop,
        lunch_check:
          fieldValues.lunch_check !== undefined
            ? fieldValues.lunch_check
            : lunch_check,
        no_holiday:
          fieldValues.no_holiday !== undefined
            ? fieldValues.no_holiday
            : no_holiday,
        over_thirteen:
          fieldValues.over_thirteen !== undefined
            ? fieldValues.over_thirteen
            : over_thirteen,
        overtime_hour:
          fieldValues.overtime_hour !== undefined
            ? fieldValues.overtime_hour
            : overtime_hour,
        pension_scheme:
          fieldValues.pension_scheme !== undefined
            ? fieldValues.pension_scheme
            : pension_scheme,
        phone: fieldValues.phone !== undefined ? fieldValues.phone : phone,
        share_option:
          fieldValues.share_option !== undefined
            ? fieldValues.share_option
            : share_option,
        working_hour:
          fieldValues.working_hour !== undefined
            ? fieldValues.working_hour
            : working_hour,
        car_allowance:
          fieldValues.car_allowance !== undefined
            ? fieldValues.car_allowance
            : car_allowance,
        car_allowance_text:
          fieldValues.car_allowance_text !== undefined
            ? fieldValues.car_allowance_text
            : car_allowance_text,
        car_parking_text:
          fieldValues.car_parking_text !== undefined
            ? fieldValues.car_parking_text
            : car_parking_text,
        health_cover_text:
          fieldValues.health_cover_text !== undefined
            ? fieldValues.health_cover_text
            : health_cover_text,
        laptop_text:
          fieldValues.laptop_text !== undefined
            ? fieldValues.laptop_text
            : laptop_text,
        lunch_check_text:
          fieldValues.lunch_check_text !== undefined
            ? fieldValues.lunch_check_text
            : lunch_check_text,
        over_thirteen_text:
          fieldValues.over_thirteen_text !== undefined
            ? fieldValues.over_thirteen_text
            : over_thirteen_text,
        phone_text:
          fieldValues.phone_text !== undefined
            ? fieldValues.phone_text
            : phone_text,
        share_option_text:
          fieldValues.share_option_text !== undefined
            ? fieldValues.share_option_text
            : share_option_text,
      },

      salary: {
        from:
          fieldValues.salary_from >= 0 ? fieldValues.salary_from : salary_from,
        to: fieldValues.salary_to >= 0 ? fieldValues.salary_to : salary_to,
      },
    };

    KEYS_FIELDS_NOT_PUSH_PARAMS.forEach(key =>
      delete_key_object(fieldValues, key)
    );

    // console.log(fieldValues);

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
    delete_key_object(changedValues, "nationality");
    delete_key_object(changedValues, "prefer_position");
    delete_key_object(changedValues, "industry_id");
    delete_key_object(changedValues, "sector_id");
    delete_key_object(changedValues, "category_id");
    // delete_key_object(changedValues, "extra");
    setFieldValues(prevState => ({ ...prevState, ...changedValues }));
  };

  const onChangeSkillOther = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    setFieldValues(prevState => ({
      ...prevState,
      skill_other: data,
    }));
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

  const onChangePosition = (_, options) => {
    setFieldValues(prevState => ({
      ...prevState,
      prefer_position: {
        positions: getPropertyKeyLabel(options),
      },
    }));
  };

  const onChangeEducation = (_, option) => {
    setFieldValues(prevState => ({
      ...prevState,
      highest_education: getPropertyKeyLabelObj(option),
    }));
  };

  const onChangeNationality = (_, options) => {
    setFieldValues(prevState => ({
      ...prevState,
      nationality: getPropertyKeyLabel(options),
    }));
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

  const onAddEducation = () => {
    dispatch(resetHistory());
    dispatch(showModal(TYPE_MODAL.academic_history.add));
  };

  const onAddCertificate = () => {
    dispatch(resetHistory());
    dispatch(showModal(TYPE_MODAL.certificate_history.add));
  };

  const onAddWorkingHistory = () => {
    dispatch(resetHistory());
    dispatch(showModal(TYPE_MODAL.working_history.add));
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
                extra: detailData?.extra || {},
                certificate_text: detailData?.certificate_text || "",
                current_salary: detailData?.remuneration.current_salary || null,
                currency: detailData?.remuneration.currency.id,
                over_thirteen: detailData?.remuneration.benefit.over_thirteen,
                over_thirteen_text:
                  detailData?.remuneration.benefit.over_thirteen_text,
                lunch_check: detailData?.remuneration.benefit.lunch_check,
                lunch_check_text:
                  detailData?.remuneration.benefit.lunch_check_text,
                car_parking: detailData?.remuneration.benefit.car_parking,
                car_parking_text:
                  detailData?.remuneration.benefit.car_parking_text,
                car_allowance: detailData?.remuneration.benefit.car_allowance,
                car_allowance_text:
                  detailData?.remuneration.benefit.car_allowance_text,
                phone: detailData?.remuneration.benefit.phone,
                phone_text: detailData?.remuneration.benefit.phone_text,
                laptop: detailData?.remuneration.benefit.laptop,
                laptop_text: detailData?.remuneration.benefit.laptop_text,
                share_option: detailData?.remuneration.benefit.share_option,
                share_option_text:
                  detailData?.remuneration.benefit.share_option_text,
                health_cover: detailData?.remuneration.benefit.health_cover,
                health_cover_text:
                  detailData?.remuneration.benefit.health_cover_text,
                pension_scheme:
                  detailData?.remuneration.benefit.pension_scheme || 0,
                working_hour:
                  detailData?.remuneration.benefit?.working_hour || 0,
                no_holiday: detailData?.remuneration.benefit?.no_holiday || 0,
                overtime_hour:
                  detailData?.remuneration.benefit?.overtime_hour || 0,
                notice_days: detailData?.remuneration.notice_days || 0,
                salary_from: detailData?.remuneration.salary.from || 0,
                salary_to: detailData?.remuneration.salary.to || 0,
              }}
            >
              <Button onClick={() => console.log(form.getFieldsValue())}>
                Log field values
              </Button>
              <UploadFile />
              <FormCkeditor
                name="skill_other"
                label="Other"
                data={detailData.extra.skill_other}
                onChange={onChangeSkillOther}
              />

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
              <PersonalInformation
                fieldValues={fieldValues}
                setFieldValues={setFieldValues}
                onChangeBirthDay={onChangeBirthDay}
                onChangeCountry={onChangeCountry}
                onDropdownCity={onDropdownCity}
                onChangeCity={onChangeCity}
                onDropdownDistrict={onDropdownDistrict}
                onChangeDistrict={onChangeDistrict}
                onSearchNationality={onSearchNationality}
                onSearchPosition={onSearchPosition}
                onChangePosition={onChangePosition}
                onAddNationality={onAddNationality}
                onAddPosition={onAddPosition}
                onChangeEducation={onChangeEducation}
                onChangeNationality={onChangeNationality}
              />
              {/* Skills And Industry */}

              <SkillAndIndustry form={form} />
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
              {/* Certificate */}
              <Card
                title={<span style={{ color: "#465f7b" }}>Certificate</span>}
                style={{ marginBottom: 16 }}
              >
                <Item name="certificate_text">
                  <Input.TextArea placeholder="Certificate" />
                </Item>
              </Card>
              {/* Working History */}
              <Card
                title={
                  <span style={{ color: "#465f7b" }}>Working History</span>
                }
                style={{ marginBottom: 16 }}
              >
                <Row>
                  <Col span={24} style={{ marginBottom: 8 }}>
                    <Row align="middle" justify="space-between">
                      <span style={{ fontWeight: 500 }}>WORKING HISTORY</span>
                      <Button
                        type="primary"
                        ghost
                        onClick={onAddWorkingHistory}
                      >
                        Add Working History
                      </Button>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <WorkingHistoryCandidate
                      dataSource={detailData.histories.filter(
                        ({ type }) => type === 2
                      )}
                    />
                  </Col>
                </Row>
              </Card>
              <RemunerationAndRewards form={form} />
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

const RowSubmit = styled(Row)`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 8px 80px;
  background-color: #e9e9e9;
`;

export default DetailCandidate;
