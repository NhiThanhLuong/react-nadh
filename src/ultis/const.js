const ACTIVE = {
  id: 1,
  key: "1",
  label: "Active",
  name: "Active",
  color: "green",
};
const OFFLIMIT = {
  id: -1,
  key: "-1",
  label: "Off-limit",
  name: "Off-limit",
  color: "geekblue",
};
const BLACKLIST = {
  id: -2,
  key: "-2",
  label: "Blacklist",
  name: "Blacklist",
  color: "magenta",
};
const INACTIVE = {
  id: 5,
  key: "5",
  label: "Inactive",
  name: "Inactive",
  color: "red",
};

export const candidate_priority_status = [
  ACTIVE,
  OFFLIMIT,
  BLACKLIST,
  INACTIVE,
];

export const defaultColor = {
  color: "rgb(24, 144, 255)",
  hover: "#e5f7fe",
};

const RAW = { id: 1, key: "1", label: "Raw" };
const CALL = { id: 2, key: "2", label: "Screening Call" };
const INTERVIEW_NADH = { id: 3, key: "3", label: "Interview with NADH" };
const SHORT_LIST = { id: 4, key: "4", label: "Shortlisting" };
const SUBMIT_CLIENT = { id: 5, key: "5", label: "Submit to Client" };
const INTERVIEW_CLIENT = { id: 6, key: "6", label: "Interview with Client" };
const REFERENCE_CHECK = { id: 7, key: "7", label: "Reference Check" };
const NEGOTIATION = { id: 8, key: "8", label: "Negotiation" };
const OFFER_ACCEPTED = { id: 9, key: "9", label: "Offer Accepted" };
const PLACEMENT = { id: 10, key: "10", label: "Placement" };
const FOLLOW_UP = { id: 11, key: "11", label: "Follow-up" };
const RE_PLACEMENT = { id: 12, key: "12", label: "Replacement" };
const CANDIDATE_REJECT = { id: -1, key: "-1", label: "Candidate Declined" };
const NADH_REJECT = { id: -2, key: "-2", label: "Rejected by NADH" };
const CLIENT_REJECT = { id: -3, key: "-3", label: "Rejected by Client" };
const CLIENT_CANCELED = { id: -4, key: "-4", label: "Client Canceled" };

export const candidate_flow_status = [
  RAW,
  CALL,
  INTERVIEW_NADH,
  SHORT_LIST,
  SUBMIT_CLIENT,
  INTERVIEW_CLIENT,
  REFERENCE_CHECK,
  NEGOTIATION,
  OFFER_ACCEPTED,
  PLACEMENT,
  FOLLOW_UP,
  RE_PLACEMENT,
  CANDIDATE_REJECT,
  NADH_REJECT,
  CLIENT_REJECT,
  CLIENT_CANCELED,
];

export const key_of_keys = {
  location: ["country", "city"],
  industry_text: [
    "industry_id",
    "industry_type",
    "industry",
    "sector",
    "category",
  ],
  yob: ["yob_from", "yob_to"],
  client_jobs: ["client_jobs_from", "client_jobs_to"],
  industry_years: ["industry_years_from", "industry_years_to"],
  management_years: ["management_years_from", "management_years_to"],
  updated_on: ["updated_on_from", "updated_on_to"],
};

export const imgPath = path =>
  `https://lubrytics.com:8443/nadh-mediafile/file/${path}`;

export const DAYS_RANGE = Array.from({ length: 31 }, (_, i) => i + 1);

export const MONTHS = [
  {
    key: 1,
    label: "Jan",
  },
  {
    key: 2,
    label: "Feb",
  },
  {
    key: 3,
    label: "Mar",
  },
  {
    key: 4,
    label: "Apr",
  },
  {
    key: 5,
    label: "May",
  },
  {
    key: 6,
    label: "Jun",
  },
  {
    key: 7,
    label: "Jul",
  },
  {
    key: 8,
    label: "Aug",
  },
  {
    key: 9,
    label: "Sep",
  },
  {
    key: 10,
    label: "Oct",
  },
  {
    key: 11,
    label: "Nov",
  },
  {
    key: 12,
    label: "Dec",
  },
];

export const GENDERS = [
  {
    key: 1,
    label: "Male",
  },
  {
    key: 2,
    label: "Female",
  },
  {
    key: 3,
    label: "Complicated",
  },
];

export const MARITAL_STATUS = [
  {
    key: 1,
    label: "Yes",
  },
  {
    key: -1,
    label: "No",
  },
];

