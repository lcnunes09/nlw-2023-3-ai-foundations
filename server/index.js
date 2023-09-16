import cors from 'cors';
import express from 'express';
import { download } from './download.js';

const app = express();

app.use(cors());

app.get('/summary/:id', (request, response) => {
    download(request.params.id)
    
    response.json({ 
        result: "Video downloaded!"
    })
    
})

app.listen(3000, () =>
  console.log('Server is running on localhost:3000')
);