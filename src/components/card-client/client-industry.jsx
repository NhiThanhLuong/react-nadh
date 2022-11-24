/* eslint-disable no-unused-vars */
import { Button, Card, Col, Form, Input, Row } from "antd";
import { FormIndustry, IndustryDetailCandidate } from "components";
import React from "react";
import { toast } from "react-toastify";
import { deleteKeyNull } from "ultis/func";

const ClientIndustry = ({ data, callBack }) => {
  const [form] = Form.useForm();

  const newData = data =>
    data.map(({ industry, sector, category, primary }) =>
      deleteKeyNull({
        industry_id: industry.id,
        sector_id: sector?.id,
        category_id: category?.id,
        primary,
      })
    );

  const onDeleteItem = (_, __, index) => {
    const removeData = newData(data).filter((_, idx) => idx !== index);
    callBack(removeData);
  };

  const onSave = () => {
    const { industry_id, sector_id, category_id } = form.getFieldsValue();
    const business_line = deleteKeyNull({
      industry_id,
      sector_id,
      category_id,
    });
    const isDuplicate = data.find(
      item =>
        Object.keys(item).length === Object.keys(business_line).length + 1 &&
        item.industry.id === business_line.industry_id &&
        (business_line.sector_id
          ? business_line.sector_id === item.sector.id
          : true) &&
        (business_line.category_id
          ? business_line.category_id === item.category.id
          : true)
    );

    if (isDuplicate) {
      toast.error("Duplicated Industry", {
        position: "top-right",
      });
      return;
    }

    callBack([business_line, ...newData(data)]);
    form.resetFields();
  };

  const onChecked = (checked, checkIndex) => {
    const checkedData = newData(data).map((item, idx) => {
      if (idx === checkIndex)
        return {
          ...item,
          primary: checked ? 1 : -1,
        };
      return item;
    });
    callBack(checkedData);
  };

  return (
    <Card
      title={<span style={{ color: "#465f7b" }}>Industry</span>}
      className="mb-1"
    >
      <Form form={form}>
        <FormIndustry form={form} />
        <Col>
          <Form.Item dependencies={["industry_id"]}>
            {({ getFieldValue }) => {
              const industry_id = getFieldValue("industry_id");
              return industry_id ? (
                <Row justify="end" className="my-1">
                  <Button
                    style={{ marginRight: 16 }}
                    danger
                    onClick={() => form.resetFields()}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" onClick={onSave}>
                    Save Industry
                  </Button>
                </Row>
              ) : null;
            }}
          </Form.Item>
        </Col>
        <IndustryDetailCandidate
          dataSource={data}
          onDeleteItem={onDeleteItem}
          onChecked={onChecked}
        />
      </Form>
    </Card>
  );
};

export default ClientIndustry;
// <Form.Item name="a">
//   <Row justify="end" style={{ marginBottom: 16 }}>
//     <Button
//       style={{ marginRight: 16 }}
//       danger
//       onClick={onReset}
//     >
//       Cancel
//     </Button>
//     <Button type="primary" onClick={onSave}>
//       Save Industry
//     </Button>
//   </Row>
// </Form.Item>
