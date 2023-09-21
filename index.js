import express from 'express';
import bodyParser from 'body-parser';

import notesRoutesV1 from './routes/v1/node.js';
import notesRoutesv2 from './routes/v2/node.js';
import authRoutes from './routes/v1/auth.js';


const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/v1/login', authRoutes);
app.use('/v1/notes', notesRoutesV1);
app.use('/v2/notes', notesRoutesv2);

app.get('/', (req, res) => res.send("Hello from Noter"));



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))