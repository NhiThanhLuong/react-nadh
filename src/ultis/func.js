export const convertKeys = {
  candidate_id: "ID",
  full_name: "Name",
  priority_status: "Primary Status",
  language: "Language",
  highest_education: "highest_education",
  location: "City",
  industry_id: "industry_id",
  yob: "YOB",
  flow_status: "Activity",
  current_company_text: "Recent Company",
  current_position_text: "Recent positions",
  industry_years: "Year of services",
  management_years: "Year of management",
};

import { candidate_priority_status } from "./const";

export const formatKeyFilterTags = key => convertKeys[key];

export const formatValueFilterTags = (key, value, languages, activites) => {
  if (key === "priority_status")
    return candidate_priority_status.find(item => item.key === value)?.label;
  else if (key === "language") {
    return value
      .split(",")
      .map(val => languages.find(item => item.key === +val)?.label)
      .join(", ");
  } else if (key === "flow_status") {
    return value
      .split(",")
      .map(val => activites.find(item => item.id === +val)?.label)
      .join(", ");
  }

  if (key === "location") {
    // console.log(value);
  }

  return value;
};

export const formatDate = date => {
  // date: yyyy-mm-dd
  if (!date) return {};
  const [year, month, day] = date.split("-");
  return {
    year,
    month,
    day,
  };
};

export const formatCity = (country, city) => {
  if (country && city) return `${country} - ${city}`;
  return country || city;
};

export const deleteKeyNull = obj => {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};
