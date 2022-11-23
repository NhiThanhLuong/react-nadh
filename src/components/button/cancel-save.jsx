import { Button, Row } from "antd";

const CancelSave = ({ onCancel, onSave, ...props }) => {
  return (
    <Row justify="end" {...props} style={{ marginTop: 8 }}>
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
