import React from 'react'
import Book from './Book'

function Bookshelf({ title, books, onShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map((book, index) => (
            <li key={index}>
              <Book
                onShelfChange={onShelfChange}
                book={book}
              />
            </li>
          )) }
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf