/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Modal, Row } from "antd";

import { hideModal } from "features/modalSlice";
import { fetchSchools } from "features/schoolSlice";
import { fetchMajors } from "features/majorSlice";
import {
  deleteHistory,
  fetchDetailCandidateNotLoading,
  PostCandidateHistory,
  putCandidateHistory,
} from "features/candidatesSlice";
import { TYPE_MODAL } from "ultis/const";
import { deleteKeyNull, formatDate, pad2 } from "ultis/func";
import { format } from "prettier";

const ModalForm = Component => {
  const Comp = ({ ...props }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [fieldsChanges, setFieldsChanges] = useState({});

    const isShowModal = useSelector(state => state.modal.isShowModal);
    const type_modal = useSelector(state => state.modal.type_modal);
    const title_modal = useSelector(state => state.modal.title_modal);

    const history = useSelector(state => state.candidates.history);
    const detailData = useSelector(state => state.candidates.detailData);

    const isEdit =
      type_modal === TYPE_MODAL.certificate_history.edit.type ||
      type_modal === TYPE_MODAL.academic_history.edit.type ||
      type_modal === TYPE_MODAL.working_history.edit.type;

    const type = () => {
      if (
        type_modal === TYPE_MODAL.academic_history.add.type ||
        type_modal === TYPE_MODAL.academic_history.edit.type
      )
        return 1;
      if (
        type_modal === TYPE_MODAL.certificate_history.add.type ||
        type_modal === TYPE_MODAL.certificate_history.edit.type
      )
        return 3;
      if (
        type_modal === TYPE_MODAL.working_history.add.type ||
        type_modal === TYPE_MODAL.working_history.edit.type
      )
        return 2;
    };

    const onCancel = () => {
      dispatch(hideModal());
    };

    const onDeleteHistory = () => {
      dispatch(deleteHistory(history.id));
      dispatch(hideModal());
    };

    let initValues = {};

    if (type() === 1) {
      initValues = {
        status: history?.status === 1,
        start_year: history?.start_time
          ? formatDate(history?.start_time).year
          : null,
        end_year: history?.end_time ? formatDate(history?.end_time).year : null,
        organization: history?.organization || null,
        title: history?.title || null,
        degree: history?.degree || null,
      };
    } else if (type() === 3) {
      initValues = {
        status: history?.status === 1,
        start_year: history?.start_time
          ? formatDate(history?.start_time).year
          : null,
        end_year: history?.end_time ? formatDate(history?.end_time).year : null,
        organization: history?.organization || null,
        title: history?.title || null,
      };
    } else if (type() === 2) {
      initValues = {
        start_month: history?.start_time
          ? +formatDate(history.start_time).month
          : null,
        start_year: history?.start_time
          ? formatDate(history.start_time).year
          : null,
        end_month: history?.end_time
          ? +formatDate(history.end_time).month
          : null,
        end_year: history?.end_time ? formatDate(history.end_time).year : null,
        //   status: history?.status === 1,
        //   start_year: history?.start_time
        //     ? formatDate(history?.start_time).year
        //     : null,
        //   end_year: history?.end_time ? formatDate(history?.end_time).year : null,
        //   organization: history?.organization || null,
        //   title: history?.title || null,
      };
    }

    useEffect(() => {
      if (isShowModal) {
        dispatch(fetchSchools());
        dispatch(fetchMajors());
        form.setFieldsValue(initValues);
      }
    }, [isShowModal]);

    const onSubmit = async () => {
      form.submit();
      if (isEdit) {
        // await dispatch(
        //   putCandidateHistory({
        //     id: history.id,
        //     params: {
        //       ...initValues,
        //       status: initValues.status ? 1 : -1,
        //       ...fieldsChanges,
        //     },
        //   })
        // );
        const params = {
          ...initValues,
          status: initValues.status ? 1 : -1,
          ...fieldsChanges,
          type: type(),
        };
        const { start_year, start_month, end_year, end_month } = params;
        params.start_time = `${start_year}-${pad2(start_month)}-00`;
        params.end_time = `${end_year}-${pad2(end_month)}-00`;
        // params.status = status ? 1 : -1;
        console.log(params);
      }
      //   else {
      //     await dispatch(
      //       PostCandidateHistory({
      //         ...deleteKeyNull(fieldsChanges),
      //         candidate_id: detailData.id,
      //         type: type(),
      //       })
      //     );
      //   }
      //   await dispatch(fetchDetailCandidateNotLoading(detailData.candidate_id));
      //   await setFieldsChanges(() => ({}));
      //   dispatch(hideModal());
    };

    return (
      <Modal
        open={isShowModal && props.open}
        destroyOnClose
        centered
        title={
          <Row justify="space-between" align="middle">
            <span>{title_modal}</span>
            {isEdit && (
              <Button danger type="primary" onClick={onDeleteHistory}>
                Delete
              </Button>
            )}
          </Row>
        }
        width={700}
        closable={false}
        onCancel={onCancel}
        onOk={onSubmit}
        okText={isEdit ? "Save" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Component fieldsChanges={fieldsChanges} {...props} />
        </Form>
      </Modal>
    );
  };
  return Comp;
};

export default ModalForm;
