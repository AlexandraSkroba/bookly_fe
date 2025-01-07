import { Link } from "react-router-dom"

export const Subject = ({ subject }) => {
  return (
    <>
      <li className="alert alert-info d-flex justify-content-between align-items-center">
        <Link to={`/exchanges/${subject.id}/edit`} className="text-success">{subject.book.title}</Link>
      </li>
    </>
  )
}
