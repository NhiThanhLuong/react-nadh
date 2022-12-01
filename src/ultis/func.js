export const convertKeys = {
  candidate_id: "ID",
  client_id: "ID",
  full_name: "Name",
  priority_status: "Primary Status",
  language: "Language",
  highest_education: "highest_education",
  location: "City",
  industry_text: "Industry",
  yob: "YOB",
  client_jobs: "Job(s)",
  flow_status: "Activity",
  current_company_text: "Recent Company",
  current_position_text: "Recent positions",
  industry_years: "Year of services",
  management_years: "Year of management",
  name: "Trade Name",
  lead_consultants: "Lead Consultants",
  type: "Type",
  status: "Status",
  contact_person_name: "Contact Person's Name",
  contact_person_title: "Contact Person's Title",
  updated_on: "Updated on",
  account_status: "Activity",
  cpa: "CPA",
  job_id: "ID",
  title: "Title",
  quantity: "Quantity",
  target_date: "Open date",
  end_date: "Expire date",
  search_consultants: "Search Consultants",
  candidate_flows_status: "Activity",
};

export const formatKeyFilterTags = key => convertKeys[key];

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

export function clearEmpties(o) {
  for (var k in o) {
    if (!o[k] || typeof o[k] !== "object") {
      continue; // If null or not an object, skip to the next iteration
    }

    // The property is an object
    if (Object.keys(o[k]).length === 0) {
      delete o[k]; // The object had no properties, so delete that property
    }
    return o;
  }
}

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

export const format_day_month_year_to_date = (d, m, y) =>
  `${y}-${pad2(m)}-${pad2(d)}`;

export const getPropertyKeyLabel = arr =>
  arr?.map(({ key, label }) => ({
    key,
    label,
  }));

export const getPropertyKeyLabelObj = obj => {
  if (!obj) return {};
  return {
    key: +obj.key || obj.key,
    label: obj.label,
  };
};

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const get_obj_key_label_from_key = (options, key) =>
  options.find(item => item.key === key);

export const get_obj_key_label_from_id = (options, id) =>
  options.find(item => item.id === id);

export const get_array_obj_key_label_from_array_key = (options, key_arr) =>
  key_arr.map(key => get_obj_key_label_from_key(options, key));

export const get_array_obj_key_label_from_array_id = (options, id_arr) =>
  id_arr.map(id => get_obj_key_label_from_id(options, id));

export const get_params_payload_id_from_industry_form_arr = arr =>
  arr.map(item =>
    deleteKeyNull({
      industry_id: item.industry ? item.industry.id : null,
      sector_id: item.sector ? item.sector.id : null,
      category_id: item.category ? item.category.id : null,
      primary: item?.primary,
    })
  );

export const delete_key_object = (obj, key) => {
  if (obj[key]) delete obj[key];
};

export const format_address_obj_to_text = obj =>
  `${obj.address ? `${obj.address}, ` : ""}${
    obj.district ? `${obj.district.label}, ` : ""
  }${obj.city ? `${obj.city.label}, ` : ""}${
    obj.country ? `${obj.country.label}, ` : ""
  }`.slice(0, -2);
