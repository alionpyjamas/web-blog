import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

function Post(title,content){
this.title = title;
this.content = content;
this.rawDate = new Date();
this.date = this.rawDate.toLocaleString();
};

function addpost(title,content){
  let post = new Post(title,content);
  posts.push(post);
};

function deletepost(index){
  posts.splice(index,1);
};

function editpost(index,title,content){
  posts[index]= new post(title,content);
};


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
  let index = req.params.id;
  res.render("home.ejs",{posts: posts,postId: index});
});

app.get("/viewpost/:index",(req,res)=>{
  let index = req.params.index;
  let post = posts[index];
  console.log(index);
  res.render('viewPost.ejs', { postId: index,title:post.title,content:post.content });
});


app.get("/create",(req,res)=>{
  res.render("create.ejs");
});

app.post('/create', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  addpost(title,content);

  console.log(`Title: ${title}, Content: ${content}`);

  res.redirect('/'); 

});


app.post("/delete",(req,res)=>{
let index = req.params.id;
deletepost(index);
res.redirect("/");
});

app.listen(port,()=>{
  addpost("The Mysterious Locker","content i want here");
  console.log(`this server running on port ${port}`);
});
