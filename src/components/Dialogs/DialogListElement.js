import { Link } from "react-router-dom";


export const DialogListElement = (props) => {
  const { dialog } = props;   

  const dialogName = (dialog) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const names = dialog.users.filter(user => user.id !== currentUser.id ).map(user => user.username).join(', ');
    const subjects = dialog.subjects.map(exchange => exchange.book.title).join(', ');
    return `${names} - ${subjects}`;
  }

  return (
    <>
      <Link to={`/dialogs/${props.dialog.id}`}><li>{ dialogName(dialog) }</li></Link>
    </>
  )
}
