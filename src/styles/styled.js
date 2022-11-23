import styled from "styled-components";
import { Form, Row } from "antd";
import { FaMinusCircle } from "react-icons/fa";

export const Item = styled(Form.Item)`
  font-weight: 500;
  margin: 0 !important;
`;

export const AddSelect = styled.div`
  padding: 4px 8px;
  cursor: pointer;
`;

export const FaMinusCircleRemove = styled(FaMinusCircle)`
  cursor: pointer;
  color: red;
`;

export const RowTitle = styled(Row)`
  position: sticky;
  top: 105px;
  left: 0px;
  z-index: 10;
  line-height: 3;
  font-size: 14px;
  background-color: rgb(244, 244, 244);
  a {
    color: rgba(0, 0, 0, 0.45);
    &:hover {
      color: rgb(24, 144, 255);
      transition: color 0.25 ease;
    }
  }
  span {
    text-transform: uppercase;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.65);
  }
`;
