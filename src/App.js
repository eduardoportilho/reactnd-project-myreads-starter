import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import MainPage from './MainPage'
import SearchPage from './SearchPage'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage}/>
          <Route path="/search" component={SearchPage}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
