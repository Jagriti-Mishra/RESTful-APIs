const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
app.get("/", (req, res) => {
    res.redirect("/posts");
});

//UUID => Universally unique Identifier
const { v4: uuidv4 } = require('uuid'); 
uuidv4();// ⇨ 'b18794e8-5d0d-417c-b361-ba38e78411b4'
const methodOverride = require("method-override"); 
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));//parsing of the data urlencoded data to make it readable
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

//to delete the post we use the let instead of const
let posts = [
    {
    id: uuidv4(),
    username: "Jagriti Mishra",
    content: "Thrilled to announce that I am qualified as a Semifinalist in Flipkart GRiD 8.0! Grateful for the intense brainstorming, scalable system design, and relentless teamwork",
    },
    {   
         id: uuidv4(),
        username: "quantum_coder",
        content: "Quantum computing is transitioning from theoretical physics to practical engineering. Superposition and entanglement will revolutionize cryptography and drug discovery sooner than we think.",
    },
    {
        
    id: uuidv4(),
    username: "cloud_sentinel",
    content: "Security is never an afterthought; it is an architectural foundation. Build zero-trust systems where every microservice verifies identity and authorization at every boundary.",
    },
    {   id:uuidv4(),
        username:"JJ",
        content:"I got selected for my first internship!!",
    },
    {
        id: uuidv4(),
        username: "sarah_ai",
        content: "Artificial Intelligence will not replace engineers, but engineers who master AI workflows will replace those who don't. Focus on problem-solving and systems thinking.",
    },
    {
        id: uuidv4(),
        username: "alex_architect",
        content: "Senior engineering isn't about writing complex code. It's about designing simple, maintainable solutions for complex problems.",
    },
    {
        id: uuidv4(),
        username: "cosmos_chronicles",
        content: "Every atom of iron in our blood was forged inside the core of a dying star billions of years ago. We are quite literally the universe understanding itself.",
    },
    {
        id: uuidv4(),
        username: "priya_product",
        content: "Simplicity is about subtracting the obvious and adding the meaningful. The best products are defined as much by what they leave out as what they put in.",
    },
    {
        id: uuidv4(),
        username: "open_source_ninja",
        content: "Contributing to open source teaches you what textbooks can't: reading massive codebases, communicating asynchronously across time zones, and building software for thousands of strangers.",
    },
];


app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");//user and content form
});

app.post("/posts",(req,res) =>{
    // console.log("req.body");//data lies inside body in post method
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    //there should be the case where the post can get undefined or else show.ejs get will be undef while deleting the post or browser sub,itting old html before refresh
    if(!post){
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs",{post});
    console.log(post);
});

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
      if (!post) {
        return res.status(404).send("Post not found");
    }
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs",{post});
});

//to delete the post 
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    //use filter to keep vert post whose ID doesnot match with the delete post id teh remaining arr in intact unlike find
    // note: don't use find as it only return a single obj which find the post we want to delete
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
});

