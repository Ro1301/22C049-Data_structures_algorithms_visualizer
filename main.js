const express = require('express');
const dbHelper = require('./db-helper');
const bodyParser = require('body-parser');
const {
    getAllAlgorithms,
    addAlgorithm,
    getAlgorithmById,
    updateAlgorithm,
    deleteAlgorithm
} = require('./algorithm/controllers/algorithm-controller'); // Ensure this path is correct

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    next();
});

app.listen(3001, (err) => {
    if (err) {
        console.log('console error', err);
        return;
    }
    console.log('Express framework started here');
    dbHelper
        .connection()
        .then(() => {
            console.log(`DB Connected`);

            // Define the routes for algorithms
            app.get('/algorithms', getAllAlgorithms);
            app.post('/algorithms', addAlgorithm);
            app.get('/algorithms/:id', getAlgorithmById);
            app.put('/algorithms/:id', updateAlgorithm);
            app.delete('/algorithms/:id', deleteAlgorithm);
        })
        .catch((err) => {
            console.log('DB connection failed. The error is', err);
        });
});
