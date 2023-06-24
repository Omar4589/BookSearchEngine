import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { REMOVE_BOOK } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  // Query the user data using the GET_ME query
  const { loading, data } = useQuery(GET_ME);
  const user = data?.user || {};

  // Define the removeBook mutation and handle any errors
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // Handle the deletion of a book
  const handleDeleteBook = async (bookId) => {
    // Check if the user is authenticated
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Call the removeBook mutation to delete the book
      const response = await removeBook({ variables: { bookId } });

      if (!response.data) {
        throw new Error("Something went wrong!");
      }

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
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${
                user.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {user.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
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
