import React from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Update () {
  const navigate = useNavigate()
  const location = useLocation()

  const bookID = location.pathname.split("/")[2]

  const [ book, setBook ] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null
  })

  function handleChange(e) {
    setBook(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  async function handleClick(e) {
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/books/"+bookID, book)
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1>Update the book</h1>
      <input type="text" placeholder='Title' onChange={handleChange} name="title" />
      <input type="text" placeholder='Description' onChange={handleChange} name="desc" />
      <input type="text" placeholder='Cover' onChange={handleChange} name="cover" />
      <input type="number" placeholder='Price' onChange={handleChange} name="price" />

      <button onClick={handleClick}>Update Book</button>
    </div>
  )
}