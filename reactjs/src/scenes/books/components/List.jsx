import React, { Component } from "react";
import ReactTable from "react-table";
import { NavLink } from "react-router-dom";
import { history } from "../../../helpers/history";
import "../style.css";
import "react-table/react-table.css";
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rows, rowsCount, bookDelete } = this.props;
    const columns = [
      {
        Header: "Action",
        accessor: "id",
        Cell: row => (
          <span>
            <NavLink className="book_list_edit" to={"/books/edit/" + row.value}>
              Edit
            </NavLink>
            <span
              className="book_list_delete"
              onClick={e => bookDelete(e, row.value)}
            >
              Delete
            </span>
          </span>
        )
      },
      {
        Header: "Id",
        filterable: true,
        accessor: "id"
      },
      {
        Header: "ISBN",
        filterable: true,
        accessor: "isbn"
      },
      {
        Header: "Book Name",
        filterable: true,
        accessor: "book_name"
      },
      {
        Header: "Count",
        filterable: true,
        accessor: "count"
      },
      {
        Header: "Author",
        filterable: true,
        accessor: "author"
      },
      {
        Header: "Description",
        filterable: true,
        accessor: "description"
      }
    ];
    return (
      <div>
        <button
          className="add_book"
          type="button"
          onClick={() => {
            history.push("/books/add");
          }}
        >
          Add Book
        </button>
        <ReactTable data={rows} columns={columns} />
      </div>
    );
  }
}
export default List;
