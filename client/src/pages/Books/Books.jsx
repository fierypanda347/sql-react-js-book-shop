import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Books.css'
import { useNavigate } from 'react-router-dom'

export default function Books() {
  const [ books, setBooks ] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAllBooks() {
      try {
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllBooks()
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="homepage">
      <h1>My Book Shop</h1>
      <div className="books">
        { books.map((book) => {
          return <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>Price: ₹{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update" onClick={() => navigate("/update/"+book.id)}>Update</button>
          </div>
        })}
      </div>
      <button className='add_book_button' onClick={() => navigate("/add")}>Add a New Book</button>
    </div>
  )
}
