import { useEffect, useRef, useState } from "react";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import axios from "axios";
import { useParams } from "react-router-dom";


export const MessageInput = () => {
  const [text, setText] = useState('');
  const params = useParams();
  const [errors, setErrors] = useState([]);
  const divRef = useRef();

  const scrollToElement = () => {
    const {current} = divRef;
    if (current !== null){
      current.scrollIntoView({behavior: "smooth"})
    }
  }

  useEffect(scrollToElement, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  const createMessage = async (e) => {
    try {
      const data = {
        text,
        dialogId: parseInt(params.id)
      }
      const response = await axios.post(API_ENDPOINTS.messages, data, { headers: defaultHeaders });
      setText('');
      setErrors([]);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="message-input__wrapper" ref={divRef} id="show-content">
        <div className="row">
          <div className="col-sm-11">
            <input className="form-control" value={text} placeholder="Type message here" onChange={handleTextChange} />
          </div>
          <div className="col-sm-1">
            <button className="btn btn-success" onClick={createMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  )
}
