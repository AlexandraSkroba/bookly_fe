import axios from "axios";
import { useEffect, useState } from "react";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import './NewExchangeForm.css';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormErrors } from "../../components/FormErrors/FormErrors";

export const NewExchangeForm = (props) => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const bookId = searchParams.get('bookId');
  const  navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState([]);

  const fetchBook = async (e) => {
    if (bookId) {
      try {
        const response = await axios.get(API_ENDPOINTS.getBooks + `/${bookId}`, { headers: defaultHeaders });
        setBook(response.data.book);
      } catch(e) {
        setErrors(e.classNameresponse.data.message);
      }
    }
  }

  const handleSubmitEvent = async (e) => {
    e.preventDefault()
    try {
      const data = {
        details,
        bookId
      }
      const response = await axios.post(API_ENDPOINTS.exchanges, data, { headers: defaultHeaders });
      navigate('/books')
    } catch(e) {
      setErrors(e.response.data.message)
    }
  }

  const historyBack = () => {
    window.history.back()
  }

  const handleDetailsChange = (e) => {
    setDetails(e.target.value)
  }
  
  useEffect(() => {
    if (!book) {
      fetchBook();
    }
  }, [bookId])

  return (
    <>
      { book && (
          <>
            <FormErrors errors={errors} />
            <div className="exchange-form__wrapper align-self-center">
              <div></div>
              <div></div>
              <div className="form-group text-center">
                <Link to={`/books/${bookId}/edit`} className="btn btn-warning text-primary font-weight-bold">{`${book.author} - ${book.title}`}</Link>
              </div>
              
              <div className="form-group">
                <div data-mdb-input-init className="form-outline w-75">
                  <textarea className="form-control ml-2" id="details" rows="3" placeholder="Slurpy-durpy  ;- )" style={{marginLeft: '20%'}} onChange={handleDetailsChange}></textarea>
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-sm-12">
                <button type="submit" onClick={handleSubmitEvent} className="btn btn-success w-50">Submit</button>
              </div>
            </div>
            <div className="row mt-2 text-center">
              <div className="col-sm-12">
                <button onClick={historyBack} className="btn btn-secondary w-25">Nah, nevermind</button>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}
