import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import { bookShelves as shelves } from './bookShelves'
import { sanitizeBookData } from './utils'

class MainPage extends React.Component {
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
    const bookShelves = shelves.map(shelf => ({
      books: books.filter(book => book.shelf === shelf.key),
      ...shelf
    }))

    return (
      <div className="app">
        { error && (
          <div className="error-msg">{error}</div>
        )}
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              { bookShelves.map(shelf => (
                  <Bookshelf 
                    onShelfChange={this.onBookShelfChange}
                    {...shelf}
                  />
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage
