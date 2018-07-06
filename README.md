# MyReads 

This is my implementation of the final assessment project for Udacity's React Fundamentals course, the MyReads application.

## How to run

* Clone or download the repository and `cd` into it

```
$ git clone git@github.com:eduardoportilho/reactnd-project-myreads-starter.git
$ cd reactnd-project-myreads-starter
```

* Install the project dependencies and run

```
$ yarn
$ yarn start

```

* Open the URL `http://localhost:3000/` on your browser of choice.

## How to use the app

* The main page show three book shelves: "Currently Reading", "Read" and "Want to Read".
* To move a book to a different shelf, click on the green button with an arrow next to it and select the new shelf.
* To remove a book, click on the green button with an arrow next to it and select "None".
* To add a book, click on the green button with a plus on the bottom, you'll be redirected to the search page.
    * On the search page, enter a query in the search field. The matching books will be shown.

> NOTES: The search from BooksAPI is limited to a particular set of search terms.
> You can find these search terms here:
> https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
> 
> However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
> you don't find a specific author or title. Every search is limited by search terms.

    * To add books to yopur shelves, click on the green button with an arrow next to the book and select the new shelf.
    * Click on the arrow next to the search field to return to the main page.

## Dependencies

* [React](https://reactjs.org/): A JavaScript library for building user interfaces
* [React Router v4](https://github.com/ReactTraining/react-router): Declarative routing for React
* [react-debounce-input](https://github.com/nkbt/react-debounce-input): React component that renders an Input, Textarea or other element with debounced onChange. 
