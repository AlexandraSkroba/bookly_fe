import { Component } from "react";
import API_ENDPOINTS from "../../apiConfig";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import axios from "axios";
DataTable.use(DT);


export class ExchangesList extends Component {
  constructor(props) {
    super(props);
    this.isOnwer = props.isOnwer;
    this.state = {
      exchanges: []
    }

    this.columns = [
      { name: 'book', data: 'book', sortable: true },
      { name: 'from', data: 'from' },
      { name: 'to', data: 'to'},
      { name: 'action', data: 'id' }
    ]
  }

  async componentDidMount() {
    try {
      const response = await axios.get(API_ENDPOINTS.getExchanges, {headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
      this.setState({exchanges: response.data })
    } catch(e) {
      console.log(e.response)
    }
  }

  render() {
    const { exchanges } = this.state;
    return (
      <>
        <DataTable className="table-responsive"
          data={exchanges}
          columns={this.columns}
          options={{ responsive: true, sortable: true, searching: false, }}
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
            action: (data, _row) => (
              <a href={`/exchanges/${data}/edit`} className="btn btn-primary">Edit</a>
            )
          }}
        >
          <thead>
            <tr>
              <th className="text-center">Book</th>
              <th className="text-center">From</th>
              <th className="text-center">To</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
        </DataTable>
      </>
    )
  }
}
