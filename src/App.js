import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import { sanitizeBookData } from './utils'
import MainPage from './MainPage'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
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
  
  onBookShelfAdd = (newBook, shelf) => {
    const { books } = this.state
    this.setState({ 
      books: books.concat({
        ...newBook,
        shelf
      })
    })
  }

  render() {
    const { books, error } = this.state
    return (
      <Router>
        <div>
          { error && (
            <div className="error-msg">{error}</div>
          )}
          <Route exact path="/" render={(props) => (
            <MainPage {...props} books={books} onBookShelfChange={this.onBookShelfChange} />
          )}/>
          <Route path="/search" render={(props) => (
            <SearchPage onBookShelfAdd={this.onBookShelfAdd}/>
          )}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
