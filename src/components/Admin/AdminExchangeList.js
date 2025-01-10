import { useEffect, useState } from "react";
import { FormErrors } from "../FormErrors/FormErrors";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import DataTable from "datatables.net-react";
import axios from "axios";


export const AdminExchangeList = () => {
  const [exchanges, setExchanges] = useState([]);
  const [errors, setErrors] = useState([]);
  const columns = [
    { name: 'book', data: 'book' },
    { name: 'from', data: 'from' },
    { name: 'to', data: 'to' },
    { name: 'state', data: null },
    { name: 'action', data: null},
  ]

  const fetchExchanges = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.adminExchanges, { headers: defaultHeaders })
      setExchanges(response.data);
    } catch(e) {
      setErrors(e.response.data.message)
    }
  }

  const destroyExchange = async (id) => {
    try {
      await axios.delete(API_ENDPOINTS.adminDeleteExchange.replace(':id', id), { headers: defaultHeaders });
      window.location.reload();
    } catch(e) {
      setErrors(e.response.data.message)
    }
  }

  useEffect(() => {
    fetchExchanges()
  }, [])

  return (
    <>
      <FormErrors errors={errors} />
      <DataTable className="table-responsive"
        data={exchanges}
        columns={columns}
        options={{ responsive: true, searching: true, sortable: true }}
        slots={{
          book: (data, _row) => (
            <a href={`/books/${data.id}/edit`}>{data.title}</a>
          ),
          from: (data, _row) => (
            <a href={`users/${data.id}/edit`}>{data.username}</a>
          ),
          to: (data, _row) => (
            <a href={`users/${data.id}/edit`}>{data.username}</a>
          ),
          state: (_data, row) => (
            <p>{row.state}</p>
          ),
          action: (_data, row) => (
            <div className="btn btn-danger" onClick={() => destroyExchange(row.id)}>Delete</div>
          )
        }}
        pagination
      >
        <thead>
          <tr>
            <th>Book</th>
            <th>From</th>
            <th>To</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}
