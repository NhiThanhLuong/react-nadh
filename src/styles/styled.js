import styled from "styled-components";
import { Form } from "antd";
import { FaMinusCircle } from "react-icons/fa";

export const Item = styled(Form.Item)`
  font-weight: 500;
`;

export const AddSelect = styled.div`
  padding: 4px 8px;
  cursor: pointer;
`;

export const FaMinusCircleRemove = styled(FaMinusCircle)`
  cursor: pointer;
  color: red;
`;
