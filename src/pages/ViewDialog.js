import { useEffect, useState } from "react";
import { Dialog } from "../components/Dialogs/Dialog"
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ENDPOINTS, { API_URL, defaultHeaders } from "../apiConfig";
import { io } from "socket.io-client";


export const ViewDialog = (props) => {
  const params = useParams();
  const socket = io(API_URL);
  const id = params.id;
  let messagesFetched = false;
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.messages + `?dialogId=${id}`, { headers: defaultHeaders });
      setMessages(response.data);
      messagesFetched = true;
    } catch(e) {
      console.log(e)
    }
  }

  
  useEffect(() => {
    if (!messagesFetched) {
      fetchMessages()
    }

    const userId = parseInt(JSON.parse(localStorage.getItem('currentUser')).id);
    socket.emit('connection', userId);

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message].filter((value, index, self) => {
        return self.findIndex(v => v.id === value.id ) === index;
      }));
    };

    socket.on('new.message', handleNewMessage);
  }, [])

  if (!messages) { return null }

  return (
    <>
      <Dialog id={id} messages={messages} />
    </>
  )
}
