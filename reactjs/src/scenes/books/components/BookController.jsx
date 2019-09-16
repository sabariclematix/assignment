import React, { Component } from "react";
import PropTypes from "prop-types";
import Add from "./Add";
import List from "./List";
import Edit from "./Edit";
import Schema from "form-schema-validation";
import booksService from "../service/book.service";
import { connect } from "react-redux";
import notificationConstants from "../../../constants/notification.constants";
import { history } from "../../../helpers/history";
// book form fields validation
const bookSchema = new Schema({
  isbn: {
    type: String,
    required: true
  },
  bookname: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  bookdescription: {
    type: String
  }
});

class BookController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.props.action === "list") {
      booksService.bookList().then(data => {
        this.setState({
          rows: data.data,
          rowCount: data.data.length
        });
      });
    } else if (this.props.action === "edit") {
      this.setState({
        loading: true
      });
      booksService.getBookDetail(this.props.match.params.id).then(data => {
        if (data.status) {
          this.setState({
            books: data.data,
            loading: data.loading
          });
        }
      });
    }
  }

  formSubmit = model => {
    if (this.props.action === "edit") {
      model["bookid"] = this.props.match.params.id;
    }
    booksService.postBooksData(model).then(data => {
      if (this.props.action === "edit") {
        this.props.dispatch({
          type: notificationConstants.SUCCESS,
          message: "Book successfully updated"
        });
      } else {
        this.props.dispatch({
          type: notificationConstants.SUCCESS,
          message: "Book added successfully"
        });
      }
      history.push("/books/");
    });
  };
  bookDelete = (e, bookId) => {
    booksService.deleteBook(bookId).then(data => {
      this.props.dispatch({
        type: notificationConstants.SUCCESS,
        message: "Book successfully deleted"
      });
    });
  };
  render() {
    let action = this.props.action;
    let loadComponent = null;
    if (action === "add") {
      loadComponent = <Add schema={bookSchema} submit={this.formSubmit} />;
    } else if (action === "edit") {
      loadComponent =
        this.state.loading === false ? (
          <Edit
            schema={bookSchema}
            submit={this.formSubmit}
            details={this.state.books}
          />
        ) : (
          "<div>Loading</div>"
        );
    } else if (action === "list") {
      loadComponent = (
        <List
          rows={this.state.rows}
          rowsCount={this.state.rowsCount}
          bookDelete={this.bookDelete}
        />
      );
    }
    return <div>{loadComponent}</div>;
  }
}
BookController.propTypes = {
  action: PropTypes.string.isRequired
};
function mapStateToProps(state) {
  const { notification } = state;
  return {
    notification
  };
}
const connectedBookController = connect(mapStateToProps)(BookController);
export default connectedBookController;
