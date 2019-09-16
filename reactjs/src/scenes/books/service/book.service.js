import axios from "axios";
const requestOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};
function postBooksData(bookData) {
  const formData = new FormData();
  Object.keys(bookData).map((index, value) => {
    return formData.append(index, bookData[index]);
  });
  return axios
    .post(`${process.env.REACT_APP_BOOKS_ADD_URL}`, formData, requestOptions)
    .then(
      data => {
        return {
          data: data.data.data,
          status: data.data.status,
          loading: false
        };
      },
      error => {
        //responseHandle(error);
      }
    );
}

function bookList() {
  return axios
    .get(`${process.env.REACT_APP_BOOKS_List_URL}`, requestOptions)
    .then(
      data => {
        return {
          data: data.data.data.rows,
          status: data.data.status,
          loading: false
        };
      },
      error => {}
    );
}

function getBookDetail(bookId) {
  return axios
    .get(
      `${process.env.REACT_APP_BOOKS_EDIT_URL}`,
      {
        params: {
          bookid: bookId
        }
      },
      requestOptions
    )
    .then(
      data => {
        return {
          data: data.data.data[0],
          status: data.data.status,
          loading: false
        };
      },
      error => {}
    );
}

function deleteBook(bookId) {
  return axios
    .delete(
      `${process.env.REACT_APP_BOOKS_DELETE_URL + bookId}`,
      requestOptions
    )
    .then(
      data => {
        console.log(data);
        return {
          data: data.data,
          status: data.data.status,
          loading: false
        };
      },
      error => {}
    );
}

export default { postBooksData, bookList, getBookDetail, deleteBook };
