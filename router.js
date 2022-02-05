const express = require('express');
const axios = require('axios').default;
const router = express.Router();

router.get('/todos', async(req,res) =>{
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos');
    for( i in result.data ){
        delete result.data[i].userId;
    }
    res.json(result.data);
})

router.get('/user/:userId', async(req,res) =>{
    let [ userData, todosData ] = await Promise.all([
        axios.get(`https://jsonplaceholder.typicode.com/users/${req.params.userId}`),
        axios.get('https://jsonplaceholder.typicode.com/todos')
    ]);
    userData = userData.data;
    todosData = todosData.data;
    const result = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        todos: []
    }
    for( i in todosData ){
        if( todosData[i].userId === parseInt(req.params.userId) ){
            result.todos.push( todosData[i] );
        }
    }
    res.send(result);
})

module.exports = router;