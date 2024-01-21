import  express  from "express";
import axios from 'axios';
import bodyParser from 'body-parser'
const port = 3001;
const URL="http://localhost:3000"
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){
  res.send('hello from 3001')
})

app.get('/data',async function(req,res){
  
  try{
    const response = await axios.get('http://localhost:3000/random')
  
    const result = response.data;
    console.log(result);
    res.send(result)
  }catch(err){
    console.error('failed to make connection'+err.message);
  }
})

app.get('/spec/:id',async function(req,res){
  
  try{
    const id = req.params.id;
    console.log('id is '+id);
    const response = await axios.get(URL+"/jokes/"+`${id}`)
  
    const result = response.data;
    console.log(result);
    res.send(result)
  }catch(err){
    console.error('failed to make connection'+err.message);
  }
})

app.get('/type',async function(req,res){
  
  
    const type = req.query.type;
    console.log('id is '+type);
    const response = await axios.get(URL+'/filter?'+`type=${type}`)
  
    const result = response.data;
    console.log(result);
    res.send(result)
})

app.post('/post',function(req,res){
  const num = axios.post(URL+'/jokes')
  const newPost= {
     id: 100 +1,
     jokeText:req.body.text,
     jokeType:req.body.type
   };
   jokes.push(newPost)
   
   console.log(newPost);
   res.send(newPost)
 })

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});