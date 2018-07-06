import React from 'react'
import {
  CURRENTLY_READING_SHELF,
  READ_SHELF,
  WANT_TO_READ_SHELF,
  NONE,
} from './bookShelves'

function Book(props) {
  const { book, onShelfChange } = props
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