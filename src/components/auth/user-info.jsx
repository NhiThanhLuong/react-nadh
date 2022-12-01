// import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Dropdown, Button, Menu } from "antd";
import { FaUser, FaLock } from "react-icons/fa";

import { imgPath } from "ultis/const";
import { logout } from "features/authSlice";
import { useEffect } from "react";
import { storage } from "_constants";

const UserInfo = ({ info }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem(storage.token);

  const { full_name, user_name, role, avatar } = info || {};

  const onLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token]);

  const menu = (
    <Menu
      items={[
        {
          label: "User Information",
          key: 1,
          icon: <FaUser />,
        },
        {
          label: (
            <span onClick={onLogout} aria-hidden="true" role="presentation">
              Log Out
            </span>
          ),
          key: 2,
          icon: <FaLock />,
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button
        type="text"
        style={{
          height: "100%",
          padding: 0,
        }}
      >
        <Row align="middle" gutter={8}>
          <Col>
            <p>{full_name}</p>
            <p>
              {user_name} - {role?.name}
            </p>
          </Col>
          <Col>
            <img src={imgPath(avatar)} width={32} alt="" />
          </Col>
        </Row>
      </Button>
    </Dropdown>
  );
};
UserInfo.propTypes = {};

export default UserInfo;
