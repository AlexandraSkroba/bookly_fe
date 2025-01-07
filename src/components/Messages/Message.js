import { Link } from "react-router-dom";


export const Message = (props) => {
  const { message } = props;
  const isOwner = message.author.id === JSON.parse(localStorage.getItem('currentUser')).id

  return (
    <div className="row w-75 d-flex flex-column">
      { isOwner ? (
          <>
            <div className="col-sm-3 text-secondary">You</div>
          </>
        ) : (
          <>
            <div className="col-sm-3 text-success"><Link to={`/users/${message.author.id}`} className="text-success">{ message.author.username }</Link></div>
          </>
        )
      }
      <div className="col-sm-3">{message.text}</div>
    </div>
  )
}
