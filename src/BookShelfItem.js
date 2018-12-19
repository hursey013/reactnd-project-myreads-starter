import React, { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class BookShelfItem extends Component {
  static propTypes = {
    book: PropTypes.string.isRequired,
    onUpdateShelves: PropTypes.func.isRequired
  };

  state = {
    shelf: "none",
    imageLinks: {},
    title: "",
    authors: []
  };

  componentDidMount() {
    BooksAPI.get(this.props.book).then(book => {
      this.setState({ ...book });
    });
  }

  updateShelf = shelf => {
    BooksAPI.update(this.state, shelf).then(res => {
      this.props.onUpdateShelves(res);
    });

    this.setState(prevState => ({
      ...prevState,
      shelf: shelf
    }));
  };

  render() {
    const { shelf, imageLinks, title, authors } = this.state;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url(${imageLinks.smallThumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={e => {
                  this.updateShelf(e.target.value);
                }}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}

export default BookShelfItem;
