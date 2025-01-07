import axios from "axios";
import { useEffect, useState } from "react"
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import { Subject } from "./Subject";
import './SubjectList.css'


export const SubjectList = (props) => {
  const dialogId = props.dialogId;
  let subjectsFetched = false;
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.dialogs + `/${dialogId}/subjects`, { headers: defaultHeaders });
      setSubjects(response.data);
      subjectsFetched = true;
    } catch(e) {
      console.log(e)
    }
  }

  const removeHandler = (id) => {
    setSubjects(subjects.filter(subject => subject.id === id))
  }

  useEffect(() => {
    if (!subjectsFetched) {
      fetchSubjects()
    }
  }, [])

  return (
    <>
      <div className="row d-flex">
        <div className="col-sm-3 ml-5 h5">Dialog topics</div>
      </div>
      <ul className="subjects-list">
        { subjects && [...subjects].map(subject => (
          <Subject subject={subject} removeHandler={removeHandler} />
        )) }
      </ul>
    </>
  )
}
