import { notification } from "antd";

const notifiMsg = (type, msg, title) => {
  {
    notification[type]({
      message: title,
      description: msg,
    });
  }
};

export default notifiMsg;
