import { Typography } from "antd";
import React from "react";

const EllipsisMiddle = ({
  suffixCount = 5,
  children,
  suffixLength = 20,
  style,
  ...rest
}) => {
  const start = children.slice(0, children.length - suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();
  let isSuffix = children.length > suffixLength;
  return (
    <Typography.Text
      style={{
        maxWidth: "100%",
        fontWeight: 500,
        ...style,
      }}
      ellipsis={
        isSuffix && {
          suffix,
        }
      }
      title={children}
      {...rest}
    >
      {isSuffix ? start : children}
    </Typography.Text>
  );
};

export default EllipsisMiddle;
