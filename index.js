const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()


//mIDLE WARE
app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9q5ys.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run (){
  try{
    await client.connect();
    const userCollection = client.db('toUser').collection('user');

    app.post('/user', async(req, res) => {
        const user = req.body;
        console.log(user);
        const result = await userCollection.insertOne(user);

        res.send({message:`you have added this task ${user?.name}`});
    })

    
    app.get('/user', async (req, res) =>{
        const query = {}
        const Items = await userCollection.find(query).toArray();

        res.send(Items)

    })

  }
  finally{}
}

run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Hello from todo app')
})

app.listen(port, () => {
    console.log('Listening the port', port);
})