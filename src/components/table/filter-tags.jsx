import { Tag } from "antd";
import {
  formatKeyFilterTags,
  formatValueFilterTags,
  deleteKeyNull,
  convertKeys,
} from "ultis/func";

const FilterTags = ({ data, onClose, languages, activities }) => {
  const newData = {
    candidate_id: data.candidate_id,
    full_name: data.full_name,
    priority_status: data.priority_status,
    language: data.language,
    highest_education: data.highest_education,
    location: data.location,
    industry_text: data.industry_text,
    yob: data.yob,
    flow_status: data.flow_status,
    current_company_text: data.current_company_text,
    current_position_text: data.current_position_text,
    industry_years: data.industry_years,
    management_years: data.management_years,
    ...data,
  };
  deleteKeyNull(newData);
  return (
    <div style={{ margin: "8px 0" }}>
      {Object.keys(newData).map(key => {
        if (Object.keys(convertKeys).indexOf(key) === -1) return;
        return (
          <Tag
            key={key}
            closable
            onClose={() => onClose(key)}
            style={{ fontSize: "14px" }}
          >
            {formatKeyFilterTags(key)} : <span> </span>
            {formatValueFilterTags(key, newData[key], languages, activities)}
          </Tag>
        );
      })}
    </div>
  );
};

FilterTags.propTypes = {};

export default FilterTags;
