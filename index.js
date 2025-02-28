const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// teaStore
// t3ptLuRjNSphIVZX

const uri = "mongodb+srv://teaStore:t3ptLuRjNSphIVZX@cluster0.0qkhitp.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const teaCollection = client.db("teaDB").collection("teas");
  
    app.get('/teas', async(req, res) => {
      const result = await teaCollection.find().toArray();
      res.send(result)
    })
    
    app.post('/teas', async(req, res) => {
      const newTea = req.body;
      const result = await teaCollection.insertOne(newTea);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('tea store running now')
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})