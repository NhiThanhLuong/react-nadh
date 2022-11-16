import { Card, Col, InputNumber, Row } from "antd";
import { FormBenefit, FormSelect } from "components";
import { useSelector } from "react-redux";
import { Item } from "styles/styled";

const RemunerationAndRewards = () => {
  const currencies = useSelector(state => state.currency.currencies);

  const benefits = [
    {
      key: 1,
      label: "Over x month",
      name_radio: "over_thirteen",
      name_text: "over_thirteen_text",
    },
    {
      key: 2,
      label: "Lunch check",
      name_radio: "lunch_check",
      name_text: "lunch_check_text",
    },
    {
      key: 3,
      label: "Parking check",
      name_radio: "car_parking",
      name_text: "car_parking_text",
    },
    {
      key: 4,
      label: "Car allowance",
      name_radio: "car_allowance",
      name_text: "car_allowance_text",
    },
    {
      key: 5,
      label: "Phone allowance",
      name_radio: "phone",
      name_text: "phone_text",
    },
    {
      key: 6,
      label: "Laptop",
      name_radio: "laptop",
      name_text: "laptop_text",
    },
    {
      key: 7,
      label: "Share options",
      name_radio: "share_option",
      name_text: "share_option_text",
    },
    {
      key: 8,
      label: "Health cover",
      name_radio: "health_cover",
      name_text: "health_cover_text",
    },
  ];

  return (
    <Card
      title={<span style={{ color: "#465f7b" }}>Remuneration And Rewards</span>}
      style={{ marginBottom: 16 }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Item name="current_salary" label="Based salary (VND)">
            <InputNumber min={0} className="w-full" />
          </Item>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <FormSelect
              name="currency"
              showSearch={false}
              options={currencies}
            />
          </Row>
        </Col>
        {benefits.map(({ key, label, name_radio, name_text }) => (
          <Col span={12} key={key}>
            <FormBenefit
              label={label}
              name_radio={name_radio}
              name_text={name_text}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RemunerationAndRewards;
