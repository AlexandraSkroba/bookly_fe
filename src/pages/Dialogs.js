import { useEffect, useState } from "react";
import { DialogListElement } from "../components/Dialogs/DialogListElement";
import API_ENDPOINTS, { defaultHeaders } from "../apiConfig";
import axios from "axios";
import "./Dialogs.css";

export const Dialogs = (props) => {
  let dialogsFetched = false;
  const [dialogs, setDialogs] = useState([]);

  const fetchDialogs = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.dialogs, { headers: defaultHeaders })
      dialogsFetched = true
      setDialogs(response.data);
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (!dialogsFetched) {
      fetchDialogs()
    }
  }, [])

  return (
    <>
      <div className="dialogs__wrapper">
        <ul>
          { dialogs.map((dialog, _index) => ( <DialogListElement dialog={dialog} /> ) ) }
        </ul>
      </div>
    </>
  )
}
