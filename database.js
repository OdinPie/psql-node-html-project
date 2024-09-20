const {Pool, Client} = require('pg');

//initiating connection

// const connectionString = "postgresql://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName";
const connectionString = "postgresql://postgres:ict1@localhost:5432/test";

//creating client

const client = new Client({
    connectionString:connectionString
})

client.connect();
const query = "INSERT INTO employees VALUES (3,'Saleha'),(4,'Robyn')";
client.query(query,(err,res)=>{
    console.log(err,res);
})
client.query("SELECT * FROM employees",(err,res)=>{
    console.log(err,res);
    client.end();
    
})