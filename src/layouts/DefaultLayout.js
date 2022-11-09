import { Layout } from "antd";
import classNames from "classnames";
import moment from "moment";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import DefaultHeader from "layouts/DefaultHeader";
import DefaultNavigate from "layouts/DefaultNavigate";
import useWindowSize from "hooks/useWindowSize";
import { Container, Loading } from "shared_components";

const { Header, Content, Footer } = Layout;

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

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className={classNames("default-layout", {
        "default-layout-uncollapsed": !collapsed,
      })}
    >
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 20,
            padding: 0,
            height: "60px",
            backgroundImage:
              "linear-gradient(98deg, rgb(66, 134, 244), rgb(0, 206, 127) 60%)",
          }}
        >
          <DefaultHeader />
        </Header>
        <DefaultNavigate />
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
