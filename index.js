const express  = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(__dirname)); //middleware
const {Client} = require('pg');

//initiating connection

// const connectionString = "postgresql://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName";
const connectionString = "postgresql://postgres:ict1@localhost:5432/test";


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/registration-page/register.html");
})

app.post('/submit',(req,res)=>{
    const {username, email, address,number} = req.body;
    // console.log(username, email, address,number);
    // console.log(client);

    //creating client should be done within the method
    const client = new Client({
        connectionString:connectionString
    })
    client.connect();
    const query = `INSERT INTO studentsinfo VALUES ('${username}', '${email}', '${address}', '${number}')`;
    client.query(query,(err,res)=>{
        console.log(err,res);
        client.end();
    })
    res.sendFile(__dirname + "/result-page/result.html");

})

app.get('/users',(req,res)=>{
    const client = new Client({
        connectionString:connectionString
    })
    client.connect();
    const query = `SELECT * FROM studentsinfo`;
    client.query(query,(err,result)=>{
        console.log(err,result);
        res.send(result.rows);
        client.end();
    })
})

app.listen(port, ()=>{
    console.log(`registration page is running on port : ${port}`);
})