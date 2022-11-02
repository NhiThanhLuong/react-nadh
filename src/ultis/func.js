export const convertKeys = {
  candidate_id: "ID",
  full_name: "Name",
  priority_status: "Primary Status",
  language: "Language",
  highest_education: "highest_education",
  location: "City",
  industry_id: "industry_id",
  yob: "YOB",
  current_company_text: "Recent Company",
};

// const convertKeys = [
//   "ID",
//   "Name",
//   "Primary Status",
//   "Language",
//   "highest_education",
//   "City",
//   "industry_id",
//   "YOB",
// ];

import { candidate_priority_status } from "./const";

export const formatKeyFilterTags = key => convertKeys[key];

export const formatValueFilterTags = (key, value, options1) => {
  if (key === "priority_status")
    return candidate_priority_status.find(item => item.key === value).label;

  if (key === "language") {
    return value
      .split(",")
      .map(val => options1.find(item => item.key === +val)?.label)
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

export const deleleKeyNull = obj => {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};
