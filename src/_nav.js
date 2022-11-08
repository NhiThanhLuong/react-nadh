import { lazy } from "react";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
const Candidates = lazy(() => import("containers/Candidates"));
const DetailCandidate = lazy(() =>
  import("containers/candidate/detail-candidate")
);
const Clients = lazy(() => import("containers/Clients"));
const User = lazy(() => import("containers/User"));
const UserDetail = lazy(() => import("containers/UserDetail"));
const UserAdd = lazy(() => import("containers/UserAdd"));
const Job = lazy(() => import("containers/Job"));

const _nav = [
  {
    key: "/candidates",
    label: "Candidates",
    title: "Candidates",
    icon: <DashboardOutlined />,
    component: props => <Candidates {...props} />,
    action_key: "VIEW_CANDIDATES",
    display: 1,
    children: [
      {
        // disabled: true,
        key: "/candidate/:id",
        // label: "Danh sách nhân viên",
        // title: "Danh sách nhân viên",
        // icon: <UserOutlined />,
        component: props => <DetailCandidate {...props} />,
        // action_key: "VIEW_DETAIL_CANDIDATE",
        // display: 1,
      },
    ],
  },
  {
    key: "/clients",
    label: "Clients",
    title: "Clients",
    icon: <DashboardOutlined />,
    component: props => <Clients {...props} />,
    action_key: "VIEW_CLIENTS",
    display: 1,
    children: [
      {
        key: "/candidates/list12",
        label: "Danh sách nhân viên",
        title: "Danh sách nhân viên",
        // icon: <UserOutlined />,
        component: props => <User {...props} />,
        action_key: "VIEW_USER",
        // display: 1,
      },
    ],
  },
  {
    key: "/user",
    label: "Nhân viên",
    title: "Nhân viên",
    icon: <UserOutlined />,
    action_key: "VIEW_USER",
    display: 1,
    children: [
      {
        key: "/user/list",
        label: "Danh sách nhân viên",
        title: "Danh sách nhân viên",
        // icon: <UserOutlined />,
        component: props => <User {...props} />,
        action_key: "VIEW_USER",
        display: 1,
      },
      {
        key: "/user/job",
        label: "Công việc của tôi",
        title: "Công việc của tôi",
        // icon: <UserOutlined />,
        component: props => <Job {...props} />,
        action_key: "VIEW_USER_JOB",
        display: 1,
      },
      {
        key: "/user/add",
        label: "Thêm nhân viên",
        title: "Thêm nhân viên",
        // icon: <UserOutlined />,
        component: props => <UserAdd {...props} />,
        action_key: "VIEW_USER_ADD",
      },
      {
        key: "/user/:id",
        label: "Chi tiết nhân viên",
        title: "Chi tiết nhân viên",
        // icon: <UserOutlined />,
        component: props => <UserDetail {...props} />,
        action_key: "VIEW_USER_DETAIL",
      },
    ],
  },
];

export const getNavigation = ({
  navs = _.cloneDeep(_nav),
  isRoute = false,
} = {}) => {
  return navs.reduce((result, nav, index) => {
    let { children } = nav;
    let isDisplayForNav = !!nav.display; // display in left navigation
    if (isDisplayForNav || isRoute) result.push(nav);
    if (children?.length > 0) {
      let childNavs = getNavigation({ navs: children, isRoute }) ?? []; // recursive children
      if (isRoute) {
        if (!nav.component) result.splice(result.length - 1);
        result = [...result, ...childNavs];
      } else {
        if (childNavs.length > 0) result[index].children = [...childNavs];
        else delete result[index].children;
      }
    }
    return result;
  }, []);
};

export default _nav;
