import { useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import "./Notification.css";
import { useLocation } from "react-router-dom";

export const Notification = (props) => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  const {notificationId, text, dismissHandler} = props;

  const dismissNotification = async (e, notificationId = null) => {
    if (!notificationId) {
      notificationId = e.target.dataset.id
    }
    try {
      const response = await axios.delete(API_ENDPOINTS.dismissNotification.replace(':id', notificationId), { headers: defaultHeaders })
      dismissHandler(props.notificationId)
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
      dismissNotification(null, props.notificationId);
    }, 5000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  if (!show) {
    return null;
  }

  if (location.pathname.includes('dialogs') && text.includes('message')) {
    dismissNotification(null, notificationId);
    return null;
  }

  return (
    <li className="btn alert-info border-secondary h4 d-flex justify-content-between align-items-center notification">
      <span style={{color: 'rgb(147 28 128)', fontWeight: 'bold', fontFamily: 'monospace'}} dangerouslySetInnerHTML={{ __html: text }}></span>
      <span aria-hidden="true" className="ml-2" data-id={notificationId} onClick={dismissNotification}>&times;</span>
    </li>
  )
}
