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

/**
 * Main application component
 */
class BooksApp extends React.Component {
  state = {
    books: [],
    error: undefined,
    loading: false,
  }

  /**
   * Load the books when the component loads.
   */
  componentDidMount = async () => {
    this.setState({ loading: true })
    this.fetchBooks()
  }
  
  fetchBooks = async () => {
    try {
      const books = await BooksAPI.getAll()
      // Handle empty fields and empty responses
			this.setState({
        loading: false,
        ...sanitizeBookData(books)
      })
    } catch(error) {
      // Display errors from the API on the UI
			this.setState({
        loading: false,
        error
      })
    }
  }
  
  /**
   * Add a new book to a shelf or change the shelf of an existing book.
   * @param changingBook - A book.
   * @param shelf - The shelf where the book should be added.
   */
  onBookShelfAddOrChange = async (changingBook, shelf) => {
    try {
      this.setState({ loading: true })
      // Update the shelf on the API and fetch the books again
      await BooksAPI.update(changingBook, shelf)
      this.fetchBooks()
    } catch(error) {
      // Display errors from the API on the UI
			this.setState({
        loading: false,
        error
      })
    }
  }

  render() {
    const { books, error, loading } = this.state
    return (
      <Router>
        <div>
          { error && (
            <div className="error-msg">{error}</div>
          )}
          { loading && (
            <div className="loading">Loading&#8230;</div>
          )}
          <Route exact path="/" render={_ => (
            <MainPage books={books} onBookShelfChange={this.onBookShelfAddOrChange} />
          )}/>
          <Route path="/search" render={_ => (
            <SearchPage booksOnShelf={books} onBookShelfAdd={this.onBookShelfAddOrChange}/>
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
