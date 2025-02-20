import axios from "axios";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import API_ENDPOINTS, { API_URL, defaultHeaders } from "../../apiConfig";
import { Notification } from './Notification'


export const Notifications = () => {
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  let notificationsFetched = false;

  const socket = io(API_URL);

  const fetchUser = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.currentUser, { headers: defaultHeaders })
      setUserId(response.data.id);
    } catch(e) {
      console.log(e)
    }
  }

  const fetchNotifications = async () => {
    console.log('Fetching notifications', defaultHeaders)
    try {
      const response = await axios.get(API_ENDPOINTS.getNotifications, { headers: defaultHeaders });
      setNotifications(response.data);
      notificationsFetched = true;
    } catch(e) {
      console.log(e)
    }
  }

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter(item => item.id !== id))
  }

  useEffect(() => {
    userId ? socket.emit('register', parseInt(userId)) : fetchUser();
    
    if (!notificationsFetched) {
      fetchNotifications();
    }

    socket.on('notification', (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.off('notification');
    }
  }, [userId])
  return (
    <div className="row">
      <ul className="col-sm-12 d-flex flex-column">
        {[...notifications].map((notification) => (
          <Notification notificationId={notification.id} text={notification.text} dismissHandler={dismissNotification} />
        ))}
      </ul>
    </div>
  )
}
