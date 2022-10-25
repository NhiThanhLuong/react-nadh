import React from "react";
import { Spin } from "antd";

function Loading() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Spin />
    </div>
  );
}

export default Loading;
