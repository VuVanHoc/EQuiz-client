import { notification, message } from "antd";

export const NotificationSuccess = (
  title,
  message,
  duration,
  placement = "topRight"
) => {
  notification.destroy();
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
  notification.destroy();
  notification.error({
    message: title,
    description: message,
    placement: placement,
    duration,
  });
};

export const NotificationWarning = (
  title,
  message,
  duration,
  placement = "topRight"
) => {
  notification.destroy();
  notification.warning({
    message: title,
    description: message,
    placement: placement,
    duration,
  });
};
