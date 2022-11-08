/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Row,
  Space,
  notification,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginFailed } from "components";
import { getLocalStorage } from "utils";
import { storage, _LAYOUT } from "_constants";
import { postLogin, cancelLoginFailed } from "features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading } = useSelector(state => state.auth);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { email, password, is_save } = sessionStorage?.saved
    ? JSON.parse(sessionStorage.saved)
    : {};

  const onCancelLoginFailed = () => dispatch(cancelLoginFailed());

  useEffect(() => {
    // if (token || getLocalStorage(storage.ACCESS_TOKEN)) {
    if (token && !loading) {
      navigate("/candidates", { replace: true });
    }
    // setLoading(false);
  }, [token, navigate]);

  // useEffect(() => {
  //   dispatch(postLogin({
  //     username: 'admin',
  //     password: 'ABCde123@'
  //   }))
  // }, [])

  const onFinish = values => {
    setIsSubmiting(true);

    let isError = false;
    if (!values.email || !values.password) {
      message.error("Email và mật khẩu không được để trống");
      isError = true;
    }
    if (values.password && values.password.length < 6) {
      message.error("Mật khẩu phải 6 kí tự trở lên");
      isError = true;
    }
    if (values.is_save) {
      sessionStorage.setItem("saved", JSON.stringify(values));
    }

    if (isError) {
      setIsSubmiting(false);
      return;
    }

    values.email = values.email.trim();
    values.password = values.password.trim();

    dispatch(
      postLogin({
        username: values.email,
        password: values.password,
      })
    );

    //Call authenticate API -> dispatch auth info to redux store + set localstorage -> navigate
    // let info = { id: 1, name: "Trần Nguyễn Quỳnh Thi" };
    // dispatch(login({ token: "123", info }));
    setIsSubmiting(false);
    // localStorage.setItem(storage.ACCESS_TOKEN, "123");
    // localStorage.setItem("info", info);
    navigate("/candidates", { replace: true });
  };

  return (
    <div
      className="min-vh-100 container-fluid bg-light login-page"
      style={{
        backgroundImage: `url('/login_background.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        backgroundColor: "#95de64",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className="row flex-column align-items-center"
        style={{
          width: "min(100%, 500px)",
          borderRadius: "4px",
        }}
      >
        <Form
          disabled={loading || isSubmiting}
          onFinish={onFinish}
          className="login-form my-auto px-4 py-5"
          initialValues={{ email, password, is_save }}
        >
          <div
            className="logo"
            style={{
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            <Space size={10} direction="vertical">
              <div>
                <img
                  src={_LAYOUT.logo}
                  alt="Brand logo"
                  style={{
                    width: "200px",
                    height: "110px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                <div>Sign in to your account</div>
              </div>
            </Space>
          </div>

          <Form.Item
            name="email"
            rules={[{ required: false, message: "Không được để trống" }]}
          >
            <Input placeholder="Email" className="input-login" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: false, message: "Không được để trống" },
              // { min: 6, message: "Mật khẩu phải 6 kí tự trở lên" }
            ]}
          >
            <Input.Password placeholder="Mật khẩu" className="input-login" />
          </Form.Item>
          <Row direction="row" justify="space-between" align="center">
            <Form.Item name="is_save" valuePropName="checked">
              <Checkbox>Lưu thông tin đăng nhập lần sau</Checkbox>
            </Form.Item>
            <Button
              loading={isSubmiting}
              htmlType="submit"
              className="w-100 input-login"
              type="primary"
            >
              Đăng nhập
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
