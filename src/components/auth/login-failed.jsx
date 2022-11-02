// import PropTypes from 'prop-types'
import { Modal } from "antd";

const LoginFailed = ({ err, onCancel }) => {
  return (
    <Modal
      title="Login Failed"
      open={!!err}
      onOk={onCancel}
      onCancel={onCancel}
    >
      <span>{err}</span>
    </Modal>
  );
};

LoginFailed.propTypes = {};

export default LoginFailed;
