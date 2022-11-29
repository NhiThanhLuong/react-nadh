import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Avatar, Card, Comment } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { postCommentSlice } from "features/clientSlice";
import { imgPath } from "ultis/const";
import ClientDesCkeditor from "./client-description/client-des-ckeditor";

const ClientComments = ({ data, form, id }) => {
  const dispatch = useDispatch();

  const callBack = (name, value) => {
    const params = {
      content: value,
      source_uuid: id,
    };
    form.resetFields([name]);

    dispatch(postCommentSlice(params));
  };
  return (
    <Card className="mb-1">
      <Title>Notes</Title>
      <ClientDesCkeditor name="comment" form={form} callBack={callBack} />

      {data.map(comment => (
        <StyledComment
          key={comment.id}
          author={comment.user?.full_name}
          avatar={
            <Avatar src={imgPath(comment?.user?.mediafiles?.avatar)} alt="" />
          }
          datetime={moment(comment?.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
          content={
            <CKEditor
              editor={ClassicEditor}
              data={comment.content}
              config={{
                toolbar: [],
              }}
              disabled
            />
          }
        />
      ))}
    </Card>
  );
};

const StyledComment = styled(Comment)`
  .ck.ck-editor__top.ck-reset_all {
    display: none;
  }

  .ck-blurred.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-read-only {
    border: none;
  }

  .ck.ck-editor__editable_inline {
    & > :first-child {
      margin-top: 0;
    }
    & > :last-child {
      margin-bottom: 0;
    }
  }

  .ant-comment-content-author-name {
    text-transform: capitalize;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 600;
    font-size: 14px;
  }

  .ant-comment-content-author-time {
    color: rgba(0, 0, 0, 0.65);
  }
`;

const Title = styled.p`
  color: #465f7b;
  font-size: 16px;
  font-weight: 500;
`;

export default ClientComments;
