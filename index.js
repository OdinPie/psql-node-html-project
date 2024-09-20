const express  = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(__dirname));
const {Client} = require('pg');

//initiating connection

// const connectionString = "postgresql://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName";
const connectionString = "postgresql://postgres:ict1@localhost:5432/test";


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/registration-page/register.html");
})

app.post('/submit',(req,res)=>{
    const {username, email, password} = req.body;
    console.log(username, email, password);
    // console.log(client);

    //creating client
    const client = new Client({
        connectionString:connectionString
    })
    client.connect();
    const query = `INSERT INTO studentsinfo VALUES ('${username}', '${email}', '${password}')`;
    client.query(query,(err,res)=>{
        console.log(err,res);
        client.end();
    })

})

app.get('/users',(req,res)=>{
    const client = new Client({
        connectionString:connectionString
    })
    client.connect();
    const query = `SELECT * FROM studentsinfo`;
    client.query(query,(err,result)=>{
        console.log(err,result);
        res.send(result);
        client.end();
    })
})

app.listen(port, ()=>{
    console.log(`registration page is running on port : ${port}`);
})