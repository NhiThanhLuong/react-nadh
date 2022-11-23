import { Col, Form, Input } from "antd";
import {
  fetchCities,
  fetchDistricts,
  fetchLocations,
} from "features/locationSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormSelect from "./form-select";
import FormSelectDepend from "./form-select-depend";

const FormAddress = ({
  form,
  name = ["address"],
  onChangeCountry,
  onChangeCity,
  onChangeDistrict,
}) => {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);
  const districts = useSelector(state => state.location.districts);

  console.log(form.getFieldValue(name));

  const onDropdownCountry = open => {
    open &&
      countries.length === 0 &&
      dispatch(
        fetchLocations({
          type: 4,
        })
      );
  };

  const onDropdownCity = open => {
    if (open) {
      const country = form.getFieldValue([...name, "country"]);
      dispatch(
        fetchCities({
          parent_id: country.key,
        })
      );
    }
  };

  const onDropdownDistrict = open => {
    if (open) {
      const city = form.getFieldValue([...name, "city"]);
      dispatch(
        fetchDistricts({
          parent_id: city.key,
        })
      );
    }
  };

  return (
    <>
      <Col span={8}>
        <FormSelect
          name={[...name, "country"]}
          allowClear
          placeholder="Country"
          options={countries}
          optionFilterProp="label"
          onDropdownVisibleChange={onDropdownCountry}
          onChange={onChangeCountry}
        />
      </Col>
      <Col span={8}>
        <FormSelectDepend
          allowClear
          placeholder="City"
          name={[...name, "city"]}
          name_parent={[...name, "country"]}
          optionFilterProp="label"
          options={cities}
          onDropdownVisibleChange={onDropdownCity}
          onChange={onChangeCity}
        />
      </Col>
      <Col span={8}>
        <FormSelectDepend
          allowClear
          placeholder="District"
          name={[...name, "district"]}
          name_parent={[...name, "city"]}
          optionFilterProp="label"
          options={districts}
          onDropdownVisibleChange={onDropdownDistrict}
          onChange={onChangeDistrict}
        />
      </Col>
      <Col span={24}>
        <Form.Item name={[...name, "address"]} className="m-0">
          <Input
            className="w-full"
            placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
          />
        </Form.Item>
      </Col>
    </>
  );
};

export default FormAddress;
