import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import API_ENDPOINTS, { API_URL, defaultHeaders } from "../apiConfig";
import axios from "axios";

const socket = io(API_URL);

export const NotificationsTest = () => {
  const userId = 38;
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (userId) {
    }

    socket.on('notification', (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.off('notification');
    }
  }, [userId])

  const sendTestNotification = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.notificationsTest, { headers: defaultHeaders });
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };

  return (
    <div>
      <div className="row text-center">
        <h1>Notifications Test</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-12 text-center">
          <ul>
            {notifications.map((notifications, index) => (
              <li className="btn d-block" key={index}>{notifications}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className="btn btn-success" onClick={sendTestNotification}>Test notification</button>
    </div>
  )
}
