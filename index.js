const express = require('express');
const route = require('./router');

const app = express();
app.use(express.json());
app.use('/', route);

const port = process.env.PORT || 3000;
app.listen(port,() =>{
    console.log(`Listening to ${port}`)
})