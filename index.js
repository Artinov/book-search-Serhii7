var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

var books = require("./data/books.json");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/books", function(req, res) {
    res.send(books.map(function(book) {
        return {
            id: book._id,
            name: book.name,
            author: book.author,
            picture: book.picture,
            tags: book.tags
        }
    }));
});

app.get("/book/:bookId", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/book.html"));
});

app.post("/book", function(req, res) {
    var bookId = req.body.bookId;

    res.send(books.filter(function(book) {
        return book._id == bookId;
    }));
});
app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/search.html"));
});
app.post("/bookSearch", function(req,res){
    var bookName = req.body.bookName;
    var booksFind = [];

    books.forEach(function(book){
        var name = book.name;

        if(name.indexOf(bookName) >= 0){
            booksFind.push(book);
        }

    });

    res.send(booksFind.map(function(book) {
        return {
            id: book._id,
            name: book.name,
            author: book.author,
            picture: book.picture,
            tags: book.tags
        }
    }));
});

app.listen(3000, function() {
    console.log("Server is running on http://localhost:3000");
});