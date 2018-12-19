import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import BookShelfItem from "./BookShelfItem";

class Search extends Component {
  static propTypes = {
    onUpdateShelves: PropTypes.func.isRequired
  };

  state = {
    results: [],
    query: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      if (!this.state.query) {
        this.setState({ results: [] });
        return;
      }

      BooksAPI.search(this.state.query).then(results => {
        this.setState({ results });
      });
    }
  }

  updateQuery = value => {
    this.setState({ query: value });
  };

  render() {
    const { results, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(Array.isArray(results) || results.length) &&
              results
                .filter(result =>
                  ["imageLinks", "authors"].every(r =>
                    Object.keys(result).includes(r)
                  )
                )
                .map(result => (
                  <BookShelfItem
                    key={result.id}
                    book={result.id}
                    onUpdateShelves={this.props.onUpdateShelves}
                  />
                ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
