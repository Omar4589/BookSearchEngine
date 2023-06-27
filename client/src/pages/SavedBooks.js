import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  // Query the user data using the GET_ME query on load and save it to the 'userData' variable
  const { loading, data } = useQuery(GET_ME);
  // Define the removeBook mutation and handle any errors
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  console.log(data)
  const userData = data?.me || {};

  
  // Handle the deletion of a book
  const handleDeleteBook = async (bookId) => {
    // Check if the user is authenticated
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    const decodedToken = Auth.getProfile();
    console.log("decoded Token!!-->>>", decodedToken);

    const usersId = decodedToken.data._id; // Assuming the user ID is stored in the 'id' field of the token payload
    console.log(usersId);

    try {
      // Call the removeBook mutation to delete the book
      const response = await removeBook({
        variables: { userId: usersId, bookId },
      });

      // Remove the book's id from localStorage upon successful deletion
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Show a loading message if the data is still loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
              userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card key={book.bookId} border="dark" >
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
