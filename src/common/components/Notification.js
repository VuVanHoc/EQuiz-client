import { notification, message } from "antd";

export const NotificationSuccess = (
  title,
  message,
  duration,
  placement = "topRight"
) => {
  notification.success({
    message: title,
    description: message,
    placement: placement,
    duration,
  });
};

export const NotificationError = (
  title,
  message,
  duration,
  placement = "topRight"
) => {
  notification.error({
    message: title,
    description: message,
    placement: placement,
    duration,
  });
};
