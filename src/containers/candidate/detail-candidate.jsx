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
import { TYPE_MODAL } from "ultis/const";
import {
  formatDate,
  formatDDMMYYYY,
  isEmpty,
  get_array_obj_key_label_from_array_key,
  format_day_month_year_to_date,
  getPropertyKeyLabelObj,
  deleteKeyNull,
  get_params_payload_id_from_industry_form_arr,
} from "ultis/func";
import { fetchDegrees } from "features/degreeSlice";
import {
  fetchFunctionSoftSkills,
  fetchSoftSkills,
  putSoftSkillDetailCandidate,
} from "features/skillSlice";
import {
  AcademicCandidate,
  CertificateCandidate,
  PersonalInformation,
  RemunerationAndRewards,
  SkillAndIndustry,
  WorkingHistoryCandidate,
} from "components";
import { fetchLanguages } from "features/languageSlice";
import {
  fetchCategory,
  fetchIndustries,
  fetchSectors,
} from "features/categorySlice";
import { useCallback } from "react";
import { showModal } from "features/modalSlice";
import { fetchCurrency } from "features/currencySlice";
import { Item } from "styles/styled";

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
  const [isChange, setIsChange] = useState(false);

  const detailData = useSelector(state => state.candidates.detailData);
  const loading = useSelector(state => state.candidates.loading);

  const softSkills = useSelector(state => state.skill.softSkills);

  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);
  const districts = useSelector(state => state.location.districts);

  const nationalities = useSelector(state => state.nationality.nationalities);
  const positions = useSelector(state => state.position.positions);
  const degrees = useSelector(state => state.degree.degrees);

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
    dispatch(fetchCurrency());
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

  const onAddWorkingHistory = () => {
    dispatch(resetHistory());
    dispatch(showModal(TYPE_MODAL.working_history.add));
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
              <PersonalInformation
                onChangeBirthDay={onChangeBirthDay}
                onChangeCountry={onChangeCountry}
                onDropdownCity={onDropdownCity}
                onChangeCity={onChangeCity}
                onDropdownDistrict={onDropdownDistrict}
                onChangeDistrict={onChangeDistrict}
                onSearchNationality={onSearchNationality}
                onSearchPosition={onSearchPosition}
                onAddNationality={onAddNationality}
                onAddPosition={onAddPosition}
                onChangeEducation={onChangeEducation}
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
              <RemunerationAndRewards />
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
