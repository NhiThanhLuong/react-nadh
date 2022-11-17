import { Card, Col, InputNumber, Row } from "antd";
import { FormBenefit, FormSelect } from "components";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import { Item } from "styles/styled";
import { BENEFITS } from "ultis/const";
import { getPropertyKeyLabel } from "ultis/func";

const RemunerationAndRewards = ({ form }) => {
  const { current_salary, currency } = form.getFieldsValue();
  const refCurrency = useRef(currency);

  const currencies = useSelector(state => state.currency.currencies);

  useMemo(() => (refCurrency.current = currency), [currency]);

  const onChangeCurency = value => {
    const oldCurrency = refCurrency.current;
    refCurrency.current = value;
    const newCurrency = refCurrency.current;

    const rate = currencies
      .find(({ key }) => key === oldCurrency)
      .rate.find(({ key }) => key === newCurrency).value;

    form.setFieldsValue({
      current_salary: current_salary * rate,
    });
  };

  return (
    <Card
      title={<span style={{ color: "#465f7b" }}>Remuneration And Rewards</span>}
      style={{ marginBottom: 16 }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Item
            ref={refCurrency}
            name="current_salary"
            label="Based salary (VND)"
          >
            <InputNumber
              min={0}
              className="w-full"
              formatter={value =>
                `${value}`
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  .replace(/\.(?=\d{0,3}$)/g, ".")
              }
              parser={value => value.replace(/\$\s?|(,*)/g, "")}
              precision={2}
            />
          </Item>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <FormSelect
              name="currency"
              showSearch={false}
              options={getPropertyKeyLabel(currencies)}
              onChange={onChangeCurency}
            />
          </Row>
        </Col>
        {BENEFITS.map(({ key, label, name_radio, name_text }) => (
          <Col span={12} key={key}>
            <FormBenefit
              label={label}
              name_radio={name_radio}
              name_text={name_text}
            />
          </Col>
        ))}

        <Col span={12}>
          <Item name="pension_scheme" label="Pension scheme">
            <InputNumber
              min={0}
              max={100}
              formatter={(value = 0) => `${value}%`}
              parser={value => value.replace("%", "")}
              className="w-full"
            />
          </Item>
        </Col>
        <Col span={12}>
          <Row align="middle" gutter={8}>
            <Col span={22}>
              <Item name="no_holiday" label="Annual leaves">
                <InputNumber min={0} className="w-full" />
              </Item>
            </Col>
            <Col span={2}>
              <span
                style={{
                  lineHeight: "32px",
                }}
              >
                day(s)
              </span>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Item label="Hours of work/overtime">
            <Row gutter={8}>
              <Col span={7}>
                <Item name="working_hour">
                  <InputNumber min={0} className="w-full" />
                </Item>
              </Col>
              <Col span={5}>
                <span
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  hours per day
                </span>
              </Col>
              <Col span={7}>
                <Item name="overtime_hour">
                  <InputNumber min={0} className="w-full" />
                </Item>
              </Col>
              <Col span={5}>
                <span
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  hours per week
                </span>
              </Col>
            </Row>
          </Item>
        </Col>
        <Col span={24}>
          <Item label="Notice days">
            <Row gutter={8}>
              <Col span={7}>
                <Item name="notice_days">
                  <InputNumber min={0} className="w-full" />
                </Item>
              </Col>
              <Col span={5}>
                <span
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  hours per day
                </span>
              </Col>
            </Row>
          </Item>
        </Col>
        <Col span={24}>
          <Item label="Expected salary">
            <Row gutter={16}>
              <Col span={12}>
                <Item
                  name="salary_from"
                  label={
                    <span
                      style={{
                        fontSize: 12,
                        color: "rgba(0,0,0,.65)",
                      }}
                    >
                      From (VND)
                    </span>
                  }
                  dependencies={["salary_to"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          value &&
                          getFieldValue("salary_to") &&
                          +value > +getFieldValue("salary_to")
                        ) {
                          return Promise.reject(
                            new Error(
                              "Salary From must lower than or equal Salary To"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber min={0} className="w-full" />
                </Item>
              </Col>
              <Col span={12}>
                <Item
                  name="salary_to"
                  label={
                    <span
                      style={{
                        fontSize: 12,
                        color: "rgba(0,0,0,.65)",
                      }}
                    >
                      To (VND)
                    </span>
                  }
                  dependencies={["salary_from"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          value &&
                          getFieldValue("salary_from") &&
                          +value < +getFieldValue("salary_from")
                        ) {
                          return Promise.reject(
                            new Error(
                              "Salary To must higher than or equal Salary From"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber min={0} className="w-full" />
                </Item>
              </Col>
            </Row>
          </Item>
        </Col>
      </Row>
    </Card>
  );
};

export default RemunerationAndRewards;
