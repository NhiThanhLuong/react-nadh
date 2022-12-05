import { Card } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Comments } from "components";
import { postCommentSlice } from "features/clientSlice";

const ClientComments = ({ data, form, id }) => {
  const dispatch = useDispatch();

  const callBack = (name, value) => {
    const params = {
      content: value,
      source: { module: "client", section: "detail" },
      source_uuid: id,
    };
    form.resetFields([name]);

    dispatch(postCommentSlice(params));
  };
  return (
    <Card className="mb-1">
      <Title>Notes</Title>
      <Comments data={data} form={form} callBack={callBack} />
    </Card>
  );
};

const Title = styled.p`
  color: #465f7b;
  font-size: 16px;
  font-weight: 500;
`;

export default ClientComments;
