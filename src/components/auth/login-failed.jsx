// import PropTypes from 'prop-types'
import { notification } from "antd";

const LoginFailed = ({ err }) => {
  return (
    <div>
      {notification.error({
        message: "Login Failed",
        description: err,
      })}
    </div>
    // <Modal
    //   title="Login Failed"
    //   open={!!err}
    //   onOk={onCancel}
    //   onCancel={onCancel}
    // >
    //   <span>{err}</span>
    // </Modal>
  );
};

LoginFailed.propTypes = {};

export default LoginFailed;
