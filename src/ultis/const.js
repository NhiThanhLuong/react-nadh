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
  industry_years: ["industry_years_from", "industry_years_to"],
  management_years: ["management_years_from", "management_years_to"],
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
};
