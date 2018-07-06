import React from 'react'
import Book from './Book'


/**
 * Book shelf component.
 * @param {Object} props
 * @param {string} props.title - Shelf title.
 * @param {Object[]} props.books - List of books on the shelf.
 * @param {string} props.books.id - The book ID.
 * @param {string} props.books.title - The book title.
 * @param {string} props.books.image - The book image URL.
 * @param {string} props.books.shelf - The shelf of the book.
 * @param {string[]} props.books.authors - List of authors of the book.
 * @param {function} props.onShelfChange - The callback to be executed to change a book's shelf.
 */
function Bookshelf({ title, books, onShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map(book => (
            <li key={book.id}>
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
