import { Layout, Space } from "antd";
import classNames from "classnames";
import moment from "moment";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import DefaultHeader from "layouts/DefaultHeader";
import DefaultNavigate from "layouts/DefaultNavigate";
import useWindowSize from "hooks/useWindowSize";
import { _LAYOUT } from "_constants";
import { Container, Loading } from "shared_components";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

export default function DefaultLayout() {
  const [width] = useWindowSize();
  const [collapsed, setCollapsed] = useState(width < 1100 ? true : false);
  const year = moment().format("YYYY");
  const widthRef = useRef(width);

  useEffect(() => {
    if (widthRef.current) {
      widthRef.current = width;
      if (widthRef.current < 1100) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
  }, [width]);
  const toggle = e => {
    e.preventDefault();
    if (widthRef.current) {
      widthRef.current = null;
    }
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className={classNames("default-layout", {
        "default-layout-uncollapsed": !collapsed,
      })}
    >
      <Sider
        width={250}
        collapsed={collapsed}
        // onCollapse={toggle}
        className="default-layout-sider"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          zIndex: 10,
          left: 0,
          top: 0,
        }}
      >
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div
            className="logo layout-logo-wrapper"
            style={{
              height: "50px",
              width: "100%",
              padding: collapsed ? "8px 6px" : "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "6px",
              marginBottom: "10px",
            }}
          >
            <Link to="/dashboard">
              <Space
                align="center"
                justify="start"
                direction="row"
                style={{
                  height: "50px",
                  width: "100%",
                  //   display: "flex",
                  //   alignItems: "center",
                  //   gap: "10px",
                }}
              >
                <div>
                  <img
                    style={{
                      height: collapsed ? "30px" : "40px",
                      width: collapsed ? "30px" : "40px",
                      borderRadius: "6px",
                      transition: "all 300ms ease",
                    }}
                    className="img-fluid"
                    src={_LAYOUT.logo}
                    alt="Brand logo"
                  />
                </div>
                {!collapsed && (
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                    }}
                  >
                    <strong>{_LAYOUT.brand}</strong>
                  </div>
                )}
              </Space>
            </Link>

            <div
              onClick={toggle}
              aria-hidden="true"
              style={{ marginLeft: "auto" }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{ fontSize: "24px", color: "#fff" }}
                />
              ) : (
                <MenuFoldOutlined style={{ fontSize: "24px", color: "#fff" }} />
              )}
            </div>
          </div>
          <DefaultNavigate collapsed={collapsed} />
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <DefaultHeader />
        </Header>
        <Content>
          <Container
            style={{ paddingTop: "15px", paddingBottom: "15px" }}
            className={classNames("site-layout-content", {
              "site-layout-content-uncollapsed": !collapsed,
            })}
          >
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Container>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#dedede",
            padding: "13px 50px",
          }}
        >
          Copyright &copy; {year} Powered by Estuary Solutions
        </Footer>
      </Layout>
    </Layout>
  );
}
