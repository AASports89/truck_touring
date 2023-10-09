import React from 'react';
import Jumbotron from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import CardColumns from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteBook] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

  if(!userData?.username) {
    return (
      <h4>
        Error❗⛔ Please Login❗⛔
      </h4>
    );
  }
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteBook({
        variables: {bookId: bookId},
        update: cache => {
          const data = cache.readQuery({ query: GET_ME });
          const userDataCache = data.me;
          const savedBooksCache = userDataCache.savedBooks;
          const updatedBookCache = savedBooksCache.filter((book) => book.bookId !== bookId);
          data.me.savedBooks = updatedBookCache;
          cache.writeQuery({ query: GET_ME , data: {data: {...data.me.savedBooks}}})
        }
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...📚...LOADING...📖</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container id="main-title">
          <h1>Saved Book Catalog 🗄️</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'Book Catalog Empty❗⛔'}
        </h2>
        <CardColumns id="col">
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`${book.title}'s Book Cover`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  {book.link ? ( <Card.Text><a href={book.link}>More Information on Google Books</a></Card.Text> ) : null}
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger" id="btn4"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete Book ❌
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
