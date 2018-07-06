import { NONE } from './bookShelves'

/**
 * Handle empty fields and empty responses from the Books API.
 * @param {Object[]} bookData - List of books returned by the API.
 * @returns {Object[]} sanitizedBooks
 * @returns {string} sanitizedBooks[].id - The book ID.
 * @returns {string} sanitizedBooks[].title - The book title.
 * @returns {string[]} sanitizedBooks[].authors - List of authors of the book.
 * @returns {string} sanitizedBooks[].shelf - The book image shelf.
 * @returns {string} sanitizedBooks[].image - The book image URL.
 */
export const sanitizeBookData = (bookData) => {
  if (!bookData || !bookData.map) {
    return []
  }
  return bookData.map(book => ({
      id: book.id,
      title: book.title,
      authors: book.authors || [],
      shelf: book.shelf || NONE,
      image: book.imageLinks ? book.imageLinks.thumbnail : '',
    }))
}
