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
    books: [],
    error: undefined,
  }

  /**
   * Search for books with the query when the search input value changes.
   * @param {SyntheticEvent} event
   */
  onSearchQueryChange = async (event) => {
    try {
      const query = event.target.value
      // Handle empty fields and empty responses
      const { books } = sanitizeBookData(await BooksAPI.search(query))
      // Update the shelves of the books and update the state
			this.setState({ 
        books: this.updateBookShelves(books)
      })
    } catch(error) {
      // Display errors from the API on the UI
			this.setState({ error })
    }
  }

  /**
   * Update the shelf of the books returned by the search using the app state.
   */
  updateBookShelves = (books) => {
    const { booksOnShelf } = this.props
    return books.map(book => {
      // If the book is on any shelf, use the shelf instance
      return booksOnShelf.find(bookOnShelf => book.id === bookOnShelf.id) || book
    })
  }

  render() {
    const { onBookShelfAdd } = this.props
    const { books, error } = this.state
    return (
      <div className="app">
        { error && (
          <div className="error-msg">{error}</div>
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
                { books.map((book, index) => (
                  <li key={index}>
                    <Book
                      onShelfChange={onBookShelfAdd}
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
