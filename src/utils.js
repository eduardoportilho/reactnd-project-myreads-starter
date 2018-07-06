import { NONE } from './bookShelves'

/**
 * Handle empty fields and empty responses from the Books API.
 * @returns {Object} bookData
 * @returns {Object[]} bookData.books - List of books
 * @returns {string} bookData.books.id - The book ID.
 * @returns {string} bookData.books.title - The book title.
 * @returns {string[]} bookData.books.authors - List of authors of the book.
 * @returns {string} bookData.books.shelf - The book image shelf.
 * @returns {string} bookData.books.image - The book image URL.
 */
export const sanitizeBookData = (bookData) => {
  try {
    return {
      books: bookData.map(book => ({
        id: book.id,
        title: book.title,
        authors: book.authors || [],
        shelf: book.shelf || NONE,
        image: book.imageLinks.thumbnail,
      }))
    }
  } catch (error) {
    return { books: [] }
  }
}