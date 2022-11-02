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
};

export const imgPath = path =>
  `https://lubrytics.com:8443/nadh-mediafile/file/${path}`;
