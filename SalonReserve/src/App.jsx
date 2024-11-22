import { useEffect, useState } from 'react'
import axios from 'axios';


export const App = () => {
  const url = 'http://127.0.0.1:8000/api/books'

  const [books, setBooks] = useState([])

  useEffect(() => {
    getBooks();
  }, [])

  const getBooks = async () => {
    const response = await axios.get(url)
    const result = response.data
    console.log(result)

    setBooks(result)
    return result
  }

  return (
    <>
      {books.map(book => (
        <div>
          <h3>{book.title}</h3>
          <div>{book.author}</div>
          <div>{book.publisher}</div>
          <div>{book.year}</div>
          <div>{book.genre}</div>
        </div>
      )
      )}
    </>
  )

}