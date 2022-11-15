/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Row, Col, Checkbox } from "antd";
import { Item } from "styles/styled";
import { deleteKeyNull, getPropertyKeyLabelObj, years } from "ultis/func";
import { FormSelect } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchools, postSchool } from "features/schoolSlice";
import { fetchMajors, postMajor } from "features/majorSlice";
import ModalForm from "HOC/modal-form";
import {
  fetchDetailCandidateNotLoading,
  PostCandidateHistory,
} from "features/candidatesSlice";
import { hideModal } from "features/modalSlice";

const FormAcademic = ({ fieldsChanges, typeModal }) => {
  const dispatch = useDispatch();

  const [schoolSearch, setSchoolSearch] = useState(null);
  const [majorSearch, setMajorSearch] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const schools = useSelector(state => state.school.schools);
  const majors = useSelector(state => state.major.majors);
  const degrees = useSelector(state => state.degree.degrees);

  const onChecked = e => {
    setIsChecked(e.target.checked);
  };

  const onChangeStartYear = year => {
    fieldsChanges.start_time = year ? `${year}-01-01` : null;
  };

  const onChangeGradutionYear = year => {
    fieldsChanges.end_time = year ? `${year}-01-01` : null;
  };

  const onSearchSchool = value => {
    setSchoolSearch(() => value);
    dispatch(
      fetchSchools({
        value,
      })
    );
  };

  const onChangeSchool = (_, option) => {
    fieldsChanges.organization = _ ? getPropertyKeyLabelObj(option) : null;
  };

  const onSearchMajor = value => {
    setMajorSearch(() => value);
    dispatch(
      fetchMajors({
        value,
      })
    );
  };

  const onChangeMajor = (_, option) => {
    fieldsChanges.title = _ ? getPropertyKeyLabelObj(option) : null;
  };

  const onChangeDegree = (_, option) => {
    fieldsChanges.degree = getPropertyKeyLabelObj(option);
  };

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Item name="status" valuePropName="checked">
          <Checkbox onChange={onChecked}>Current school</Checkbox>
        </Item>
      </Col>
      <Col span={12}>
        <FormSelect
          allowClear
          name="start_year"
          label="Start Year"
          placeholder="Start Year"
          isKeyLabel={false}
          optionFilterProp="label"
          options={years()}
          onChange={onChangeStartYear}
        />
      </Col>
      <Col span={12}>
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
      </Col>
      <Col span={24}>
        <FormSelect
          allowClear
          name="organization"
          label="School"
          placeholder="Select or add school"
          onSearch={onSearchSchool}
          filterOption={false}
          options={schools}
          onChange={onChangeSchool}
          dropdownRender={{
            text: "Add school",
            onAdd: () => dispatch(postSchool(schoolSearch)),
          }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          allowClear
          name="title"
          label="Major"
          placeholder="Select or add major"
          onSearch={onSearchMajor}
          onChange={onChangeMajor}
          filterOption={false}
          options={majors}
          dropdownRender={{
            text: "Add major",
            onAdd: () => dispatch(postMajor(majorSearch)),
          }}
        />
      </Col>
      <Col span={24}>
        <FormSelect
          allowClear
          name="degree"
          label="Degree"
          placeholder="Select degree"
          optionFilterProp="label"
          options={degrees}
          onChange={onChangeDegree}
          rules={[
            {
              required: true,
              message: "Please select degree",
            },
          ]}
        />
      </Col>
    </Row>
  );
};

export default ModalForm(FormAcademic);
