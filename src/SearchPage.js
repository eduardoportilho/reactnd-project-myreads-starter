import React from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { sanitizeBookData } from './utils'

class SearchPage extends React.Component {
  state = {
    books: [],
    error: undefined,
  }

  onSearchQueryChange = async (event) => {
    try {
      const query = event.target.value
      const books = await BooksAPI.search(query)
			this.setState(sanitizeBookData(books))
    } catch(error) {
      console.log(`>>>`, error)
			this.setState({ error })
    }

  }


  onBookShelfChange = (changingBook, shelf) => {
    const { books } = this.state
    this.setState({ 
      books: books.map(book => {
        if (book === changingBook) {
          return {
            ...book,
            shelf,
          }
        }
        return book
      })
    })
  }

  render() {
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                      onShelfChange={this.onBookShelfChange}
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
