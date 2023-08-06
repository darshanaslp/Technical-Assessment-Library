const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const connectDatabase = require('./database');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDatabase();

// Add CORS middleware to enable CORS
app.use(cors());

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});