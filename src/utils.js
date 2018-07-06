import { NONE } from './bookShelves'

export const sanitizeBookData = (bookData) => {
  try {
    return {
      books: bookData.map(book => ({
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