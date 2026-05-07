import React from "react";
import { Link } from "react-router-dom";
import Ratings from "./ui/Ratings";

const FALLBACK_COVER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='620' viewBox='0 0 420 620'%3E%3Crect width='420' height='620' fill='%23e8d8b6'/%3E%3Crect x='26' y='26' width='368' height='568' rx='12' fill='none' stroke='%235a3e2b' stroke-width='6'/%3E%3Ctext x='50%25' y='45%25' text-anchor='middle' fill='%235a3e2b' font-size='32' font-family='serif'%3EMiddle-earth%3C/text%3E%3Ctext x='50%25' y='53%25' text-anchor='middle' fill='%232f1f15' font-size='42' font-family='serif'%3EChronicles%3C/text%3E%3C/svg%3E";

const Book = ({ book }) => {
  function handleImageError(event) {
    event.currentTarget.src = FALLBACK_COVER;
    event.currentTarget.onerror = null;
  }

  return (
    <div className="book">
      <Link to={`/books/${book.id}`} className="book__link">
        <figure className="book__img--wrapper">
          <img
            src={book.url}
            alt={`${book.title} Book Cover`}
            className="book__img"
            onError={handleImageError}
          />
        </figure>
      </Link>
      <Link to={`/books/${book.id}`} className="book__link">
        <h3 className="book__title"> {book.title}</h3>
      </Link>
      <div className="book__ratings">
        <Ratings rating={book.rating} />
        {/* {new Array(4).fill(0).map(() => <FontAwesomeIcon icon="star" />)} */}
        {/* {Array.from({ length: Math.floor(book.rating) }, (_, index) => (
          <FontAwesomeIcon icon="star" key={index} className="book__star--icon" />
              ))}
              {book.rating % 1 !== 0 && (
                <FontAwesomeIcon icon="star-half" className="book__star--icon" />
              )} */}
             </div>
             <div className="book__price">
              {book.salePrice ? (<><span className="book__price--normal">${book.originalPrice.toFixed(2)}</span>
              ${book.salePrice.toFixed(2)}</>) : (<>${book.originalPrice.toFixed(2)}</>)
            }
             </div>
            </div>
  );
};

export default Book;  