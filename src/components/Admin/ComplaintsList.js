import axios from "axios";
import { useEffect, useState } from "react"
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import DataTable from "datatables.net-react";
import { FormErrors } from "../FormErrors/FormErrors";


export const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [errors, setErrors] = useState([]);
  const columns = [
    { name: 'rate', data: 'rating.rate' },
    { name: 'text', data: 'rating.text' },
    { name: 'action', data: null }
  ]

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.adminComplaints, { headers: defaultHeaders })
      setComplaints(response.data);
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  const resolveComplaint = async (id) => {
    try {
      await axios.post(API_ENDPOINTS.adminResolveComplaint, {id}, { headers: defaultHeaders })
      window.location.reload()
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  return (
    <>
      <FormErrors errors={errors} />
      <DataTable className="table-responsive"
      data={complaints}
      columns={columns}
      options={{ responsive: true, sortable: true, searching: true }}
      slots={{
        action: (_data, row) => { return (
          <>
            <div className="row">
              <div className="col-sm-12">
                <div className="btn btn-danger" onClick={() => resolveComplaint(row.id)}>Delete comment</div>
              </div>
            </div>
          </>
        )}
      }}
      pagination
      >
        <thead>
          <tr>
            <th>Rate</th>
            <th>Text</th>
            <th>Action</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}
