import React from "react";

const Container = ({ children, style = {}, ...props }) => {
  return (
    <div {...props} style={{ padding: "0 16px", ...style }}>
      {children}
    </div>
  );
};

export default Container;
