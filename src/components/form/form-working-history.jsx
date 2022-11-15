/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Row, Col, Checkbox } from "antd";
import { Item } from "styles/styled";
import { getPropertyKeyLabelObj, years } from "ultis/func";
import { FormSelect } from "components";
import { useDispatch, useSelector } from "react-redux";
import ModalForm from "HOC/modal-form";
import { fetchCertificate } from "features/degreeSlice";
import { MONTHS } from "ultis/const";
import { fetchPosition, postPosition } from "features/positionSlice";
import { fetchCompanys, postCompany } from "features/companySlice";

const FormWorkingHistory = ({ fieldsChanges, form }) => {
  const dispatch = useDispatch();

  const [companySearch, setCompanySearch] = useState(null);
  const [positionSearch, setPositionSearch] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const companys = useSelector(state => state.company.companys);
  const positions = useSelector(state => state.position.positions);

  //   const certificates = useSelector(state => state.degree.certificates);

  useEffect(() => {
    dispatch(fetchCompanys());
  }, []);

  useEffect(() => {
    if (isChecked)
      form.setFieldsValue({
        end_month: null,
        end_year: null,
      });
  }, [isChecked]);

  const onChecked = e => {
    setIsChecked(e.target.checked);
    if (isChecked)
      form.setFieldsValue({
        end_month: null,
        end_year: null,
      });
  };
  const onChangeStartMotnh = month => {
    form.validateFields(["start_year"]);
    fieldsChanges.start_month = month || null;
  };
  const onChangeStartYear = year => {
    form.validateFields(["start_month"]);
    fieldsChanges.start_year = year || null;
  };

  const onChangeEndMotnh = month => {
    form.validateFields(["end_year"]);
    fieldsChanges.end_month = month || null;
  };
  const onChangeEndYear = year => {
    form.validateFields(["end_month"]);
    fieldsChanges.end_year = year || null;
  };

  //   const onChangeGradutionYear = year => {
  //     fieldsChanges.end_time = year ? `${year}-01-01` : null;
  //   };

  const onSearchCompany = value => {
    setCompanySearch(() => value);
    dispatch(
      fetchCompanys({
        value,
      })
    );
  };

  const onChangeCompany = (_, option) => {
    fieldsChanges.organization = _ ? getPropertyKeyLabelObj(option) : null;
  };

  const onSearchPosition = value => {
    setPositionSearch(() => value);
    dispatch(
      fetchPosition({
        value,
      })
    );
  };

  const onChangePosition = (_, option) => {
    fieldsChanges.title = _ ? getPropertyKeyLabelObj(option) : null;
  };

  //   const onChangeDegree = (_, option) => {
  //     fieldsChanges.title = getPropertyKeyLabelObj(option);
  //   };

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Item name="status" valuePropName="checked">
          <Checkbox onChange={onChecked}>Current school</Checkbox>
        </Item>
      </Col>
      <Col span={12}>
        <Item label="Start year" required>
          <Row gutter={16}>
            <Col span={12}>
              <FormSelect
                allowClear
                name="start_month"
                placeholder="Month"
                optionFilterProp="label"
                options={MONTHS}
                onChange={onChangeStartMotnh}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        !getFieldValue("start_month") ||
                        !getFieldValue("start_year") ||
                        !getFieldValue("end_year") ||
                        +getFieldValue("start_year") !==
                          +getFieldValue("end_year") ||
                        +value <= +getFieldValue("end_month")
                      ) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "Start month not higher end month when the same year"
                        )
                      );
                    },
                  }),
                ]}
              />
            </Col>
            <Col span={12}>
              <FormSelect
                allowClear
                name="start_year"
                placeholder="Year"
                isKeyLabel={false}
                optionFilterProp="label"
                options={years()}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value || !getFieldValue("start_month")) {
                        if (
                          !getFieldValue("end_year") ||
                          +value <= +getFieldValue("end_year")
                        )
                          return Promise.resolve();

                        return Promise.reject(
                          new Error("Start year not higher end year")
                        );
                      }

                      return Promise.reject(new Error("Please select Year"));
                    },
                  }),
                ]}
                onChange={onChangeStartYear}
              />
            </Col>
          </Row>
        </Item>
      </Col>
      <Col span={12}>
        <Item label="End year" required>
          <Row gutter={16}>
            <Col span={12}>
              <FormSelect
                allowClear
                disabled={isChecked}
                name="end_month"
                placeholder="Month"
                optionFilterProp="label"
                options={MONTHS}
                onChange={onChangeEndMotnh}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        !value ||
                        !getFieldValue("start_month") ||
                        !getFieldValue("start_year") ||
                        !getFieldValue("end_year") ||
                        +getFieldValue("start_year") !==
                          +getFieldValue("end_year") ||
                        +value >= +getFieldValue("start_month")
                      ) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "End month not lower start month when the same year"
                        )
                      );
                    },
                  }),
                ]}
              />
            </Col>
            <Col span={12}>
              <FormSelect
                allowClear
                disabled={isChecked}
                name="end_year"
                placeholder="Year"
                isKeyLabel={false}
                optionFilterProp="label"
                options={years()}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value || !getFieldValue("end_month")) {
                        if (
                          !getFieldValue("start_year") ||
                          +value >= +getFieldValue("start_year")
                        )
                          return Promise.resolve();

                        return Promise.reject(
                          new Error("Start year not higher end year")
                        );
                      }

                      return Promise.reject(new Error("Please select Year"));
                    },
                  }),
                ]}
                onChange={onChangeEndYear}
              />
            </Col>
          </Row>
        </Item>
      </Col>
      {/* <Col span={12}>
        <FormSelect
          allowClear
          name="end_year"
          label="Graduation year"
          placeholder="Graduation year"
          optionFilterProp="label"
          isKeyLabel={false}
          disabled={isChecked}
          options={years()}
          onChange={onChangeGradutionYear}
        />
      </Col> */}
      <Col span={24}>
        <FormSelect
          allowClear
          required
          name="organization"
          label="Company"
          placeholder="Select or add company"
          onSearch={onSearchCompany}
          filterOption={false}
          options={companys}
          onChange={onChangeCompany}
          dropdownRender={{
            text: "Add company",
            onAdd: () => dispatch(postCompany(companySearch)),
          }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          allowClear
          required
          name="title"
          label="Position"
          placeholder="Select or add position"
          onSearch={onSearchPosition}
          filterOption={false}
          options={positions}
          onChange={onChangePosition}
          dropdownRender={{
            text: "Add Position",
            onAdd: () => dispatch(postPosition(positionSearch)),
          }}
        />
      </Col>
      {/* <Col span={24}>
        <FormSelect
          allowClear
          name="title"
          label="Degree"
          placeholder="Select degree"
          optionFilterProp="label"
          options={certificates}
          onChange={onChangeDegree}
          rules={[
            {
              required: true,
              message: "Please select degree",
            },
          ]}
        />
      </Col> */}
    </Row>
  );
};

export default ModalForm(FormWorkingHistory);
