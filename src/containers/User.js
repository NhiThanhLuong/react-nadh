import { Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const User = () => {
  return (
    <div>
      <p>User</p>
      <Space direction="vertical">
        <Link to="/dashboard">Go to dashboard page</Link>
        <Link to="/user/1">Detail</Link>
        <Link to="/user/add">+ add user</Link>
      </Space>
    </div>
  );
};

export default User;