export const RELOCATING_WILLINGNESS = [
  ...MARITAL_STATUS,
  {
    key: 2,
    label: "Available",
  },
];

export const TYPE_MODAL = {
  academic_history: {
    edit: {
      type: 1,
      title: "Edit Education",
    },

    add: {
      type: 2,
      title: "Add Education",
    },
  },
  certificate_history: {
    edit: {
      type: 3,
      title: "Edit Certificate",
    },

    add: {
      type: 4,
      title: "Add Certificate",
    },
  },
  working_history: {
    edit: {
      type: 5,
      title: "Edit Working History",
    },

    add: {
      type: 6,
      title: "Add Working History",
    },
  },
};

export const BENEFITS = [
  {
    key: 1,
    label: "Over x month",
    name_radio: "over_thirteen",
    name_text: "over_thirteen_text",
  },
  {
    key: 2,
    label: "Lunch check",
    name_radio: "lunch_check",
    name_text: "lunch_check_text",
  },
  {
    key: 3,
    label: "Parking check",
    name_radio: "car_parking",
    name_text: "car_parking_text",
  },
  {
    key: 4,
    label: "Car allowance",
    name_radio: "car_allowance",
    name_text: "car_allowance_text",
  },
  {
    key: 5,
    label: "Phone allowance",
    name_radio: "phone",
    name_text: "phone_text",
  },
  {
    key: 6,
    label: "Laptop",
    name_radio: "laptop",
    name_text: "laptop_text",
  },
  {
    key: 7,
    label: "Share options",
    name_radio: "share_option",
    name_text: "share_option_text",
  },
  {
    key: 8,
    label: "Health cover",
    name_radio: "health_cover",
    name_text: "health_cover_text",
  },
];

export const KEYS_FIELDS_NOT_PUSH_PARAMS = [
  "day_of_birth",
  "month_of_birth",
  "year_of_birth",
  "notice_days",
  "salary_from",
  "salary_to",
  "car_allowance_text",
  "car_parking",
  "car_parking_text",
  "health_cover",
  "health_cover_text",
  "laptop",
  "laptop_text",
  "lunch_check",
  "lunch_check_text",
  "no_holiday",
  "over_thirteen",
  "over_thirteen_text",
  "overtime_hour",
  "pension_scheme",
  "phone",
  "phone_text",
  "share_option",
  "share_option_text",
  "working_hour",
];

export const URL_FILE = "https://lubrytics.com:8443/nadh-mediafile/file";

const TYPE_A = {
  key: 1,
  label: "Type A",
};
const TYPE_B = {
  key: 2,
  label: "Type B",
};
const TYPE_C = {
  key: 3,
  label: "Type C",
};
const TYPE_D = {
  key: 4,
  label: "Type D",
};
const TYPE_T = {
  key: 5,
  label: "Type T",
};
const TYPE_L = {
  key: 6,
  label: "Type L",
};

export const TYPE_CLIENT = [TYPE_A, TYPE_B, TYPE_C, TYPE_D, TYPE_T, TYPE_L];

export const STATUS_CLIENT = [
  {
    key: 9,
    label: "Active",
    color: "green",
  },
  {
    key: 11,
    label: "Off-limit",
    color: "geekblue",
  },
  {
    key: 10,
    label: "Blacklist",
    color: "magenta",
  },
  {
    key: 12,
    label: "Inactive",
    color: "red",
  },
];

export const ACCOUNT_STATUS = [
  {
    key: 1,
    label: "Create Client",
    color: "geekblue",
  },
  {
    key: 2,
    label: "Tele Marketing",
    color: "green",
  },
  {
    key: 3,
    label: "Client Meeting",
    color: "magenta",
  },
  {
    key: 4,
    label: "Proposal Sent",
    color: "cyan",
  },
  {
    key: 5,
    label: "Follow Up",
    color: "orange",
  },
  {
    key: 6,
    label: "Sign Contract",
    color: "purple",
  },
  {
    key: 7,
    label: "Job Order Received",
    color: "blue",
  },
];

export const CPA = [
  {
    key: 1,
    label: "Retained Plus",
    color: "green",
  },
  {
    key: 2,
    label: "Retained Minus",
    color: "magenta",
  },
  {
    key: 3,
    label: "New",
    color: "blue",
  },
  {
    key: 4,
    label: "Prospecting",
    color: "orange",
  },
  {
    key: 5,
    label: "Lost",
    color: "purple",
  },
];
