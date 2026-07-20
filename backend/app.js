import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.json()); 
const users=[];

app.post("/user/add",(req,res)=>{
  const {name,email}=req.body; 
  if(!name?.trim()||!email?.trim()){
    return res.status(400).json({message:"name & email wajib diisi"});
  }
  users.push({name,email});
  res.status(201).json({message:"Data berhasil disimpan", data:{name,email}});
});

app.get("/user/list",(req,res)=>res.json(users));

app.use((err,req,res,next)=>{
  if(err instanceof SyntaxError && err.status===400 && "body" in err){
    return res.status(400).json({message:"Invalid JSON body"});
  }
  next(err);
});