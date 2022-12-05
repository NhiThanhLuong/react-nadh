import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Avatar, Comment } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { imgPath } from "ultis/const";
import { CancelSaveCkeditor } from "components";

const Comments = ({ data, form, callBack }) => {
  return (
    <>
      <CancelSaveCkeditor name="comment" form={form} callBack={callBack} />

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
    </>
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

export default Comments;
