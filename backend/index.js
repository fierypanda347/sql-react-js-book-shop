import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    "password": process.env.MYSQL_PASSWORD,
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello this is the backend")
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"
    db.query(query, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]
    db.query(query, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookID = req.params.id
    const query = "DELETE FROM books WHERE id = ?"
    db.query(query, [bookID], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookID = req.params.id
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]
    db.query(query, [...values, bookID], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been updated successfully")
    })
})

app.listen(8800, () => {
    console.log("Connected to the Backend!");
})