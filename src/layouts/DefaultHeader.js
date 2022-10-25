import { Col, Dropdown, Menu, Row, Space } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, EllipsisMiddle } from "shared_components";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "features/authSlice";

const DefaultHeader = () => {
  const { info } = useSelector(state => state.auth);

  return (
    <Container>
      <Row align="center" gutter={[0]} justify="space-between" wrap={false}>
        <Col flex={1}></Col>
        <Col flex={1}>
          <Row gutter={[32]} align="center" justify="end">
            {info && (
              <Col>
                <UserInfoDropdown info={info} />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const UserInfoDropdown = ({ info }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    // call logout API -> dispatch clear auth
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to={`/user/${info?.id}`}>Xem thông tin cá nhân</Link>,
        },
        {
          key: "2",
          label: (
            <div onClick={onLogout} aria-hidden="true">
              Đăng xuất
            </div>
          ),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  const getEllisisStart = text => {
    let splitText = text.trim().split(" ");
    let splitTextLength = splitText.length;
    return splitTextLength > 3
      ? splitText[splitTextLength - 1].length +
          splitText[splitTextLength - 2].length +
          2
      : text.length;
  };

  return (
    <Dropdown overlay={menu}>
      <Space
        style={{
          justifyContent: "flex-end",
        }}
        wrap={false}
      >
        {info?.name && (
          <EllipsisMiddle
            style={{ width: "100%", minWidth: "100px", maxWidth: "140px" }}
            suffixCount={getEllisisStart(info.name)}
          >
            {info.name ?? ""}
          </EllipsisMiddle>
        )}

        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default DefaultHeader;
