import React, { Component } from "react";
import {
  Form,
  TextField,
  TextareaField,
  SubmitField
} from "react-components-form";
import "../style.css";
class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { schema, submit } = this.props;
    return (
      <div className="book_container">
        <h1>Add Book Details</h1>
        <Form
          schema={schema}
          onSubmit={model => submit(model)}
          className="book_form"
        >
          <TextField name="isbn" label="ISBN" type="text" />
          <TextField name="bookname" label="Book Name" type="text" />
          <TextField name="count" label="count" type="text" value={1} />
          {/* set default value for count */}
          <TextField name="author" label="Author" type="text" />
          <TextareaField name="bookdescription" label="Book description" />

          <SubmitField value="Submit" />
        </Form>
      </div>
    );
  }
}
export default Add;
