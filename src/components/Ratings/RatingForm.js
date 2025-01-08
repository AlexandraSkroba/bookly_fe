import { useEffect, useState } from "react";
import { FormErrors } from "../FormErrors/FormErrors";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import axios from "axios";
import { useParams } from "react-router-dom";


export const RatingForm = (props) => {
  const params = new URLSearchParams(window.location.search);
  const [ rating, setRating ] = useState(null);
  const [ text, setText ] = useState('');
  const [ rate, setRate ] = useState(1); 
  const [ errors, setErrors ] = useState([]);
  const urlParams = useParams();
  const id = urlParams.id;

  const fetchRating =  async () => {
    try { 
      const response = await axios.get(API_ENDPOINTS.ratings + `/${id}`, { headers: defaultHeaders });
      setRating(response.data);
      setRate(response.data.rate);
      setText(response.data.text);
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  const validateForm = () => {
    if (!text) {
      setErrors((prev) => [...prev, 'Text should not be empty'])
    }

    if (parseFloat(rate) < 1 || parseFloat(rate) > 5) {
      setErrors((prev) => [...prev, 'Rate must be betwee 1 and 5'])
    }
  }

  const handleSubmitEvent = async (e) => {
    e.preventDefault()

    validateForm()

    try {
      const data = {
        rate: parseInt(rate),
        text,
        targetType: props.targetType || params.get('entity') || 'exchange',
        targetId: parseInt(params.get('entityId')) || rating.targetId
      }
      console.log(data);
      if (props.isNew) {
        await axios.post(API_ENDPOINTS.ratings, data, { headers: defaultHeaders });
        window.history.back();
      } else {
        await axios.patch(API_ENDPOINTS.ratings + `/${id}`, data, { headers: defaultHeaders });
        window.location.reload();
      }
    } catch(err) {
      console.log(err);
      if (err.response) {
        setErrors(err.response.data.message);
      }
    }
  }

  const deleteRating = async () => {
    try {
      const response = await axios.delete(API_ENDPOINTS.ratings + `/${id}`, { headers: defaultHeaders })
      window.history.back()
    } catch(e) { 
      setErrors(e.response.data.message);
    }
  }

  const resetForm = (e) => {
    window.location.reload()
  }

  const handleRateChange = (e) => {
    setRate(e.target.value)
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
  }

  useEffect(() => {
    if (!props.isNew) {
      fetchRating();
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmitEvent}>
        <FormErrors errors={errors} />
        <div className="row">
          <div className="col-sm-3">
            <label htmlFor="rate" className="form-group">
              Rate (1 to 5)
            </label>
            <input className="form-control" id="rate" type="number" pattern="\d" value={rate} onChange={handleRateChange} required />
          </div>
          <div className="col-sm-3">
            <label htmlFor="text" className="form-group">
              Review
            </label>
            <input className="form-control" id="text" type="text" value={text} min="0" max="5" onChange={handleTextChange} required />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-sm-1">
            <button type="submit" className="btn btn-success">{ props.isNew ? ('Save') : ('Update') } </button>
          </div>
          <div className="col-sm-1">
            <button className="btn btn-secondary" onClick={resetForm}>Reset</button>
          </div>
          { !props.isNew && (
            <>
              <div className="col-sm-10 text-end">
                <button className="btn btn-danger" onClick={deleteRating}>Delete</button>
              </div>
            </>
          ) }
        </div>
      </form>
    </>
  )
}
