import React from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ratings from "../components/ui/Ratings";
import Price from "../components/ui/Price";
import Book from "../components/Book";

const FALLBACK_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='620' viewBox='0 0 420 620'%3E%3Crect width='420' height='620' fill='%23e8d8b6'/%3E%3Crect x='26' y='26' width='368' height='568' rx='12' fill='none' stroke='%235a3e2b' stroke-width='6'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' fill='%235a3e2b' font-size='32' font-family='serif'%3EMiddle-earth%3C/text%3E%3Ctext x='50%25' y='53%25' text-anchor='middle' fill='%232f1f15' font-size='42' font-family='serif'%3EChronicles%3C/text%3E%3C/svg%3E";

function BookInfo({ books, addToCart, cart = [] }) {
  const { id } = useParams();
  const book = books.find((book) => +book.id === +id);

  function addBookToCart(book) {
    addToCart(book);
  }

  function handleImageError(event) {
    event.currentTarget.src = FALLBACK_COVER;
    event.currentTarget.onerror = null;
  }

  function isItemInCart() {
    return cart.find((book) => +book.id === +id);
  }

  if (!book) {
    return (
      <div className="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row row__column">
              <h2 className="book__selected--title--top">Book not found</h2>
              <Link to="/books" className="btn">
                Back to Books
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <Link to={`/books`} className="book__back-link">
              <FontAwesomeIcon icon="arrow-left" />
              <span className="book__back-link--text">Back to Books</span>
            </Link>
            <div className="book__selected--top">
              <div className="book__selected">
                <figure className="book__selected--figure">
                  <img src={book.url} alt={book.title} className="book__selected--img" onError={handleImageError} />
                </figure>
                <div className="book__selected--description">
                  <h2 className="book__selected--title">{book.title}</h2>
                  <p className="book__selected--author">{book.author}</p>
                  <p className="book__selected--rating">
                    <Ratings rating={book.rating} />
                  </p>
                  <div className="book__selected--price">
                    <Price
                      salePrice={book.salePrice}
                      originalPrice={book.originalPrice}
                    />
                  </div>
                  <div className="book__summary">
                    <h3 className="book__summary--title">Summary</h3>
                    <p className="book__summary--description">
                      {book.description}
                    </p>
                    <p className="book__summary--description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                  {isItemInCart() ? (
                    <Link to="/cart">
                      <button className="btn btn__primary">
                        View in Cart
                      </button>
                    </Link>
                  ) : (
                    <button
                      className="btn btn__primary"
                      onClick={() => addBookToCart(book)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="book__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
              {books
                .filter((book) => book.rating === 5 && +book.id !== +id)
                .slice(0, 4)
                .map((book) => (
                  <Book book={book} key={book.id} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookInfo;
