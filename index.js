const express = require('express');
const bodyParser = require('body-parser');
const app  = express();
const ejs = require('ejs')

const port = 5000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let posts = [
    { title: "First Post", content: "This is the first post!" },
    { title: "Second Post", content: "Here is another interesting post." },
    { title: "Third Post", content: "This is the third post, enjoy!" }
];

function homePage(req, res){
    res.render('post', {data: posts})
}

async function postBlog(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content
        }
        posts.push(post)
    res.redirect("/");
}

 

function userPage(req, res){
    res.sendFile(__dirname+ '/user.html')
}

function getBlog(req, res){
    res.render('home', {data: posts})
}

async function addUser(req, res){
    const user = {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        }

    let userInsertQuery = "INSERT INTO user (name, email, country) VALUES (?,?, ?)"
    const [result] = await db.execute(userInsertQuery, [user.name, user.email, user.country])
    res.redirect("/users");
}


app.get('/blog', getBlog)
app.post('/blog', postBlog)

app.get('/user', userPage)
app.post('/user', addUser)
app.get('/', homePage)
app.listen(port,() => {
    console.log(`Server is running on ${port}...`)
} )