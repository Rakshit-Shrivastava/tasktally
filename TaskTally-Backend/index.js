const connectToMongo = require('./database');
const express = require('express');
const cors = require('cors');

connectToMongo();


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/', (req, res) => { res.send("Hurray! Backend server is up") });
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})