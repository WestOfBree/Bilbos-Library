import React from "react";
import Book from "../components/Book";


const Books = ({ books: initialBooks }) => {
    const [books, setBooks] = React.useState(initialBooks);

    function filterBooks(event) {
        const filter = event.target.value;  
        let sortedBooks = [];
        if (filter === "LOW_TO_HIGH") {
            sortedBooks = [...books].sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
        } else if (filter === "HIGH_TO_LOW") {
            sortedBooks = [...books].sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
        } else if (filter === "RATING") {
            sortedBooks = [...books].sort((a, b) => b.rating - a.rating);
        }
        setBooks(sortedBooks);
    }

  return (
    <div id="books__body">
      <main id="books__main">
        <section>
          <div className="books__container">
            <div className="row">
              <div className="books__header">
                <h2 className="section__title books__header--title">
                  All Books
                </h2>
                <select name="filter" id="filter" defaultValue="DEFAULT" onChange={(event) => filterBooks(event)}>
                  <option value="DEFAULT" disabled> Sort</option>
                  <option value="LOW_TO_HIGH">Price: Low to High</option>
                  <option value="HIGH_TO_LOW">Price: High to Low</option>
                  <option value="RATING">Rating</option>
                </select>
              </div>
                <div className="books">
                    {books.map((book) => (
                        <Book key={book.id} book={book} />
                        ))}
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Books;
