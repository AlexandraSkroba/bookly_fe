import { Component } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import axios from "axios";
import API_ENDPOINTS from "../../apiConfig";
DataTable.use(DT);


export class BooksList extends Component {
  constructor(props) {
    super(props);
    this.books = props.books;
    this.isOwner = props.isOwner;

    this.state = {
      books: []
    }

    this.columns = [
      { name: 'Title', data: 'title', sortable: true, searching: true },
      { name: 'Author', data: 'author', sortable: true },
      { name: 'Genre', data: 'genre', sortable: true },
      { name: 'Language', data: 'language', sortable: true },
      { name: 'Condition', data: 'condition', sortable: true },
      { name: 'Status', data: 'exchangeState', sortable: true },
      { name: 'action', data: 'id'}
    ];
  }
  
  async componentDidMount() {
    if (!this.isOwner) {
      try {
        const response = await axios.get(API_ENDPOINTS.getBooks, {headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
        this.setState({books: response.data.books});
      } catch(e) {
        console.log(e)
      }
    }
  }

  render() {
    const { books } = this.state;
    const isOwner = this.isOwner;
    
    return (
      <>
        <DataTable className="table-responsive"
          data={ this.isOwner ? this.books : books }
          columns={ this.columns }
          options={{ responsive: true, sortable: true, searching: true }}
          slots={{
            action: (data, _row) => { return (
              <>
                <div className="d-flex flex-row justify-content-between">
                { isOwner ? (
                          <>
                            <a href={`/books/${data}/edit`} className="btn btn-primary">Edit</a>
                            <input type="button" className="btn btn-danger ml-2" value="Delete" />)
                          </>) : (
                            <>
                              <a href={`/books/${data}/edit`} className="btn btn-secondary">View</a>
                            </>
                          )}
                </div>
              </>
            )}
          }}
          pagination >
          <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Language</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
          </thead>
        </DataTable>
      </>
    )
  }
}
