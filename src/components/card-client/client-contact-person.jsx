import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Row } from "antd";
import {
  ContactPerson,
  FormContactPerson,
  ModalClientContactPerson,
} from "components";
import { getPicItem } from "features/clientSlice";
import { showModal } from "features/modalSlice";
import { useDispatch } from "react-redux";
import { TYPE_MODAL } from "ultis/const";

const ClientContactPerson = ({ data, client_id }) => {
  const dispatch = useDispatch();

  const onEdit = id => {
    console.log(id);
    dispatch(getPicItem(id));
    dispatch(showModal(TYPE_MODAL.contact_person.edit));
  };

  return (
    <Card>
      <Row justify="space-between" className="mb-1">
        <h3 style={{ color: "#465f7b" }}>Contact Person</h3>
        <Button
          onClick={() => dispatch(showModal(TYPE_MODAL.contact_person.add))}
          type="primary"
          icon={<PlusOutlined />}
        >
          New Contact
        </Button>
      </Row>
      <ContactPerson data={data} onEdit={onEdit} />
      <ModalClientContactPerson>
        {isAdd => <FormContactPerson client_id={client_id} isAdd={isAdd} />}
      </ModalClientContactPerson>
    </Card>
  );
};

export default ClientContactPerson;
