import React, { useCallback, useState } from "react";
import { Button, Card, Col, Row, Select, TreeSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

import { Item } from "styles/styled";
import { FormCkeditor, IndustryDetailCandidate } from "components";
import {
  deleteKeyNull,
  getPropertyKeyLabelObj,
  get_array_obj_key_label_from_array_key,
  get_params_payload_id_from_industry_form_arr,
} from "ultis/func";
import {
  fetchFunctionSoftSkills,
  putSoftSkillDetailCandidate,
} from "features/skillSlice";
import { fetchLanguages } from "features/languageSlice";
import {
  putEditDetailCandidateNotLoading,
  putIndustryDetailCandidate,
  putLanguageDetailCandidate,
} from "features/candidatesSlice";
import { fetchCategory, fetchSectors } from "features/categorySlice";

const { Option } = Select;
const { TreeNode } = TreeSelect;

const SkillAndIndustry = ({ form }) => {
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState(false);

  const detailData = useSelector(state => state.candidates.detailData);
  const isDetailLoading = useSelector(
    state => state.candidates.isDetailLoading
  );

  const softSkills = useSelector(state => state.skill.softSkills);
  const functionSkills = useSelector(state => state.skill.functionSkills);

  const languages = useSelector(state => state.language.languages);
  const loadingLanguage = useSelector(state => state.language.loading);

  const industries = useSelector(state => state.category.industries);
  const sectors = useSelector(state => state.category.sectors);
  const categories = useSelector(state => state.category.categories);

  const { industry_id, sector_id, category_id } = form.getFieldsValue();

  const onChangeSoftSkill = value => {
    const values = get_array_obj_key_label_from_array_key(softSkills, value);
    dispatch(
      putSoftSkillDetailCandidate({
        id: detailData?.id,
        params: {
          soft_skills: values,
        },
      })
    );
  };

  const onSearchFunctionSkill = value => {
    dispatch(
      fetchFunctionSoftSkills(
        value
          ? {
              children_name: value,
            }
          : {}
      )
    );
  };

  const onSearchLanguage = value => {
    dispatch(
      fetchLanguages({
        value,
      })
    );
  };

  const onSelectLanguage = (_, option) => {
    dispatch(
      putLanguageDetailCandidate({
        id: detailData.id,
        params: {
          languages: [...detailData.languages, getPropertyKeyLabelObj(option)],
        },
      })
    );
  };

  const onDeleteLanguage = key => {
    dispatch(
      putLanguageDetailCandidate({
        id: detailData.id,
        params: {
          languages: detailData.languages.filter(item => item.key !== key),
        },
      })
    );
  };

  const onChangeIndustry = () => {
    form.setFieldsValue({
      sector_id: null,
      category_id: null,
    });
  };

  const onChangeSector = () => {
    form.setFieldsValue({
      category_id: null,
    });
  };

  const onDropdownSector = open => {
    open &&
      dispatch(
        fetchSectors({
          parent_id: industry_id,
          type: 2,
        })
      );
  };

  const onDropdownCategory = open => {
    open &&
      dispatch(
        fetchCategory({
          parent_id: sector_id,
          type: 3,
        })
      );
  };

  const onResetIndustry = () => {
    form.setFieldsValue({
      industry_id: null,
      sector_id: null,
      category_id: null,
    });
    setIsChange(!isChange);
  };

  const onSaveIndustry = () => {
    const initBusinessLine = get_params_payload_id_from_industry_form_arr(
      detailData.business_line
    );
    const newBusinessLine = [
      ...initBusinessLine,
      deleteKeyNull({
        industry_id,
        sector_id,
        category_id,
      }),
    ];

    dispatch(
      putIndustryDetailCandidate({
        id: detailData.id,
        params: {
          business_line: newBusinessLine,
        },
      })
    );
    onResetIndustry();
  };

  const onDeleteIndustryItem = (_, __, index) => {
    const newBusinessLine = get_params_payload_id_from_industry_form_arr(
      detailData.business_line.filter((_, id) => id !== index)
    );
    dispatch(
      putIndustryDetailCandidate({
        id: detailData.id,
        params: {
          business_line: newBusinessLine,
        },
      })
    );
  };

  const onCheckedPrimaryIndustry = useCallback(
    (checked, index) => {
      const newBusinessLine = detailData.business_line.map((item, id) => {
        if (id === index)
          return {
            ...item,
            primary: checked ? 1 : -1,
          };
        return item;
      });
      dispatch(
        putEditDetailCandidateNotLoading({
          id: detailData.id,
          params: {
            business_line:
              get_params_payload_id_from_industry_form_arr(newBusinessLine),
          },
        })
      );
    },
    [detailData]
  );

  return (
    <Card
      title={<span style={{ color: "#465f7b" }}>Skills And Industry</span>}
      style={{ marginBottom: 16 }}
    >
      {/* Soft skills and Functions Skills */}
      <Row gutter={(16, 16)}>
        <Col span={12}>
          <Item label="Soft skills">
            <Select
              mode="multiple"
              placeholder="Select your soft skills"
              allowClear
              showSearch
              optionFilterProp="label"
              style={{
                width: "100%",
              }}
              onChange={onChangeSoftSkill}
              defaultValue={detailData?.soft_skills || []}
            >
              {softSkills.map(({ key, label }) => (
                <Option key={key} value={+key} label={label}>
                  {label}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>
        <Col span={12}>
          <Item name="functions_skills" label="Job functions skills">
            <TreeSelect
              multiple
              placeholder="Select your job functions skills"
              allowClear
              showSearch
              filterTreeNode={false}
              treeDefaultExpandAll
              style={{
                width: "100%",
              }}
              onSearch={onSearchFunctionSkill}
            >
              {functionSkills.map(({ key, label, children }) => (
                <TreeNode disabled key={key} value={+key} title={label}>
                  {children.map(({ key, label }) => (
                    <TreeNode key={key} value={+key} title={label}>
                      {label}
                    </TreeNode>
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Item>
        </Col>
      </Row>
      {/* Languages */}
      <Row gutter={(16, 16)}>
        <Col span={24}>
          <Item label="Languages">
            <Select
              placeholder="Select "
              showSearch
              optionFilterProp="label"
              onSearch={onSearchLanguage}
              onSelect={onSelectLanguage}
              style={{
                width: "100%",
              }}
            >
              {languages?.map(({ key, label }) => (
                <Option
                  key={key}
                  value={key}
                  label={label}
                  disabled={detailData?.languages.find(
                    item => item.key === key
                  )}
                >
                  {label}
                </Option>
              ))}
            </Select>
          </Item>
        </Col>
        <Col span={24} style={{ paddingLeft: 24 }}>
          <Item label="List of Languages">
            <Row>
              {!loadingLanguage &&
                detailData?.languages.map(({ key, label }) => (
                  <Col key={key} span={12}>
                    <span>
                      {label}{" "}
                      <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => onDeleteLanguage(key)}
                      />
                    </span>
                  </Col>
                ))}
            </Row>
          </Item>
        </Col>
      </Row>
      {/* Industry */}
      <Row gutter={(16, 16)} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Item label="Industry" style={{ margin: 0 }}>
            <Row gutter={(16, 16)}>
              <Col span={8}>
                <Item name="industry_id" style={{ margin: 0 }}>
                  <Select
                    placeholder="Select your industry"
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    onChange={onChangeIndustry}
                    style={{
                      width: "100%",
                    }}
                  >
                    {industries?.map(({ key, label }) => (
                      <Option key={key} value={+key} label={label}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={8}>
                <Item name="sector_id" style={{ margin: 0 }}>
                  <Select
                    placeholder="Select your sector"
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    onChange={onChangeSector}
                    onDropdownVisibleChange={onDropdownSector}
                    disabled={!industry_id}
                    style={{
                      width: "100%",
                    }}
                  >
                    {sectors?.map(({ key, label }) => (
                      <Option key={key} value={+key} label={label}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
              <Col span={8}>
                <Item name="category_id" style={{ margin: 0 }}>
                  <Select
                    placeholder="Select your category"
                    showSearch
                    allowClear
                    optionFilterProp="label"
                    onDropdownVisibleChange={onDropdownCategory}
                    disabled={!sector_id}
                    style={{
                      width: "100%",
                    }}
                  >
                    {categories?.map(({ key, label }) => (
                      <Option key={key} value={+key} label={label}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </Item>
              </Col>
            </Row>
          </Item>
        </Col>
      </Row>
      {!!industry_id && (
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button style={{ marginRight: 16 }} danger onClick={onResetIndustry}>
            Cancel
          </Button>
          <Button type="primary" onClick={onSaveIndustry}>
            Save Industry
          </Button>
        </Row>
      )}
      {!isDetailLoading && (
        <IndustryDetailCandidate
          dataSource={detailData.business_line}
          onDeleteItem={onDeleteIndustryItem}
          onChecked={onCheckedPrimaryIndustry}
        />
      )}
      <FormCkeditor
        name="skill_other"
        label="Other"
        data={detailData.extra.skill_other}
      />
    </Card>
  );
};

export default SkillAndIndustry;
