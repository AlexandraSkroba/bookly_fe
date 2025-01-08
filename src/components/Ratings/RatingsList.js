import axios from "axios";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import { Link } from "react-router-dom";

export const RatingsList = (props) => {
  const ratings = props.ratings;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const deleteRating = async (e) => {
    if (window.confirm('Are you sure?')) {
      const id = e.target.dataset.id;
      try {
        await axios.delete(API_ENDPOINTS.ratings + `/${id}`,  {headers: defaultHeaders});
        window.location.reload();
      } catch(e) {
        console.log(e)
      }
    }
  }

  const complain = async(e) => {
    const id = e.target.dataset.id;

    try {
      const data = {
        ratingId: parseInt(id)
      }
      await axios.post(API_ENDPOINTS.complains, data, { headers: defaultHeaders });
      window.location.reload();
    } catch(e) {
      console.log(e.response)
    }
  }

  return (
    <>
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
                  { rating.owner.id === currentUser.id ? (
                      <>
                        <div className="col-sm-6 d-inline-flex">
                          <div style={{ marginRight: '1em'}}><Link to={`/ratings/${rating.id}/edit?entity=${rating.targetType}`} className="text-secondary own-comment">Edit</Link></div>
                          <div className="text-secondary own-comment" data-id={rating.id} onClick={deleteRating}>Delete</div>
                        </div>
                      </>
                    ) : (
                      <>
                        { !rating.complain && (
                            <>
                              <div className="col-sm-6 d-inline-flex" id={rating.id}>
                                <div className="text-secondary own-commnet" data-id={rating.id} style={{ cursor: 'pointer' }} onClick={complain}>Complain</div>
                              </div>
                            </>
                          )
                        }
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
}
