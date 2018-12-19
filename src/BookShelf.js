import React from "react";
import PropTypes from "prop-types";
import BookShelfItem from "./BookShelfItem";

const BookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book => (
          <BookShelfItem
            key={book}
            book={book}
            onUpdateShelves={props.onUpdateShelves}
          />
        ))}
      </ol>
    </div>
  </div>
);

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelves: PropTypes.func.isRequired
};

export default BookShelf;
