export const convertKeys = {
  candidate_id: "ID",
  full_name: "Name",
  priority_status: "Primary Status",
  language: "Language",
  highest_education: "highest_education",
  location: "City",
  industry_text: "Industry",
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
  return city ? `${country} - ${city}` : country || "";
};

export const formatIndustry = (obj, industries, sectors, categories) => {
  const { industry, sector, category } = obj;
  const industryLable = industries.find(({ key }) => key === +industry)?.label;
  const sectorLable = sectors.find(({ key }) => key === +sector)?.label;
  const categoryLable = categories.find(({ key }) => key === +category)?.label;

  if (category) return `${industryLable} / ${sectorLable} / ${categoryLable}`;
  if (sector) return `${industryLable} / ${sectorLable}`;
  return industryLable || "";
};

export const getLabelIndustry = obj => {
  return obj.category?.label || obj.sector?.label || obj.industry?.label || "";
};

export const deleteKeyNull = obj => {
  Object.keys(obj).forEach(key => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
  return obj;
};

export const formatFilterTagRange = (sharedKey, obj, from, to) => {
  const filterYearFrom = obj[from] ? `from ${obj[from]} ` : "";
  const filterYearTo = obj[to] ? `to ${obj[to]}` : "";
  obj[sharedKey] = filterYearFrom + filterYearTo;
};

export function pad2(number) {
  return (number < 10 ? "0" : "") + number;
}

export const years = (startYear = 1960) => {
  var currentYear = new Date().getFullYear(),
    years = [];
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

export const formatDDMMYYYY = date => {
  date = new Date(date);
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const getPropertyKeyLabel = arr =>
  arr?.map(({ key, label }) => ({
    key,
    label,
  }));
