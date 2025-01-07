import { Link, useNavigate, useParams } from "react-router-dom";
import { FormErrors } from "../../components/FormErrors/FormErrors"
import { useEffect, useState } from "react";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import axios from "axios";
import "./EditExchangeForm.css"


export const EditExchangeForm = () => {
  const [errors, setErrors] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const navigate = useNavigate();
  const exchangeId = useParams().id;
  const [exchange, setExchange] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState(false);
  let exchangeRetrieved = false;

  const fetchRatings = async (exchangeId) => {
    try {
      const response = await axios.get(API_ENDPOINTS.ratings + `/exchange/${exchangeId}`, { headers: defaultHeaders });
      setRatings(response.data);
      let isRated = !!(response.data.filter(rating => parseInt(rating.owner.id) === parseInt(currentUser.id))[0])
      setRated(isRated);
    } catch(e) {
      console.log(e)
      setErrors(e.response.data.message);
    }
  }

  const fetchExchange = async (id) => {
    try {
      const response = await axios.get(API_ENDPOINTS.exchanges + `/${exchangeId}`, { headers: defaultHeaders });
      setExchange(response.data);
      if (currentUser.id !== response.data.from.id && currentUser.id !== response.data.to.id) {
        navigate('/unauthorized')
      }
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  const update = async (e, state) => {
    e.preventDefault()

    try {
      const data = { state };
      const response = await axios.patch(API_ENDPOINTS.exchanges + `/${exchangeId}/update-state`, data, { headers: defaultHeaders });
      window.location.reload();
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  const approve = (e) => {
    update(e, 'approved');
  }

  const complete = (e) => {
    update(e, 'completed')
  }

  const decline = (e) => {
    update(e, 'declined');
  }


  const rate = () => {
    navigate(`/ratings/new?entity=exchange&entityId=${exchangeId}`)
  }

  const deleteRating = async (e) => {
    if (window.confirm('Are you sure?')) {
      const id = e.target.dataset.id;
      try {
        await axios.delete(API_ENDPOINTS.ratings + `/${id}`,  {headers: defaultHeaders});
        window.location.reload();
      } catch(e) {
        setErrors(e.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (!exchange && !exchangeRetrieved) {
      fetchExchange(exchangeId);
      fetchRatings(exchangeId);
      exchangeRetrieved = true
    }
  }, [exchangeId]);

  if (exchange) {
    return (
      <>
        <FormErrors errors={errors} />
        <form>
          <div className="row">
            <div className="col-sm-5">
              <div className="form-group">
                <label htmlFor="book" className="col-form-label form-group">Book</label>
                <input type="text" disabled="disabled" id="book" value={`${exchange.book.author} - ${exchange.book.title}`} className="form-control" />
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="owner" className="col-form-label form-group">From</label>
                <Link to={`/users/${exchange.from.id}`} className="btn btn-info">{exchange.from.username}</Link>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="owner" className="col-form-label form-group">To</label>
                <Link to="/profile" className="btn btn-secondary">{exchange.to.username}</Link>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label htmlFor="book" className="col-form-label form-group">State</label>
                <div>{exchange.state}</div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            { currentUser.id === exchange.from.id ? (
                <>
                  { exchange.state === 'preparation' && (
                      <>
                        <div className="col-sm-1">
                          <div className="btn btn-warning" onClick={approve}>Approve</div>
                        </div>
                        <div className="col-sm-1">
                          <div className="btn btn-danger" onClick={decline}>Decline</div>
                        </div>
                      </>
                    ) 
                  }
                </>
              ) : (
                <>
                  { exchange.state === 'approved' && (
                      <>
                        <div className="col-sm-1">
                          <div className="btn btn-success" onClick={complete}>Complete</div>
                        </div>
                      </>
                    )
                  }
                  { (exchange.state === 'completed' && !rated) && (
                    <>
                      <div className="col-sm-1">
                        <div className="btn btn-info" onClick={rate}>Rate</div>
                      </div>
                    </>
                  )}
                </>
              ) }
          </div>
        </form>
        <hr />
        <div className="row">
          <ul style={{ listStyleType: 'none' }}>
            { ratings.map(rating => (
              <>
                <li style={{ borderBottom: '1px solid #6c757d'}} >
                  <div className="row d-flex flex-column">
                    <div className="col-sm-3">
                      User: <Link to={`/users/${rating.owner.id}`} className="text-secondary">{ rating.owner.username }</Link>  Rate: { rating.rate }
                    </div>
                    <div className="col-sm-6">
                      { rating.text }
                    </div>
                    { rating.owner.id === currentUser.id && (
                        <>
                          <div className="col-sm-6 d-inline-flex">
                            <div style={{ marginRight: '1em'}}><Link to={`/ratings/${rating.id}/edit`} className="text-secondary own-comment">Edit</Link></div>
                            <div className="text-secondary own-comment" data-id={rating.id} onClick={deleteRating}>Delete</div>
                          </div>
                        </>
                      )
                    }
                  </div>
                </li>
              </>
            )) }
          </ul>
        </div>
      </>
    )
  } else {
    return (
      <FormErrors errors={errors} />
    )
  }
}
