import { useState, useEffect } from "react";
import { Modal, Form, Checkbox, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Item } from "styles/styled";
import { years, formatDate } from "ultis/func";
import FormSelect from "./form-select";
import { fetchSchools, postSchool } from "features/schoolSlice";
import { fetchMajors, postMajor } from "features/majorSlice";
import { hideModal } from "features/modalSlice";
import { deleteHistory } from "features/candidatesSlice";
import { TYPE_MODAL } from "ultis/const";

const FormAddEducation = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const {
    school: { schools },
    major: { majors },
    degree: { degrees },
    modal: { showModal, type_modal },
    candidates: { history },
  } = useSelector(state => state);

  const [schoolSearch, setSchoolSearch] = useState(null);
  const [majorSearch, setMajorSearch] = useState(null);

  useEffect(() => {
    if (showModal) {
      dispatch(fetchSchools());
      dispatch(fetchMajors());
      console.log("history", history);
      form.setFieldsValue({
        status: history?.status === 1,
        start_year: history?.start_time
          ? formatDate(history?.start_time).year
          : null,
        end_year: history?.end_time ? formatDate(history?.end_time).year : null,
        organization: history?.organization || null,
        title: history?.title || null,
        degree: history?.degree || null,
      });
    }
  }, [showModal]);

  const onCancel = () => {
    dispatch(hideModal());
  };

  const onDeleteHistory = () => {
    dispatch(deleteHistory(history.id));
    dispatch(hideModal());
  };

  const onSearchSchool = value => {
    setSchoolSearch(() => value);
    dispatch(
      fetchSchools({
        value,
      })
    );
  };

  const onSearchMajor = value => {
    setMajorSearch(() => value);
    dispatch(
      fetchMajors({
        value,
      })
    );
  };

  const onFinish = values => {
    console.log(values);
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      open={showModal}
      centered
      title={
        <Row justify="space-between" align="middle">
          <span>Add Education</span>
          {type_modal === TYPE_MODAL.edit_candidate_history && (
            <Button danger type="primary" onClick={onDeleteHistory}>
              Delete
            </Button>
          )}
        </Row>
      }
      width={700}
      closable={false}
      onCancel={onCancel}
      onOk={onSubmit}
      okText={type_modal === TYPE_MODAL.edit_candidate_history ? "Save" : "Add"}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Item name="status" valuePropName="checked">
              <Checkbox>Current school</Checkbox>
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
            />
          </Col>
          <Col span={12}>
            <FormSelect
              allowClear
              name="end_year"
              label="Graduation year"
              placeholder="Graduation year"
              isKeyLabel={false}
              optionFilterProp="label"
              options={years()}
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
              rules={[
                {
                  required: true,
                  message: "Please select degree",
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormAddEducation;
