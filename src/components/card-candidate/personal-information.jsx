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
import { PlusOutlined } from "@ant-design/icons";

import {
  candidate_priority_status,
  DAYS_RANGE,
  MONTHS,
  GENDERS,
  MARITAL_STATUS,
  RELOCATING_WILLINGNESS,
} from "ultis/const";
import { pad2, years } from "ultis/func";
import validator from "ultis/validate";
import { FormSelect, FormTextInput } from "components";

import { AddSelect, FaMinusCircleRemove, Item } from "styles/styled";
import { useSelector } from "react-redux";

const { Option } = Select;

const PersonalInformation = ({
  onChangeBirthDay,
  onChangeCountry,
  onDropdownCity,
  onChangeCity,
  onDropdownDistrict,
  onChangeDistrict,
  onSearchNationality,
  onSearchPosition,
  onAddNationality,
  onAddPosition,
  onChangeEducation,
}) => {
  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);
  const districts = useSelector(state => state.location.districts);

  const nationalities = useSelector(state => state.nationality.nationalities);
  const positions = useSelector(state => state.position.positions);
  const degrees = useSelector(state => state.degree.degrees);

  return (
    <Card
      title={<span style={{ color: "#465f7b" }}>Personal Information</span>}
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

                        return Promise.reject(new Error("Please select Day!"));
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

                        return Promise.reject(new Error("Please select Month"));
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

                        return Promise.reject(new Error("Please select Year"));
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
                          <FaMinusCircleRemove onClick={() => remove(name)} />
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
                    <Row key={key} align="middle" style={{ marginBottom: 16 }}>
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
            <InputNumber min={0} max={60} placeholder="0" className="w-full" />
          </Item>
        </Col>
        <Col span={12}>
          <Item
            name="management_years"
            label="Year of Management"
            rules={validator("number")}
          >
            <InputNumber min={0} max={60} placeholder="0" className="w-full" />
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
  );
};

export default PersonalInformation;
