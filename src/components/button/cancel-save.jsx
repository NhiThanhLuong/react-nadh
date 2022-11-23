import { Button, Row } from "antd";

const CancelSave = ({ onCancel, onSave, ...props }) => {
  return (
    <Row justify="end" {...props}>
      <Button onClick={onCancel} style={{ marginRight: 16 }}>
        Cancel
      </Button>
      <Button type="primary" onClick={onSave}>
        Save
      </Button>
    </Row>
  );
};

export default CancelSave;
