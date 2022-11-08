const express = require('express');
const app = express();
const methodOverride=require('method-override');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));
app.use(methodOverride('_method'));
const comments=[
    {
        id:0,
        username:'Mohit',
        body:"Hello from Mohit"
    },
    
    {
        id:2,
        username:'Rohit',
        body:"Hello from Rohit"
    },
    
    {
        id:3,
        username:'Amit',
        body:"Hello from Amit"
    },
    {
        id:4,
        username:'Arnav',
        body:"Hello from Arnav"
    }
    
    ];
    // app.get('/',(req,res)=>{
    //     res.send("hi");
    // });
    app.get('/comments',(req,res)=>{
        res.render('comments/index', {comments});
    })
    app.get('/comments/new',(req,res)=>{
        res.render('comments/new');
    })
    app.post('/comments', (req,res)=>{
        // console.log(req.body);
        const {username,body}=req.body;
        const id=comments.length;
        comments.push({username,body,id});
        res.redirect('/comments')
    })
    app.get('/comments/:id',(req,res)=>{
        const {id}=req.params;
        const foundComment=comments.find(c=>c.id===parseInt(id));
        res.send(foundComment)
        res.render('comments/show', {comment:foundComment})
    })
    app.get('/comments/:id/edit',(req,res)=>{
        const {id}=req.params;
        const foundComment=comments.find(c=>c.id===parseInt(id));
        // res.send(foundComment)
        res.render('comments/edit', {comment:foundComment})
    })
    app.patch('/comments/:id',(req,res)=>{
        const {id}=req.params;
        const foundComment=comments.find(c=>c.id===parseInt(id));
        const updatedText=req.body.body;
        foundComment.body=updatedText;
        res.redirect('/comments');
    })
app.listen(3000, () => {
    console.log('server started at port 3000');
})