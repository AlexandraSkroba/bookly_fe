import axios from "axios"
import DataTable from "datatables.net-react"
import { useEffect, useState } from "react"
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig"
import { FormErrors } from "../FormErrors/FormErrors"


export const AdminBookList = () => {
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState([]);
  const columns = [
    { name: 'title', data: 'title' },
    { name: 'author', data: 'author' },
    { name: 'owner', data: 'owner' },
    { name: 'exchange_state', data: 'exchangeState' },
    { name: 'action', data: null }
  ]

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.adminBooks, { headers: defaultHeaders })
      setBooks(response.data);
    } catch(e) {
      setErrors(e.response.data.message)
    }
  }

  const deleteBook = async (id) => {
    try {
      await axios.delete(API_ENDPOINTS.adminDeleteBook + `/${id}`, { headers: defaultHeaders })
      window.location.reload()
    } catch(e) {
      setErrors(e.response.data.message)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <>
      <FormErrors errors={errors} />
      <DataTable className="table-responsive"
      data={books}
      columns={columns}
      options={{ responsive: true, sortable: true, searching: true }}
      slots={{
        owner: (_data, row) => { 
          return (
            <>
              <div className="row">
                <div className="col-sm-3">
                  <a className="text-primary" href={`/users/${row.owner.id}`}>{ row.owner.username }</a>
                </div>
              </div>
            </>
          )
        },
        action: (_data, row) => {
          return (
            <>
              <div className="row">
                <div className="col-sm-3">
                  <div className="btn btn-danger" onClick={() => deleteBook(row.id)}>Delete</div>
                </div>
              </div>
            </>
          )
        } 
      }}
      pagination
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Owner</th>
            <th>Exchange Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}
