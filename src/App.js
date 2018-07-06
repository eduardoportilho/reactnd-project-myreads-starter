import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import { sanitizeBookData } from './utils'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    error: undefined,
  }

	componentDidMount = async () => {
    try {
      const books = await BooksAPI.getAll()
			this.setState(sanitizeBookData(books))
    } catch(error) {
			this.setState({ error })
    }
  }
  
  onBookShelfAddOrChange = (changingBook, shelf) => {
    const { books } = this.state
    // Remove the book from the shelf if it is there
    const shelfIndex = books.findIndex(bookOnShelf => changingBook.id === bookOnShelf.id)
    if (shelfIndex > -1) {
      books.splice(shelfIndex, 1);
    }
    // Change shelf
    changingBook.shelf = shelf
    // Add the updated book to the shelf
    this.setState({ 
      books: books.concat(changingBook)
    })
  }

  render() {
    const { books, error } = this.state
    return (
      <Router>
        <div>
          { error && (
            <div className="error-msg">{error}</div>
          )}
          <Route exact path="/" render={(props) => (
            <MainPage books={books} onBookShelfChange={this.onBookShelfAddOrChange} />
          )}/>
          <Route path="/search" render={(props) => (
            <SearchPage booksOnShelf={books} onBookShelfAdd={this.onBookShelfAddOrChange}/>
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
