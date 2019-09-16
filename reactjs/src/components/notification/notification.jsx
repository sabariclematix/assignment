import React from "react";
import PropTypes from "prop-types";
import notificationConstants from "../../constants/notification.constants";
import { connect } from "react-redux";
import "./style.css";

function Notification(props) {
  const { action, message } = props;
  let messageClassName = "";
  if (action === "success") {
    messageClassName = "success";
  } else if (action === "danger") {
    messageClassName = "danger";
  }
  return (
    <div className={messageClassName}>
      {message}
      <button
        className="notification_close"
        onClick={() => {
          props.dispatch({ type: notificationConstants.CLEAR });
        }}
      >
        X
      </button>
    </div>
  );
}
Notification.propTypes = {
  action: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
function mapStateToProps(state) {
  const { notification } = state;
  return {
    notification
  };
}

const connectedNotification = connect(mapStateToProps)(Notification);

export default connectedNotification;
