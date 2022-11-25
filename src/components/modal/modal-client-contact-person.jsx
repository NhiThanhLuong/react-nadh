import { Button, Modal, Row } from "antd";
import { deletePicItem } from "features/clientSlice";
import { hideModal } from "features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { TYPE_MODAL } from "ultis/const";

const ModalClientContactPerson = ({ children }) => {
  const dispatch = useDispatch();

  const isShowModal = useSelector(state => state.modal.isShowModal);
  const type_modal = useSelector(state => state.modal.type_modal);
  const title_modal = useSelector(state => state.modal.title_modal);

  const pic_item = useSelector(state => state.client.pic_item);

  const isAdd = type_modal === TYPE_MODAL.contact_person.add.type;
  const isEdit = type_modal === TYPE_MODAL.contact_person.edit.type;

  const onDeleteItem = () => {
    dispatch(deletePicItem(pic_item.id));
    dispatch(hideModal());
  };

  return (
    <Modal
      open={isShowModal && (isAdd || isEdit)}
      destroyOnClose
      centered
      closable={false}
      width={700}
      title={
        <Row justify="space-between" align="middle">
          <span>{title_modal}</span>
          {isEdit && (
            <Button danger type="primary" onClick={onDeleteItem}>
              Remove
            </Button>
          )}
        </Row>
      }
      footer={
        <Row justify="end">
          <Button onClick={() => dispatch(hideModal())}>Cancel</Button>
          <Button
            form="contact_person"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            {isAdd && "Add"}
            {isEdit && "Save"}
          </Button>
        </Row>
      }
    >
      {children(isAdd)}
    </Modal>
  );
};

export default ModalClientContactPerson;
