import { Typography } from "antd";
import { CancelSave, FormCkeditor } from "components";
import { useState } from "react";
import styled from "styled-components";

const CancelSaveCkeditor = ({ name, title, data, form, callBack }) => {
  const [isEdit, setIsEdit] = useState(false);

  const onCancel = () => {
    setIsEdit(false);
    form.resetFields([name]);
  };

  const onSave = () => {
    callBack(name, form.getFieldValue(name));
    setIsEdit(false);
  };

  return (
    <StyledDiv isShow={isEdit}>
      {title ? <Typography.Text strong>{title}</Typography.Text> : null}
      <FormCkeditor name={name} data={data} onFocus={() => setIsEdit(true)} />
      {isEdit && <CancelSave onCancel={onCancel} onSave={onSave} />}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .ck.ck-editor__top.ck-reset_all {
    display: ${props => (props.isShow ? "block" : "none")};
  }
`;

export default CancelSaveCkeditor;
