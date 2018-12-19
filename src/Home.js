import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";

const camel2title = camelCase =>
  camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase());

const Home = props => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {Object.keys(props.shelves).map(shelf => (
          <BookShelf
            key={shelf}
            books={props.shelves[shelf]}
            onUpdateShelves={props.onUpdateShelves}
            name={camel2title(shelf)}
          />
        ))}
      </div>
    </div>
    <div className="open-search">
      <Link to="/search">
        <button>Add a book</button>
      </Link>
    </div>
  </div>
);

Home.propTypes = {
  shelves: PropTypes.object.isRequired,
  onUpdateShelves: PropTypes.func.isRequired
};

export default Home;
