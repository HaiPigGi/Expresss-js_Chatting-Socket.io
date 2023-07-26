const express = require('express');
const app= express();
const users = []

//server baru http
const http=require("http");
const { url } = require('inspector');
const server=http.createServer(app);
const {Server}=require("socket.io");
const io=new Server (server);

app.set('view engine', 'ejs');
//app.use(express.static ("views"));


app.get("/",(req,res)=>{
    res.render('index',{title : "Masuk Room"})
})
app.get("/isi",(req,res) => {
    res.render('isi',{feature:"Framework"})
})

io.on("connection",socket=>{
    socket.on("nameButton",isi => {
        console.log("Ada isi : ",isi)
         users[socket.id]=isi
         console.log("array : ",users[socket.id])
        socket.broadcast.emit("user-Connection",users[socket.id]);
        console.log("user koneksi : ",users[socket.id])
    })
    socket.on("message",data=>{
        console.log("Ada data",data)
        const {message}=data
       // console.log("isi array message : ",users[socket.io])
        //const {user}=users[socket.id];
        console.log("user : ",users[socket.id])
        socket.broadcast.emit("chatList",message,users[socket.id] )
        console.log("Message : ",message)
        console.log("nama : ",users[socket.id])
    })
})
var port=8000;
server.listen(port, function () {
console.log ("server ready");
})