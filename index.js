const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pexn3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const eventCollection = client.db('volunteer').collection('events')

        //load data from the database
        app.get('/events', async (req, res) => {
            const query = {};
            const cursor = eventCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        //load single data
        app.get('/search', async (req, res) => {
            const key = req.query.name.toLowerCase();
            const cursor = eventCollection.find({})
            const result = await cursor.toArray()
            const getREsult = result.filter(item => {
                if (item.name.toLowerCase().includes(key)) {
                    return (item)
                }
            })
            res.send(getREsult)
        })






    } finally {

    }

}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send("the unpaid server is running")
})
app.listen(port, () => {
    console.log('listening port', port)
})