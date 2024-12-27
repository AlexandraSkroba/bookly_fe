import { Component } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import axios from "axios";
import API_ENDPOINTS from "../../apiConfig";
import { Link } from "react-router-dom";
import { FormErrors } from "../FormErrors/FormErrors";
DataTable.use(DT);


export class BooksList extends Component {
  constructor(props) {
    super(props);
    this.books = props.books;
    this.isOwner = props.isOwner;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.state = {
      books: [],
      errors: []
    }

    this.columns = [
      { name: 'Title', data: 'title', sortable: true, searching: true },
      { name: 'Author', data: 'author', sortable: true },
      { name: 'Genre', data: 'genre', sortable: true },
      { name: 'Language', data: 'language', sortable: true },
      { name: 'Condition', data: 'condition', sortable: true },
      { name: 'Status', data: 'exchangeState', sortable: true },
      { name: 'action', data: (this.isOwner || this.books ? null : 'owner') }
    ];
  }
  
  async componentDidMount() {
    if (!this.isOwner && !this.books) {
      try {
        const response = await axios.get(API_ENDPOINTS.getBooks, {headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}})
        this.setState({books: response.data.books});
      } catch(e) {
        console.log(e)
        this.setState({errors: e.response.data.message});
      }
    }
  }

  deleteBook = async (e) => {
    const id = e.target.dataset.id;
    if (window.confirm('Are you sure')) {
      try {
        const response = await axios.delete(`${API_ENDPOINTS.getBooks}/${id}`, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('accessToken') } })
        window.location.reload()
      } catch(e) {
        this.setState({ errors: e.response.data.message })
      }
    }
  }

  render() {
    const { books, errors } = this.state;
    const currentUser = this.currentUser;

    return (
      <>
        <div className="row d-flex">
          <div className="col-sm-1">
            <Link to="/books/new" className="btn btn-success h4">New</Link>
          </div>
        </div>
        <FormErrors errors={errors}/>
        <DataTable className="table-responsive"
          data={ this.books || this.isOwner ? this.books : books }
          columns={ this.columns }
          options={{ responsive: true, sortable: true, searching: true }}
          slots={{
            action: (data, row) => {return (
              <>
                <div className="d-flex flex-row justify-content-between">
                { (this.isOwner || currentUser.id === data.id) ? (
                          <>
                            <a href={`/books/${row.id}/edit`} className="btn btn-primary">Edit</a>
                            <input type="button" className="btn btn-danger ml-2" value="Delete" data-id={row.id} onClick={this.deleteBook}/>
                          </>) : (
                            <>
                              <a href={`/books/${row.id}/edit`} className="btn btn-secondary">View</a>

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
