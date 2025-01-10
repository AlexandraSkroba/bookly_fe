import axios from "axios";
import DataTable from 'datatables.net-react';
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import { useEffect, useState } from "react";
import { FormErrors } from "../FormErrors/FormErrors";


export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const columns = [
    { name: 'Username', data: 'username' },
    { name: 'Email', data: 'email' },
    { name: 'action', data: null}
  ]

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.adminUsers, { headers: defaultHeaders });
      setUsers(response.data);
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  const unsuspend = async (id) => {
    try {
      await axios.post(API_ENDPOINTS.adminUnsuspend, {id}, { headers: defaultHeaders })
      window.location.reload()
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  const suspend = async (id) => {
    try {
      await axios.post(API_ENDPOINTS.adminSuspend, {id}, { headers: defaultHeaders })
      window.location.reload()
    } catch(e) {
      setErrors(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <FormErrors errors={errors} />
      <DataTable className="table-responsive"
      data={users}
      columns={columns}
      options={{ responsive: true, sortable: true, searching: true }}
      slots={{
        action: (_data, row) => {
          return (
            <>
              <div className="d-flex flex-row">
                { row.is_suspended ? (
                  <>
                    <div className="btn btn-secondary" onClick={() => unsuspend(row.id)}>Unsuspend</div>
                  </>
                ) : (
                  <>
                    <div className="btn btn-danger" onClick={() => suspend(row.id)}>Suspend</div>
                  </>
                ) }
              </div>
            </>
          )
        }
      }}
      pagination>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
      </DataTable>
    </>
  )
}
