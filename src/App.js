import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Home from "./Home";
import Search from "./Search";

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        currentlyReading: this.createShelf(books, "currentlyReading"),
        wantToRead: this.createShelf(books, "wantToRead"),
        read: this.createShelf(books, "read")
      });
    });
  }

  createShelf = (books, shelf) => {
    return books.filter(book => book.shelf === shelf).map(book => book.id);
  };

  updateShelves = values => {
    this.setState(() => ({
      ...values
    }));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Home shelves={this.state} onUpdateShelves={this.updateShelves} />
          )}
        />
        <Route
          path="/search"
          render={() => <Search onUpdateShelves={this.updateShelves} />}
        />
      </div>
    );
  }
}

export default BooksApp;
