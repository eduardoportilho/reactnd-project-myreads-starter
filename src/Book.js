import React from 'react'
import {
  CURRENTLY_READING_SHELF,
  READ_SHELF,
  WANT_TO_READ_SHELF,
  NONE,
} from './bookShelves'

/**
 * Book component with image and shelf selector.
 * @param {Object} props
 * @param {Object} props.book - The book object.
 * @param {string} props.book.id - The book ID.
 * @param {string} props.book.title - The book title.
 * @param {string} props.book.image - The book image URL.
 * @param {string} props.book.shelf - The shelf of the book.
 * @param {string[]} props.book.authors - List of authors of the book.
 * @param {function} props.onShelfChange - The callback to be executed to change the book shelf.
 */
function Book({ book, onShelfChange }) {

  // Get the selected shelf and call the callback.
  const onBookShelfChange = (book) => (event) => {
    const shelf = event.target.value
    onShelfChange(book, shelf)
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.image}")` }}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={onBookShelfChange(book)}>
            <option value="move" disabled>Move to...</option>
            <option value={CURRENTLY_READING_SHELF}>Currently Reading</option>
            <option value={WANT_TO_READ_SHELF}>Want to Read</option>
            <option value={READ_SHELF}>Read</option>
            <option value={NONE}>None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(', ')}</div>
    </div>
  )
}

export default Book