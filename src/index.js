const express = require('express');
const morgan = require('morgan');
const cors= require('cors');


const app = express();
const port = process.env.PORT || 4000;

const connect = require('./database/connection');
const { text } = require('express');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Home Page Route'));


//Buscador de clientes por nombre like
app.post('/api/client-search/', async (req, res) => {
    try {
        const database = await connect();
        const { search } = req.body;

        const sql = `SELECT * FROM clients WHERE name LIKE '%${search}%' OR created_at LIKE '%${search}%'`; 

        const [rows,fields] = await database.query(sql);

        res.status(200).json({
            clients: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cannot find client",
        })
    }
});



app.get('/api/client', async (req, res) => {
    try {
        const database = await connect();

        const [rows,fields] = await database.query("SELECT * FROM clients");

        res.status(200).json({
            clients: rows
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cannot find clients",
        })
    }
});

app.get('/api/client/:document', async (req, res) => {
    try {
        const database = await connect();
        const { document } = req.params;

        const [rows,fields] = await database.execute("SELECT * FROM clients WHERE document = ?",[document]);

        if (rows){
            res.status(200).json({
                client: rows[0]
            })
        }else{
            res.status(404).json({
                client: {}
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cannot find clients",
        })
    }
});

app.post('/api/client', async (req, res) => {
    try {
        const database = await connect();
        const { document, name, email, birthday } = req.body;
        console.log(req);
        await database.execute("INSERT INTO clients (document, name, email, birthday) VALUES (?,?,?,?)", [document, name, email, birthday]);

        res.status(201).json({
            message: "client created",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "cannot created client",
        })
    }
});

app.put('/api/client/:document', async (req, res) => {
    try {
        const database = await connect();
        const { name, email, birthday } = req.body;
        const { document } = req.params;

        await database.execute("UPDATE  clients SET name = ?, email = ?, birthday = ? WHERE document = ?", [name, email, birthday, document]);

        res.status(200).json({
            message: "Client updated",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cannot update client",
        })
    }
});

app.delete('/api/client/:document', async (req, res) => {
    try {
        const database = await connect();
        const { document } = req.params;

        await database.execute("DELETE FROM clients WHERE document = ?",[document]);

        res.status(200).json({
            message: "client removed"
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "cannot removed client",
        })
    }
});



app.listen(port, () => {
    console.log("server running");
})