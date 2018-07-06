import React from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { sanitizeBookData } from './utils'

/**
 * Search page component.
 */
class SearchPage extends React.Component {
  state = {
    searchBooks: [],
    error: undefined,
    loading: false
  }

  /**
   * Search for books with the query when the search input value changes.
   * @param {SyntheticEvent} event
   */
  onSearchQueryChange = async (event) => {
    try {
      this.setState({ loading: true })
      const query = event.target.value
      // Handle empty fields and empty responses
      const books = sanitizeBookData(await BooksAPI.search(query))
			this.setState({ 
        loading: false,
        searchBooks: books
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
   * Update the shelf of the books returned by the search using the app state.
   * @param {Object[]} searchBooks - Books returned from the search
   * @param {Object[]} booksOnShelf - Books on the user's shelves
   * @return {Object[]} updatedBooks - Books with the updated shelf.
   */
  updateBookShelves = (searchBooks, booksOnShelf) => {
    return searchBooks.map(book => {
      // If the book is on any shelf, use the shelf instance
      return booksOnShelf.find(bookOnShelf => book.id === bookOnShelf.id) || book
    })
  }

  render() {
    const { onBookShelfChange, booksOnShelf } = this.props
    const { searchBooks, error, loading } = this.state
    const updatedBooks = this.updateBookShelves(searchBooks, booksOnShelf)
    return (
      <div className="app">
        { error && (
          <div className="error-msg">{error}</div>
        )}
        { loading && (
          <div className="loading">Loading&#8230;</div>
        )}
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* Using DebounceInput to avoid making several queries to the API while typing */}
                <DebounceInput
                  type="text"
                  placeholder="Search by title or author"
                  debounceTimeout={300}
                  onChange={this.onSearchQueryChange}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                { updatedBooks.map(book => (
                  <li key={book.id}>
                    <Book
                      onShelfChange={onBookShelfChange}
                      book={book}
                    />
                  </li>
                )) }
              </ol>
            </div>
          </div>
      </div>
    )
  }
}

export default SearchPage
