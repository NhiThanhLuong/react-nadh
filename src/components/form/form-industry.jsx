import { Col, Row } from "antd";
import {
  fetchCategory,
  fetchIndustries,
  fetchSectors,
} from "features/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "./form-select";
import FormSelectDepend from "./form-select-depend";

const FormIndustry = ({ form }) => {
  const dispatch = useDispatch();

  const industries = useSelector(state => state.category.industries);
  const sectors = useSelector(state => state.category.sectors);
  const categories = useSelector(state => state.category.categories);

  const onDropdownIndustry = open => {
    open &&
      industries.length === 0 &&
      dispatch(
        fetchIndustries({
          type: 1,
        })
      );
  };

  const onChangeIndustry = () => {
    form.setFieldsValue({
      sector_id: null,
      category_id: null,
    });
  };

  const onDropdownSector = open => {
    if (open) {
      const industry_id = form.getFieldValue("industry_id");
      dispatch(
        fetchSectors({
          parent_id: industry_id,
          type: 2,
        })
      );
    }
  };

  const onChangeSector = () => {
    form.setFieldsValue({
      category_id: null,
    });
  };

  const onDropdownCategory = open => {
    if (open) {
      const sector_id = form.getFieldValue("sector_id");
      dispatch(
        fetchCategory({
          parent_id: sector_id,
          type: 3,
        })
      );
    }
  };

  return (
    <Row gutter={16}>
      <Col span={8}>
        <FormSelect
          allowClear
          name="industry_id"
          options={industries}
          onDropdownVisibleChange={onDropdownIndustry}
          placeholder="Select Industry"
          onChange={onChangeIndustry}
        />
      </Col>
      <Col span={8}>
        <FormSelectDepend
          allowClear
          name="sector_id"
          name_parent="industry_id"
          options={sectors}
          onDropdownVisibleChange={onDropdownSector}
          onChange={onChangeSector}
          placeholder="Select Sector"
        />
      </Col>
      <Col span={8}>
        <FormSelectDepend
          allowClear
          name="category_id"
          name_parent="sector_id"
          options={categories}
          onDropdownVisibleChange={onDropdownCategory}
          placeholder="Select Category"
        />
      </Col>
    </Row>
  );
};

export default FormIndustry;
