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
  const [isChecked, setIsChecked] = useState(form.getFieldValue("status"));

  const companys = useSelector(state => state.company.companys);
  const positions = useSelector(state => state.position.positions);

  //   const certificates = useSelector(state => state.degree.certificates);

  useEffect(() => {
    dispatch(fetchCompanys());
  }, []);

  useEffect(() => {
    if (isChecked) {
      setIsChecked(isChecked);
      form.setFieldsValue({
        end_month: null,
        end_year: null,
      });
      fieldsChanges.end_month = null;
      fieldsChanges.end_year = null;
    }
  }, [isChecked]);

  const onChecked = e => {
    setIsChecked(e.target.checked);
  };
  const onChangeStartMotnh = month => {
    form.validateFields(["start_year", "end_month"]);
    fieldsChanges.start_month = month || null;
  };
  const onChangeStartYear = year => {
    form.validateFields(["start_month", "end_year"]);
    fieldsChanges.start_year = year || null;
  };

  const onChangeEndMotnh = month => {
    form.validateFields(["end_year", "start_month"]);
    fieldsChanges.end_month = month || null;
  };
  const onChangeEndYear = year => {
    form.validateFields(["end_month", "start_year"]);
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
                  {
                    required: true,
                    message: "This field is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value && !!getFieldValue("start_month"))
                        return Promise.reject(new Error("Please select Year"));

                      if (
                        value &&
                        !!getFieldValue("end_year") &&
                        +value > +getFieldValue("end_year")
                      )
                        return Promise.reject(
                          new Error("Start year not higher end year")
                        );

                      return Promise.resolve();
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
                  {
                    required: !isChecked,
                    message: "This field is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value && !!getFieldValue("end_month"))
                        return Promise.reject(new Error("Please select Year"));

                      if (
                        value &&
                        !!getFieldValue("start_year") &&
                        +value < +getFieldValue("start_year")
                      )
                        return Promise.reject(
                          new Error("End year not lower start year")
                        );

                      return Promise.resolve();
                    },
                  }),
                ]}
                onChange={onChangeEndYear}
              />
            </Col>
          </Row>
        </Item>
      </Col>
      <Col span={24}>
        <FormSelect
          allowClear
          required
          rules={[
            {
              required: true,
              message: "Please select Company",
            },
          ]}
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
          name="title"
          required
          rules={[
            {
              required: true,
              message: "Please select Position",
            },
          ]}
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
    </Row>
  );
};

export default ModalForm(FormWorkingHistory);
