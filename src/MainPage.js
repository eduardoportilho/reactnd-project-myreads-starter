import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import { bookShelves as shelves } from './bookShelves'

class MainPage extends React.Component {

  render() {
    const { books, onBookShelfChange } = this.props
    const bookShelves = shelves.map(shelf => ({
      books: books.filter(book => book.shelf === shelf.key),
      ...shelf
    }))

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              { bookShelves.map(shelf => (
                  <Bookshelf 
                    onShelfChange={onBookShelfChange}
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
