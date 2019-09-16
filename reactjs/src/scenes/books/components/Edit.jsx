import React, { Component } from "react";
import {
  Form,
  TextField,
  TextareaField,
  SubmitField
} from "react-components-form";
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { schema, submit, details } = this.props;
    const { isbn, book_name, count, author, description } = details;
    return (
      <div className="book_container">
        <h1>Edit Book Details</h1>
        <Form
          schema={schema}
          onSubmit={model => submit(model)}
          className="book_form"
        >
          <TextField name="isbn" label="ISBN" type="text" value={isbn} />
          <TextField
            name="bookname"
            label="Book Name"
            type="text"
            value={book_name}
          />
          <TextField name="count" label="count" type="text" value={count} />
          <TextField name="author" label="Author" type="text" value={author} />
          <TextareaField
            name="bookdescription"
            label="Book description"
            value={description}
          />
          <SubmitField value="Submit" />
        </Form>
      </div>
    );
  }
}
export default Edit;
