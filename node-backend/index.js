const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 8080;
var x = '<h1>Hello World</h1>';
app.use(express.urlencoded());
app.use(express.json()); 
app.use(cors());

app.get('/', (req, res) => {
  res.send(x);
})

app.post('/', function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  })

app.listen(port, () => {
  console.log('Example app listening at http://localhost:${port}')
})