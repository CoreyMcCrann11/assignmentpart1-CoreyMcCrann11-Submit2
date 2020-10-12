const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World from Corey!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/bananas', (req, res) =>
res.send('hello world this is bananas'));

let books = [];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);

    res.send('book added to the database');
    
    console.log(`book name is ${book.name} number of books is ${books.length}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/books', (req, res) => {
    res.send(books);
})

app.get('/books/:id', (req, res) => {
    let id = req.params.id;
    Response.JSON(books[id]);
    
})

app.delete('/books/:id',(req, res) => {
    let id = req.params.id;
    console.log(`removing book from database ${books[id].name}`)
    books.splice(req.params.id, 1);
    res.send(books);
    
})

