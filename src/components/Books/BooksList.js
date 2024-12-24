import { Component } from "react";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
DataTable.use(DT);


export class BooksList extends Component {
  constructor(props) {
    super(props);
    this.books = props.books;
    this.isOwner = props.isOwner;

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

  render() {
    return (
      <>
        <DataTable className="table-responsive"
          data={ this.books }
          columns={ this.columns }
          options={{ responsive: true, sortable: true, searching: true }}
          slots={{
            action: (data, row) => (
              
              <>
                <div className="d-flex flex-row justify-content-between">
                <a href={`/book/${data}/edit`} className="btn btn-primary">Edit</a>
                <input type="button" className="btn btn-danger ml-2" value="Delete" />
                </div>
              </>
            )
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
